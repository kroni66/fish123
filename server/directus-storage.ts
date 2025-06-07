import { IStorage } from "./storage";
import { Category, Product, CartItem, Order, InsertCategory, InsertProduct, InsertCartItem, InsertOrder } from "@shared/schema";

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_API_KEY = process.env.DIRECTUS_API_KEY;

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

export class DirectusStorage implements IStorage {
  private baseUrl: string;
  private apiKey: string;

  constructor() {
    if (!DIRECTUS_URL || !DIRECTUS_API_KEY) {
      throw new Error("DIRECTUS_URL and DIRECTUS_API_KEY environment variables are required");
    }
    this.baseUrl = DIRECTUS_URL.replace(/\/$/, ''); // Remove trailing slash
    this.apiKey = DIRECTUS_API_KEY;
    console.log(`Directus configured: ${this.baseUrl}`);
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${this.apiKey}`,
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
        console.error(`Directus API error: ${response.status} ${response.statusText} for ${url}`);
        throw new Error(`Directus request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log(`Directus API success: ${url} returned ${data.data?.length || 0} items`);
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
        return response.data.map((category: DirectusCategory) => this.transformCategory(category));
      }
      return [];
    } catch (error) {
      console.error("Failed to fetch categories from Directus:", error);
      return []; // Return empty array instead of throwing to prevent app crash
    }
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    try {
      const response = await this.request(`/items/categories?filter[slug][_eq]=${slug}`);
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
        return response.data.map((product: DirectusProduct) => this.transformProduct(product));
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
      const response = await this.request(`/items/products?filter[slug][_eq]=${slug}`);
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
      const response = await this.request(`/items/products?search=${encodeURIComponent(query)}`);
      return response.data.map((product: DirectusProduct) => this.transformProduct(product));
    } catch (error) {
      console.error("Failed to search products in Directus:", error);
      return [];
    }
  }

  // Cart operations - these will still use local storage since they're session-based
  private cartItems: Map<number, CartItem> = new Map();
  private currentCartItemId: number = 1;

  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
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
    itemsToDelete.forEach(id => this.cartItems.delete(id));
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
}