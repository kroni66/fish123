import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { DirectusStorage } from "./directus-storage";
import { storage as localStorage, type IStorage } from "./storage";
import { directusAuth } from "./directus-auth";
import { insertProductSchema, insertCartItemSchema, insertOrderSchema, insertReviewSchema, insertWishlistItemSchema, loginSchema, registerSchema } from "@shared/schema";
import { z } from "zod";
import Stripe from "stripe";

declare module 'express-serve-static-core' {
  interface Request {
    session: {
      user?: {
        id: string;
        email: string;
        firstName?: string;
        lastName?: string;
        accessToken: string;
        refreshToken: string;
      };
    } & any;
  }
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize storage - use Directus exclusively for products and categories
let storage: IStorage;
const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_API_KEY = process.env.DIRECTUS_API_KEY;

if (DIRECTUS_URL && DIRECTUS_API_KEY && DIRECTUS_URL !== "undefined") {
  try {
    storage = new DirectusStorage();
    console.log("✓ Using Directus backend for data storage");
  } catch (error) {
    console.error("Directus configuration failed:", error);
    storage = localStorage;
    console.log("⚠ Fallback: Using local storage");
  }
} else {
  storage = localStorage;
  console.log("⚠ No Directus credentials provided - using local storage");
  console.log("  To use Directus backend, provide DIRECTUS_URL and DIRECTUS_API_KEY environment variables");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes
  app.post("/api/auth/login", async (req, res) => {
    try {
      const loginData = loginSchema.parse(req.body);
      
      // Try Directus authentication first
      try {
        const { user, tokens } = await directusAuth.login(loginData);
        
        // Store user session with access token for profile fetching
        req.session.user = {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          accessToken: tokens.access_token,
          refreshToken: tokens.refresh_token,
        };
        
        console.log(`Directus login successful - User: ${user.id}, Session ID: ${req.sessionID}`);
        
        // Return user data from Directus directly
        res.json({
          user: {
            id: user.id,
            email: user.email,
            firstName: user.first_name,
            lastName: user.last_name,
            directusId: user.id,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          tokens,
        });
      } catch (directusError) {
        console.log("Directus authentication failed, using demo authentication for testing");
        
        // Demo authentication for testing purposes when Directus credentials are incorrect
        if (loginData.email === "demo@example.com" && loginData.password === "demo123") {
          const demoUser = {
            id: "demo-user-123",
            email: "demo@example.com",
            firstName: "Demo",
            lastName: "User"
          };
          
          // Store demo user session
          req.session.user = {
            id: demoUser.id,
            email: demoUser.email,
            firstName: demoUser.firstName,
            lastName: demoUser.lastName,
            accessToken: "demo-access-token",
            refreshToken: "demo-refresh-token",
          };
          
          console.log(`Demo login successful - User: ${demoUser.id}, Session ID: ${req.sessionID}`);
          
          res.json({
            user: {
              id: demoUser.id,
              email: demoUser.email,
              firstName: demoUser.firstName,
              lastName: demoUser.lastName,
              directusId: demoUser.id,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
            tokens: {
              access_token: "demo-access-token",
              refresh_token: "demo-refresh-token"
            },
          });
        } else {
          throw directusError;
        }
      }
      
    } catch (error) {
      console.error("Login error:", error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : "Přihlášení se nezdařilo" 
      });
    }
  });

  app.post("/api/auth/register", async (req, res) => {
    try {
      const registerData = registerSchema.parse(req.body);
      const { user, tokens } = await directusAuth.register(registerData);
      
      // Store user session with access token for profile fetching
      req.session.user = {
        id: user.id,
        email: user.email,
        firstName: user.first_name,
        lastName: user.last_name,
        accessToken: tokens.access_token,
        refreshToken: tokens.refresh_token,
      };
      
      // Return user data from Directus directly
      res.json({
        user: {
          id: user.id,
          email: user.email,
          firstName: user.first_name,
          lastName: user.last_name,
          directusId: user.id,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        tokens,
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(400).json({ 
        message: error instanceof Error ? error.message : "Registrace se nezdařila" 
      });
    }
  });

  app.post("/api/auth/logout", async (req, res) => {
    try {
      // Get refresh token from session or request body
      const refreshToken = req.session?.user?.refreshToken || req.body.refreshToken;
      
      if (refreshToken) {
        await directusAuth.logout(refreshToken);
      }
      
      // Clear session data
      req.session.user = undefined;
      
      res.json({ message: "Úspěšně odhlášen" });
    } catch (error) {
      console.error("Logout error:", error);
      // Clear session even if Directus logout fails
      req.session.user = undefined;
      res.json({ message: "Úspěšně odhlášen" }); // Always succeed logout
    }
  });

  app.post("/api/auth/refresh", async (req, res) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(400).json({ message: "Refresh token je povinný" });
      }
      
      const tokens = await directusAuth.refreshToken(refreshToken);
      res.json(tokens);
    } catch (error) {
      console.error("Token refresh error:", error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : "Obnova tokenu se nezdařila" 
      });
    }
  });

  app.get("/api/auth/user", async (req, res) => {
    try {
      // Check if user is authenticated with session
      const sessionUser = req.session?.user;
      
      console.log(`Auth check - Session ID: ${req.sessionID}, Session User:`, sessionUser ? 'exists' : 'missing');
      console.log(`Session user details:`, sessionUser);
      
      if (!sessionUser) {
        return res.status(401).json({ message: "Nepřihlášen" });
      }

      // If demo user, return demo data directly
      if (sessionUser.accessToken === "demo-access-token") {
        console.log(`Demo user authenticated: ${sessionUser.id}`);
        
        res.json({
          id: sessionUser.id,
          email: sessionUser.email,
          firstName: sessionUser.firstName,
          lastName: sessionUser.lastName,
          directusId: sessionUser.id,
          status: "active",
          createdAt: new Date(),
          updatedAt: new Date()
        });
        return;
      }

      // Get user data from Directus using the access token
      const directusUser = await directusAuth.getCurrentUser(sessionUser.accessToken);
      
      console.log(`Successfully authenticated user: ${directusUser.id}`);
      
      // Return the user profile data
      res.json({
        id: directusUser.id,
        email: directusUser.email,
        firstName: directusUser.first_name || null,
        lastName: directusUser.last_name || null,
        directusId: directusUser.id,
        status: directusUser.status,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    } catch (error) {
      console.error("Get user error:", error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : "Nepodařilo se získat uživatele" 
      });
    }
  });

  app.get("/api/auth/me", async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token není poskytnut" });
      }
      
      const token = authHeader.substring(7);
      const directusUser = await directusAuth.getCurrentUser(token);
      
      // Get local user data
      const localUser = await storage.getUserByDirectusId(directusUser.id);
      if (!localUser) {
        return res.status(404).json({ message: "Uživatel nenalezen" });
      }
      
      res.json(localUser);
    } catch (error) {
      console.error("Get user error:", error);
      res.status(401).json({ 
        message: error instanceof Error ? error.message : "Nepodařilo se získat uživatele" 
      });
    }
  });

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.get("/api/categories/:slug", async (req, res) => {
    try {
      const category = await storage.getCategoryBySlug(req.params.slug);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.json(category);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch category" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const categoryId = req.query.categoryId ? parseInt(req.query.categoryId as string) : undefined;
      const products = await storage.getProducts(categoryId);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get("/api/products/search", async (req, res) => {
    try {
      const query = req.query.q as string;
      if (!query) {
        return res.status(400).json({ message: "Search query is required" });
      }
      const products = await storage.searchProducts(query);
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to search products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const product = await storage.getProductById(id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  app.get("/api/products/slug/:slug", async (req, res) => {
    try {
      const product = await storage.getProductBySlug(req.params.slug);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch product" });
    }
  });

  // Cart
  app.get("/api/cart/:sessionId", async (req, res) => {
    try {
      const cartItems = await storage.getCartItems(req.params.sessionId);
      
      // Get product details for each cart item
      const itemsWithProducts = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProductById(item.productId!);
          return { ...item, product };
        })
      );
      
      res.json(itemsWithProducts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const cartItemData = insertCartItemSchema.parse(req.body);
      const cartItem = await storage.addToCart(cartItemData);
      res.json(cartItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid cart item data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to add item to cart" });
    }
  });

  app.put("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { quantity } = req.body;
      
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ message: "Invalid quantity" });
      }

      const cartItem = await storage.updateCartItem(id, quantity);
      res.json(cartItem);
    } catch (error) {
      res.status(500).json({ message: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  app.delete("/api/cart/session/:sessionId", async (req, res) => {
    try {
      await storage.clearCart(req.params.sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Stripe payment route for one-time payments
  app.post("/api/create-payment-intent", async (req, res) => {
    try {
      const { amount } = req.body;
      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100), // Convert to cents
        currency: "czk",
        automatic_payment_methods: {
          enabled: true,
        },
      });
      res.json({ clientSecret: paymentIntent.client_secret });
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "Error creating payment intent: " + error.message });
    }
  });

  // Authenticated-only wishlist routes
  app.get("/api/wishlist/:sessionId", async (req, res) => {
    try {
      const userId = req.session?.user?.id;
      
      console.log(`Wishlist fetch request - Session user ID: ${userId}, Session ID: ${req.params.sessionId}`);
      
      if (!userId) {
        // Return empty wishlist for unauthenticated users
        console.log(`No user in session, returning empty wishlist`);
        return res.json([]);
      }
      
      // For authenticated users, get their user-specific wishlist
      const wishlistItems = await storage.getWishlistItemsByUser(userId);
      console.log(`Fetching wishlist for authenticated user: ${userId}, Found ${wishlistItems.length} items`);
      
      // Get product details for each wishlist item
      const itemsWithProducts = await Promise.all(
        wishlistItems.map(async (item) => {
          const product = await storage.getProductById(item.productId!);
          return { ...item, product };
        })
      );
      
      console.log(`Returning ${itemsWithProducts.length} wishlist items with product details`);
      res.json(itemsWithProducts);
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
      res.status(500).json({ message: "Failed to fetch wishlist items" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      const userId = req.session?.user?.id;
      
      console.log(`Wishlist add request - Session user ID: ${userId}, Session data:`, req.session);
      
      // Require authentication for adding to wishlist
      if (!userId) {
        return res.status(401).json({ 
          message: "Musíte se přihlásit pro přidání položek do wishlistu",
          requireAuth: true 
        });
      }
      
      const wishlistItemData = insertWishlistItemSchema.parse(req.body);
      
      // Only use user ID for authenticated users
      const enhancedWishlistData = {
        ...wishlistItemData,
        userId: userId,
        sessionId: null, // Don't use session for authenticated users
      };
      
      console.log(`Adding item to wishlist for authenticated user: ${userId}, Product: ${wishlistItemData.productId}`);
      
      const wishlistItem = await storage.addToWishlist(enhancedWishlistData);
      console.log(`Successfully added wishlist item:`, wishlistItem);
      res.json(wishlistItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid wishlist item data", errors: error.errors });
      }
      console.error("Failed to add item to wishlist:", error);
      res.status(500).json({ message: "Failed to add item to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      const userId = req.session?.user?.id;
      
      // Require authentication for removing from wishlist
      if (!userId) {
        return res.status(401).json({ 
          message: "Musíte se přihlásit pro správu wishlistu",
          requireAuth: true 
        });
      }
      
      await storage.removeFromWishlist(Number(req.params.id));
      console.log(`Removed wishlist item ${req.params.id} for user: ${userId}`);
      res.status(204).send();
    } catch (error) {
      console.error("Failed to remove item from wishlist:", error);
      res.status(500).json({ message: "Failed to remove item from wishlist" });
    }
  });

  app.get("/api/wishlist/:sessionId/check/:productId", async (req, res) => {
    try {
      const userId = req.session?.user?.id;
      
      if (!userId) {
        // Return false for unauthenticated users
        return res.json({ isInWishlist: false });
      }
      
      const isInWishlist = await storage.isInWishlistByUser(userId, Number(req.params.productId));
      res.json({ isInWishlist });
    } catch (error) {
      console.error("Failed to check wishlist status:", error);
      res.status(500).json({ message: "Failed to check wishlist status" });
    }
  });

  // Orders
  app.post("/api/orders", async (req, res) => {
    try {
      const orderData = insertOrderSchema.parse(req.body);
      const order = await storage.createOrder(orderData);
      
      // Clear cart after successful order
      await storage.clearCart(orderData.sessionId);
      
      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create order" });
    }
  });

  app.get("/api/orders/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const order = await storage.getOrder(id);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch order" });
    }
  });

  // Reviews
  app.get("/api/products/:productId/reviews", async (req, res) => {
    try {
      const productId = parseInt(req.params.productId);
      const reviews = await storage.getProductReviews(productId);
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/reviews/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.getReview(id);
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch review" });
    }
  });

  app.patch("/api/reviews/:id/helpful", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const review = await storage.markReviewHelpful(id);
      res.json(review);
    } catch (error) {
      res.status(500).json({ message: "Failed to mark review as helpful" });
    }
  });

  // Article routes for INSPIRACE section
  app.get("/api/articles", async (req, res) => {
    try {
      const categorySlug = req.query.category as string;
      const articles = await storage.getArticles(categorySlug);
      res.json(articles);
    } catch (error) {
      console.error("Error fetching articles:", error);
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const article = await storage.getArticleById(id);
      if (!article) {
        return res.status(404).json({ message: "Article not found" });
      }
      res.json(article);
    } catch (error) {
      console.error("Error fetching article:", error);
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.get("/api/article-categories", async (req, res) => {
    try {
      const categories = await storage.getArticleCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching article categories:", error);
      res.status(500).json({ message: "Failed to fetch article categories" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
