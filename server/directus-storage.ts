import { IStorage } from "./storage";
import {
  User,
  Category,
  Product,
  CartItem,
  Order,
  Review,
  Article,
  ArticleCategory,
  WishlistItem,
  InsertUser,
  InsertCategory,
  InsertProduct,
  InsertCartItem,
  InsertOrder,
  InsertReview,
  InsertArticle,
  InsertArticleCategory,
  InsertWishlistItem,
} from "@shared/schema";
// Database usage removed - using Directus as backend only

const DIRECTUS_URL = process.env.DIRECTUS_URL || "https://directus-production-08d0.up.railway.app";
const DIRECTUS_API_KEY = process.env.DIRECTUS_API_KEY || "";

interface DirectusProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: number;
  image_url: string;
  images: string[];
  in_stock: boolean;
  slug: string;
  features: string[];
  dimensions: string;
}

interface DirectusCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

interface DirectusReview {
  id: number;
  product_id: number;
  customer_name: string;
  customer_email: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  date_created: string;
}

interface DirectusArticle {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image_url: string;
  read_time: number;
  published: boolean;
  date_created: string;
  date_updated: string;
}

interface DirectusArticleCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  date_created: string;
}

interface DirectusWishlistItem {
  id: number;
  user_id?: string;
  session_id?: string;
  product_id: number;
  date_created: string;
}

