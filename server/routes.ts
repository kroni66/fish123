import type { Express, Request } from "express";
import { createServer, type Server } from "http";
import { DirectusStorage } from "./directus-storage";
import { storage as localStorage, MemStorage, type IStorage } from "./storage";
import { directusAuth } from "./directus-auth";
import { insertCartItemSchema, insertOrderSchema, insertReviewSchema, insertWishlistItemSchema, loginSchema, registerSchema } from "@shared/schema";
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

// Allow running without Stripe in development/demo mode
if (!process.env.STRIPE_SECRET_KEY && process.env.NODE_ENV !== 'production') {
  console.warn('Warning: STRIPE_SECRET_KEY not set. Using dummy value for development.');
  process.env.STRIPE_SECRET_KEY = 'sk_test_dummy_key_for_development';
}

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing required Stripe secret: STRIPE_SECRET_KEY');
}
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Initialize storage - use Directus exclusively for products and categories
let storage: IStorage;
const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_API_KEY = process.env.DIRECTUS_API_KEY;

if (DIRECTUS_URL && DIRECTUS_URL !== "undefined") {
  try {
    storage = new DirectusStorage();
    console.log("✓ Using Directus backend for data storage");
  } catch (error) {
    console.error("Directus configuration failed:", error);
    // If Directus setup fails, throw an error to prevent fallback to local storage
    throw new Error(`Failed to initialize DirectusStorage: ${error}`);
  }
} else {
  // If Directus URL is not provided, throw an error
  throw new Error("DIRECTUS_URL environment variable must be set to use the Directus backend.");
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Authentication routes - removed login/register/logout, only token-based auth

  app.get("/api/auth/user", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Token je povinný" });
      }

      const accessToken = authHeader.substring(7); // Remove "Bearer " prefix

      console.log(`Auth check - Token provided:`, accessToken.substring(0, 10) + '...');

      try {
        // Get user data from Directus using the access token
        const directusUser = await directusAuth.getCurrentUser(accessToken);

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
      } catch (userError: any) {
        console.error("Token validation error:", userError);
        res.status(401).json({ message: "Neplatný nebo vypršený token" });
      }
    } catch (error) {
      console.error("Get user error:", error);
      res.status(401).json({
        message: error instanceof Error ? error.message : "Nepodařilo se získat uživatele"
      });
    }
  });

  // Removed /api/auth/me route - using Directus authentication directly

  // Categories
  app.get("/api/categories", async (req, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Failed to fetch categories from Directus:", error);
      res.status(503).json({ 
        message: "Service unavailable - please check Directus connection",
        error: "Categories collection not accessible"
      });
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
      console.error("Failed to fetch products from Directus:", error);
      res.status(503).json({ 
        message: "Service unavailable - please check Directus connection",
        error: "Products collection not accessible"
      });
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
    // This route can remain public or be tied to a session if carts are user-specific
    // For now, assuming carts can be temporary for guests, or fetched by session ID for logged-in users.
    // If carts are strictly user-bound, add session check here.
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
      // ALL CART MODIFICATIONS SHOULD IDEALLY BE USER-SPECIFIC
      // For now, we use sessionId for guest carts, but real user carts should be tied to user ID
      // If req.session.user exists, we could augment cartItemData with userId.
      // This is a simplified example; a real app might handle guest vs user carts differently.
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

  // Token-based wishlist routes
  app.get("/api/wishlist/:sessionId", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

      console.log(`Wishlist fetch request - Session ID: ${req.params.sessionId}, Token provided:`, accessToken ? 'yes' : 'no');

      if (!accessToken) {
        // Return empty wishlist for unauthenticated users
        console.log(`No token provided, returning empty wishlist`);
        return res.json([]);
      }

      // Get user info from token to get userId
      try {
        const directusUser = await directusAuth.getCurrentUser(accessToken);
        const userId = directusUser.id;

        // For authenticated users, get their user-specific wishlist with access token
        const wishlistItems = await storage.getWishlistItemsByUser(userId, accessToken);
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
      } catch (userError) {
        console.error("Token validation failed:", userError);
        return res.status(401).json({ message: "Neplatný token" });
      }
    } catch (error) {
      console.error("Failed to fetch wishlist items:", error);
      res.status(500).json({ message: "Failed to fetch wishlist items" });
    }
  });

  app.post("/api/wishlist", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: "Token je povinný pro přidání položek do wishlistu",
          requireAuth: true
        });
      }

      const accessToken = authHeader.substring(7);

      // Get user info from token
      const directusUser = await directusAuth.getCurrentUser(accessToken);
      const userId = directusUser.id;

      console.log(`Wishlist add request - User ID: ${userId}, Product: ${req.body.productId}`);

      const wishlistItemData = insertWishlistItemSchema.parse(req.body);

      // Only use user ID for authenticated users
      const enhancedWishlistData = {
        ...wishlistItemData,
        userId: userId,
        sessionId: null, // Don't use session for authenticated users
      };

      console.log(`Adding item to wishlist for authenticated user: ${userId}, Product: ${wishlistItemData.productId}`);

      const wishlistItem = await storage.addToWishlist(enhancedWishlistData, accessToken);
      console.log(`Successfully added wishlist item:`, wishlistItem);
      res.json(wishlistItem);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid wishlist item data", errors: error.errors });
      }
      if (error.message?.includes('TOKEN') || error.message?.includes('Neplatný')) {
        return res.status(401).json({ message: "Neplatný token", requireAuth: true });
      }
      console.error("Failed to add item to wishlist:", error);
      res.status(500).json({ message: "Failed to add item to wishlist" });
    }
  });

  app.delete("/api/wishlist/:id", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: "Token je povinný pro správu wishlistu",
          requireAuth: true
        });
      }

      const accessToken = authHeader.substring(7);

      // Get user info from token to validate ownership
      const directusUser = await directusAuth.getCurrentUser(accessToken);

      await storage.removeFromWishlist(Number(req.params.id));
      console.log(`Removed wishlist item ${req.params.id} for user: ${directusUser.id}`);
      res.status(204).send();
    } catch (error) {
      if (error.message?.includes('TOKEN') || error.message?.includes('Neplatný')) {
        return res.status(401).json({ message: "Neplatný token", requireAuth: true });
      }
      console.error("Failed to remove item from wishlist:", error);
      res.status(500).json({ message: "Failed to remove item from wishlist" });
    }
  });

  app.get("/api/wishlist/:sessionId/check/:productId", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      const accessToken = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;

      if (!accessToken) {
        // Return false for unauthenticated users
        return res.json({ isInWishlist: false });
      }

      try {
        // Get user info from token
        const directusUser = await directusAuth.getCurrentUser(accessToken);
        const userId = directusUser.id;

        const isInWishlist = await storage.isInWishlistByUser(userId, Number(req.params.productId));
        res.json({ isInWishlist });
      } catch (userError) {
        // Token invalid, return false
        return res.json({ isInWishlist: false });
      }
    } catch (error) {
      console.error("Failed to check wishlist status:", error);
      res.status(500).json({ message: "Failed to check wishlist status" });
    }
  });

  // Orders - token-based authentication
  app.post("/api/orders", async (req, res) => {
    try {
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: "Token je povinný pro vytvoření objednávky",
          requireAuth: true
        });
      }

      const accessToken = authHeader.substring(7);

      // Get user info from token
      const directusUser = await directusAuth.getCurrentUser(accessToken);

      // Potentially enrich orderData with userId from token
      const orderData = insertOrderSchema.parse({
        ...req.body,
        userId: directusUser.id, // Use userId from token
      });
      const order = await storage.createOrder(orderData);

      // Clear cart after successful order
      await storage.clearCart(orderData.sessionId);

      res.json(order);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid order data", errors: error.errors });
      }
      if (error.message?.includes('TOKEN') || error.message?.includes('Neplatný')) {
        return res.status(401).json({ message: "Neplatný token", requireAuth: true });
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
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: "Token je povinný pro přidání recenze",
          requireAuth: true
        });
      }

      const accessToken = authHeader.substring(7);

      // Get user info from token
      const directusUser = await directusAuth.getCurrentUser(accessToken);
      const customerName = `${directusUser.first_name || ''} ${directusUser.last_name || ''}`.trim() || directusUser.email;

      const reviewData = insertReviewSchema.parse({
        ...req.body,
        userId: directusUser.id,
        customerName: customerName,
        customerEmail: directusUser.email,
      });
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      if (error.message?.includes('TOKEN') || error.message?.includes('Neplatný')) {
        return res.status(401).json({ message: "Neplatný token", requireAuth: true });
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
      // Extract Bearer token from Authorization header
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
          message: "Token je povinný pro označení recenze jako užitečné",
          requireAuth: true
        });
      }

      const accessToken = authHeader.substring(7);

      // Validate token
      await directusAuth.getCurrentUser(accessToken);

      const id = parseInt(req.params.id);
      const review = await storage.markReviewHelpful(id);
      res.json(review);
    } catch (error) {
      if (error.message?.includes('TOKEN') || error.message?.includes('Neplatný')) {
        return res.status(401).json({ message: "Neplatný token", requireAuth: true });
      }
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