export class DirectusStorage implements IStorage {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    console.log(`Environment DIRECTUS_URL: ${DIRECTUS_URL}`);
    if (!DIRECTUS_URL || !DIRECTUS_API_KEY) {
      throw new Error(
        "DIRECTUS_URL and DIRECTUS_API_KEY environment variables are required",
      );
    }
    this.baseUrl = DIRECTUS_URL.replace(/\/$/, ""); // Remove trailing slash
    this.apiKey = DIRECTUS_API_KEY;
    console.log(`Directus configured: ${this.baseUrl}`);
  }

  // User methods removed - using Directus authentication directly

  private async request(endpoint: string, options: RequestInit = {}, accessToken?: string) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken || this.apiKey}`,
    };

    const url = `${this.baseUrl}${endpoint}`;
    console.log(`Directus API call: ${url}`);

    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers,
        },
      });

      if (!response.ok) {
        console.error(
          `Directus API error: ${response.status} ${response.statusText} for ${url}`,
        );
        throw new Error(
          `Directus request failed: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log(
        `Directus API success: ${url} returned ${data.data?.length || 0} items`,
      );
      return data;
    } catch (error) {
      console.error(`Directus API fetch error for ${url}:`, error);
      throw error;
    }
  }

  private transformProduct(directusProduct: DirectusProduct): Product {
    return {
      id: directusProduct.id,
      name: directusProduct.name,
      slug: directusProduct.slug,
      description: directusProduct.description,
      price: directusProduct.price.toString(),
      categoryId: directusProduct.category,
      imageUrl: directusProduct.image_url,
      images: directusProduct.images || [],
      inStock: directusProduct.in_stock,
      features: directusProduct.features || [],
      dimensions: directusProduct.dimensions,
    };
  }

  private transformCategory(directusCategory: DirectusCategory): Category {
    return {
      id: directusCategory.id,
      name: directusCategory.name,
      slug: directusCategory.slug,
      description: directusCategory.description,
    };
  }

  private transformReview(directusReview: DirectusReview): Review {
    return {
      id: directusReview.id,
      productId: directusReview.product_id,
      customerName: directusReview.customer_name,
      customerEmail: directusReview.customer_email,
      rating: directusReview.rating,
      title: directusReview.title,
      comment: directusReview.comment,
      verified: directusReview.verified,
      helpful: directusReview.helpful,
      createdAt: new Date(directusReview.date_created),
    };
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      // Try different possible collection names with correct Directus API format
      let response;
      try {
        response = await this.request("/items/categories");
      } catch (e) {
        // Try alternative collection names
        try {
          response = await this.request("/items/category");
        } catch (e2) {
          response = await this.request("/items/fishing_categories");
        }
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((category: DirectusCategory) =>
          this.transformCategory(category),
        );
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch categories from Directus:", error);
      return []; // Return empty array instead of throwing to prevent app crash
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    try {
      const response = await this.request(
        `/items/categories?filter[slug][_eq]=${slug}`,
      );
      const category = response.data[0];
      return category ? this.transformCategory(category) : undefined;
    } catch (error) {
      console.error("Failed to fetch category from Directus:", error);
      return undefined;
    }
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const response = await this.request("/items/categories", {
      method: "POST",
      body: JSON.stringify(category),
    });
    return this.transformCategory(response.data);
  }

  // Products
  async getProducts(categoryId?: number): Promise<Product[]> {
    try {
      // Try different possible collection names with correct Directus API format
      let response;
      let endpoint = "/items/products";
      if (categoryId) {
        endpoint += `?filter[category][_eq]=${categoryId}`;
      }

      try {
        response = await this.request(endpoint);
      } catch (e) {
        // Try alternative collection names
        try {
          endpoint = "/items/product";
          if (categoryId) {
            endpoint += `?filter[category][_eq]=${categoryId}`;
          }
          response = await this.request(endpoint);
        } catch (e2) {
          endpoint = "/items/fishing_products";
          if (categoryId) {
            endpoint += `?filter[category][_eq]=${categoryId}`;
          }
          response = await this.request(endpoint);
        }
      }

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((product: DirectusProduct) =>
          this.transformProduct(product),
        );
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch products from Directus:", error);
      return [];
    }
  }

  async getProductById(id: number): Promise<Product | undefined> {
    try {
      const response = await this.request(`/items/products/${id}`);
      return this.transformProduct(response.data);
    } catch (error) {
      console.error("Failed to fetch product from Directus:", error);
      return undefined;
    }
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    try {
      const response = await this.request(
        `/items/products?filter[slug][_eq]=${slug}`,
      );
      const product = response.data[0];
      return product ? this.transformProduct(product) : undefined;
    } catch (error) {
      console.error("Failed to fetch product from Directus:", error);
      return undefined;
    }
  }

  async createProduct(product: InsertProduct): Promise<Product> {
    const response = await this.request("/items/products", {
      method: "POST",
      body: JSON.stringify({
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: parseFloat(product.price),
        category: product.categoryId,
        image_url: product.imageUrl,
        images: product.images,
        in_stock: product.inStock,
        features: product.features,
        dimensions: product.dimensions,
      }),
    });
    return this.transformProduct(response.data);
  }

  async searchProducts(query: string): Promise<Product[]> {
    try {
      const response = await this.request(
        `/items/products?search=${encodeURIComponent(query)}`,
      );
      return response.data.map((product: DirectusProduct) =>
        this.transformProduct(product),
      );
    } catch (error) {
      console.error("Failed to search products in Directus:", error);
      return [];
    }
  }

  // Cart operations - these will still use local storage since they're session-based
  private cartItems: Map<number, CartItem> = new Map();
  private currentCartItemId: number = 1;

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId,
    );
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    const id = this.currentCartItemId++;
    const cartItem: CartItem = {
      id,
      sessionId: insertCartItem.sessionId,
      productId: insertCartItem.productId || null,
      quantity: insertCartItem.quantity || 1,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const item = this.cartItems.get(id);
    if (!item) {
      throw new Error("Cart item not found");
    }
    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToDelete: number[] = [];
    this.cartItems.forEach((item, id) => {
      if (item.sessionId === sessionId) {
        itemsToDelete.push(id);
      }
    });
    itemsToDelete.forEach((id) => this.cartItems.delete(id));
  }

  // Orders - these can also use Directus if you have an orders collection
  private orders: Map<number, Order> = new Map();
  private currentOrderId: number = 1;

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      id,
      status: insertOrder.status || "pending",
      sessionId: insertOrder.sessionId,
      createdAt: new Date(),
      total: insertOrder.total,
      items: Array.isArray(insertOrder.items) ? insertOrder.items : null,
      customerInfo: insertOrder.customerInfo || null,
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  // Reviews
  async getProductReviews(productId: number): Promise<Review[]> {
    try {
      const filterParam = encodeURIComponent(
        `{"product_id":{"_eq":${productId}}}`,
      );
      const response = await this.request(
        `/items/reviews?filter=${filterParam}&sort[]=-date_created`,
      );

      if (response.data && Array.isArray(response.data)) {
        return response.data.map((review: DirectusReview) =>
          this.transformReview(review),
        );
      }
      return [];
    } catch (error) {
      console.error(
        `Failed to fetch reviews for product ${productId} from Directus:`,
        error,
      );
      return [];
    }
  }

  async createReview(review: InsertReview): Promise<Review> {
    try {
      const directusReviewData = {
        product_id: review.productId,
        customer_name: review.customerName,
        customer_email: review.customerEmail,
        rating: review.rating,
        title: review.title,
        comment: review.comment,
        verified: review.verified || false,
        helpful: 0,
      };

      const response = await this.request("/items/reviews", {
        method: "POST",
        body: JSON.stringify(directusReviewData),
      });

      return this.transformReview(response.data);
    } catch (error) {
      console.error("Failed to create review in Directus:", error);
      throw error;
    }
  }

  async getReview(id: number): Promise<Review | undefined> {
    try {
      const response = await this.request(`/items/reviews/${id}`);
      return response.data ? this.transformReview(response.data) : undefined;
    } catch (error) {
      console.error(`Failed to fetch review ${id} from Directus:`, error);
      return undefined;
    }
  }

  async markReviewHelpful(id: number): Promise<Review> {
    try {
      const review = await this.getReview(id);
      if (!review) {
        throw new Error(`Review ${id} not found`);
      }

      const response = await this.request(`/items/reviews/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          helpful: (review.helpful || 0) + 1,
        }),
      });

      return this.transformReview(response.data);
    } catch (error) {
      console.error(`Failed to mark review ${id} as helpful:`, error);
      throw error;
    }
  }

  // Transform methods for articles
  private transformArticle(directusArticle: DirectusArticle): Article {
    return {
      id: directusArticle.id,
      title: directusArticle.title,
      slug: directusArticle.slug,
      excerpt: directusArticle.excerpt,
      content: directusArticle.content,
      author: directusArticle.author,
      category: directusArticle.category,
      imageUrl: directusArticle.image_url || null,
      readTime: directusArticle.read_time,
      published: directusArticle.published,
      createdAt: new Date(directusArticle.date_created),
      updatedAt: new Date(directusArticle.date_updated),
    };
  }

  private transformArticleCategory(
    directusCategory: DirectusArticleCategory,
  ): ArticleCategory {
    return {
      id: directusCategory.id,
      name: directusCategory.name,
      slug: directusCategory.slug,
      description: directusCategory.description || null,
      createdAt: new Date(directusCategory.date_created),
    };
  }

  private transformWishlistItem(directusWishlistItem: DirectusWishlistItem): WishlistItem {
    return {
      id: directusWishlistItem.id,
      userId: directusWishlistItem.user_id || null,
      sessionId: directusWishlistItem.session_id || null,
      productId: directusWishlistItem.product_id,
      createdAt: new Date(directusWishlistItem.date_created),
    };
  }

  // Article methods
  async getArticles(categorySlug?: string): Promise<Article[]> {
    try {
      console.log("Directus API call: " + this.baseUrl + "/items/articles");

      let url =
        "/items/articles?filter[published][_eq]=true&sort=-date_created";
      if (categorySlug) {
        url += `&filter[category][_eq]=${categorySlug}`;
      }

      const response = await this.request(url);
      console.log(
        `Directus API success: ${this.baseUrl}/items/articles returned ${response.data.length} items`,
      );

      return response.data.map((article: DirectusArticle) =>
        this.transformArticle(article),
      );
    } catch (error) {
      console.error("Failed to fetch articles from Directus:", error);
      return [];
    }
  }

  async getArticleById(id: number): Promise<Article | undefined> {
    try {
      const response = await this.request(`/items/articles/${id}`);
      return response.data ? this.transformArticle(response.data) : undefined;
    } catch (error) {
      console.error(`Failed to fetch article ${id} from Directus:`, error);
      return undefined;
    }
  }

  async getArticleBySlug(slug: string): Promise<Article | undefined> {
    try {
      const response = await this.request(
        `/items/articles?filter[published][_eq]=true&sort=-date_created`,
      );
      if (response.data && response.data.length > 0) {
        return this.transformArticle(response.data[0]);
      }
      return undefined;
    } catch (error) {
      console.error(
        `Failed to fetch article with slug ${slug} from Directus:`,
        error,
      );
      return undefined;
    }
  }

  async createArticle(article: InsertArticle): Promise<Article> {
    try {
      const directusArticleData = {
        title: article.title,
        slug: article.slug,
        excerpt: article.excerpt,
        content: article.content,
        author: article.author,
        category: article.category,
        image_url: article.imageUrl,
        read_time: article.readTime,
        published: article.published ?? true,
      };

      const response = await this.request("/items/articles", {
        method: "POST",
        body: JSON.stringify(directusArticleData),
      });

      return this.transformArticle(response.data);
    } catch (error) {
      console.error("Failed to create article in Directus:", error);
      throw error;
    }
  }

  async getArticleCategories(): Promise<ArticleCategory[]> {
    try {
      console.log(
        "Directus API call: " + this.baseUrl + "/items/article_categories",
      );

      const response = await this.request(
        "/items/article_categories?sort=name",
      );
      console.log(
        `Directus API success: ${this.baseUrl}/items/article_categories returned ${response.data.length} items`,
      );

      return response.data.map((category: DirectusArticleCategory) =>
        this.transformArticleCategory(category),
      );
    } catch (error) {
      console.error("Failed to fetch article categories from Directus:", error);
      return [];
    }
  }

  // Wishlist methods - using in-memory storage (fallback until Directus collection is configured)
  private wishlistItems: Map<string, WishlistItem> = new Map();
  private currentWishlistItemId: number = 1;

  async getWishlistItems(sessionId: string): Promise<WishlistItem[]> {
    // Try Directus first, fallback to in-memory storage
    try {
      console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items?filter[session_id][_eq]=${sessionId}`);
      
      const response = await this.request(`/items/wishlist_items?filter[session_id][_eq]=${sessionId}&sort=-date_created`);
      console.log(`Directus API success: ${this.baseUrl}/items/wishlist_items returned ${response.data.length} items for session ${sessionId}`);
      
      return response.data.map((item: DirectusWishlistItem) => this.transformWishlistItem(item));
    } catch (error) {
      console.log(`Directus wishlist collection not available, using in-memory storage for session ${sessionId}`);
      return Array.from(this.wishlistItems.values()).filter(item => item.sessionId === sessionId);
    }
  }

  async getWishlistItemsByUser(userId: string, accessToken?: string): Promise<WishlistItem[]> {
    // Try Directus first, fallback to in-memory storage
    try {
      console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items?filter[user_id][_eq]=${userId}`);
      
      const response = await this.request(`/items/wishlist_items?filter[user_id][_eq]=${userId}`, {}, accessToken);
      
      console.log(`Directus API success: Fetched ${response.data.length} wishlist items for user ${userId}`);
      
      return response.data.map((item: DirectusWishlistItem) => this.transformWishlistItem(item));
    } catch (error) {
      console.log(`Directus wishlist collection not available for user ${userId}, using in-memory storage`);
      return Array.from(this.wishlistItems.values()).filter(item => item.userId === userId);
    }
  }

  async addToWishlist(insertWishlistItem: InsertWishlistItem, accessToken?: string): Promise<WishlistItem> {
    // For authenticated users, try Directus first, fallback to in-memory storage
    if (insertWishlistItem.userId) {
      try {
        const directusWishlistData: any = {
          product_id: insertWishlistItem.productId,
          user_id: insertWishlistItem.userId,
        };
        
        console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items (POST) for user ${insertWishlistItem.userId}`);
        
        const response = await this.request(`/items/wishlist_items`, {
          method: "POST",
          body: JSON.stringify(directusWishlistData),
        }, accessToken);

        console.log(`Directus API success: Added wishlist item for user ${insertWishlistItem.userId}`);
        
        return this.transformWishlistItem(response.data);
      } catch (error) {
        console.log(`Directus wishlist collection not available for user ${insertWishlistItem.userId}, using in-memory storage`);
        
        const id = this.currentWishlistItemId++;
        const wishlistItem: WishlistItem = { 
          id,
          userId: insertWishlistItem.userId,
          sessionId: null,
          productId: insertWishlistItem.productId,
          createdAt: new Date()
        };
        
        this.wishlistItems.set(id.toString(), wishlistItem);
        return wishlistItem;
      }
    }
    
    // For guests, try Directus first, fallback to in-memory storage
    try {
      const directusWishlistData: any = {
        product_id: insertWishlistItem.productId,
        session_id: insertWishlistItem.sessionId,
      };
      
      console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items (POST) for guest session ${insertWishlistItem.sessionId}`);
      
      const response = await this.request("/items/wishlist_items", {
        method: "POST",
        body: JSON.stringify(directusWishlistData),
      });

      console.log(`Directus API success: Added wishlist item for product ${insertWishlistItem.productId} to session ${insertWishlistItem.sessionId}`);
      
      return this.transformWishlistItem(response.data);
    } catch (error) {
      console.log(`Directus wishlist collection not available, using in-memory storage for session ${insertWishlistItem.sessionId}`);
      
      const id = this.currentWishlistItemId++;
      const wishlistItem: WishlistItem = { 
        id,
        userId: null,
        sessionId: insertWishlistItem.sessionId || null,
        productId: insertWishlistItem.productId,
        createdAt: new Date()
      };
      
      this.wishlistItems.set(id.toString(), wishlistItem);
      return wishlistItem;
    }
  }

  async removeFromWishlist(id: number): Promise<void> {
    // Try Directus first, fallback to in-memory storage
    try {
      console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items/${id} (DELETE)`);
      
      await this.request(`/items/wishlist_items/${id}`, {
        method: "DELETE",
      });

      console.log(`Directus API success: Removed wishlist item ${id}`);
    } catch (error) {
      console.log(`Directus wishlist collection not available, removing from in-memory storage: ${id}`);
      
      // Find and remove by ID in in-memory storage
      const entries = Array.from(this.wishlistItems.entries());
      for (const [key, item] of entries) {
        if (item.id === id) {
          this.wishlistItems.delete(key);
          break;
        }
      }
    }
  }

  async isInWishlist(sessionId: string, productId: number): Promise<boolean> {
    // Try Directus first, fallback to in-memory storage
    try {
      console.log(`Directus API call: ${this.baseUrl}/items/wishlist_items?filter[session_id][_eq]=${sessionId}&filter[product_id][_eq]=${productId}`);
      
      const response = await this.request(`/items/wishlist_items?filter[session_id][_eq]=${sessionId}&filter[product_id][_eq]=${productId}`);
      
      const exists = response.data.length > 0;
      console.log(`Directus API success: Product ${productId} in wishlist for session ${sessionId}: ${exists}`);
      
      return exists;
    } catch (error) {
      console.log(`Directus wishlist collection not available, checking in-memory storage for session ${sessionId} and product ${productId}`);
      
      return Array.from(this.wishlistItems.values()).some(
        item => item.sessionId === sessionId && item.productId === productId
      );
    }
  }

  async isInWishlistByUser(userId: string, productId: number): Promise<boolean> {
    // Use in-memory storage for authenticated users until Directus permissions are configured
    console.log(`Checking wishlist for user ${userId} and product ${productId} in in-memory storage`);
    
    return Array.from(this.wishlistItems.values()).some(
      item => item.userId === userId && item.productId === productId
    );
  }
}
