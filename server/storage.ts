import { 
  categories, 
  products, 
  cartItems, 
  orders,
  type Category, 
  type Product, 
  type CartItem, 
  type Order,
  type InsertCategory, 
  type InsertProduct, 
  type InsertCartItem, 
  type InsertOrder 
} from "@shared/schema";

export interface IStorage {
  // Categories
  getCategories(): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;

  // Products
  getProducts(categoryId?: number): Promise<Product[]>;
  getProductById(id: number): Promise<Product | undefined>;
  getProductBySlug(slug: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;
  searchProducts(query: string): Promise<Product[]>;

  // Cart
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addToCart(item: InsertCartItem): Promise<CartItem>;
  updateCartItem(id: number, quantity: number): Promise<CartItem>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Orders
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: number): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Categories
    const sampleCategories: Category[] = [
      { id: 1, name: "All Products", slug: "all", description: "All fish accessories" },
      { id: 2, name: "Decorations", slug: "decorations", description: "Aquarium decorations and ornaments" },
      { id: 3, name: "Lighting", slug: "lighting", description: "LED and aquarium lighting systems" },
      { id: 4, name: "Plants", slug: "plants", description: "Live and artificial aquarium plants" },
      { id: 5, name: "Filters", slug: "filters", description: "Water filtration systems" },
      { id: 6, name: "Accessories", slug: "accessories", description: "Various aquarium accessories" },
    ];

    sampleCategories.forEach(category => {
      this.categories.set(category.id, category);
      this.currentCategoryId = Math.max(this.currentCategoryId, category.id + 1);
    });

    // Products
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Coral Reef Castle",
        slug: "coral-reef-castle",
        description: "Transform your aquarium into an underwater paradise with our premium Coral Reef Castle. This vibrant decoration features multiple hiding spots and swim-through areas that your fish will love. Made from aquarium-safe materials with realistic coral textures and natural colors.",
        price: "89.99",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: [
          "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: true,
        features: ["Multiple hiding spots for fish", "Aquarium-safe resin construction", "Realistic coral textures", "Suitable for freshwater and saltwater"],
        dimensions: "8\" x 6\" x 7\""
      },
      {
        id: 2,
        name: "LED Aqua Light Pro",
        slug: "led-aqua-light-pro",
        description: "Full spectrum LED lighting system designed for optimal plant growth and fish health. Features adjustable color temperature and intensity controls.",
        price: "159.99",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Full spectrum LED", "Adjustable color temperature", "Energy efficient", "Remote control included"],
        dimensions: "24\" x 4\" x 2\""
      },
      {
        id: 3,
        name: "Aquatic Plant Bundle",
        slug: "aquatic-plant-bundle",
        description: "Live aquarium plants for creating a natural ecosystem. This bundle includes a variety of easy-to-care-for plants perfect for beginners.",
        price: "49.99",
        categoryId: 4,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Live aquarium plants", "Easy to care for", "Natural ecosystem", "Beginner friendly"],
        dimensions: "Various sizes"
      },
      {
        id: 4,
        name: "AquaClean Filter Pro",
        slug: "aquaclean-filter-pro",
        description: "Advanced 3-stage filtration system for crystal clear water. Includes mechanical, biological, and chemical filtration media.",
        price: "199.99",
        categoryId: 5,
        imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["3-stage filtration", "Crystal clear water", "Easy maintenance", "Quiet operation"],
        dimensions: "12\" x 8\" x 10\""
      },
      {
        id: 5,
        name: "Natural Driftwood",
        slug: "natural-driftwood",
        description: "Premium driftwood piece for natural aquascaping. Each piece is unique and creates stunning underwater landscapes.",
        price: "34.99",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Natural driftwood", "Unique piece", "Aquascaping ready", "Pre-treated"],
        dimensions: "10\" x 6\" x 4\""
      },
      {
        id: 6,
        name: "Premium Substrate",
        slug: "premium-substrate",
        description: "Nutrient-rich substrate specifically designed for planted aquariums. Promotes healthy root development and plant growth.",
        price: "24.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Nutrient-rich", "Plant growth support", "pH neutral", "Natural appearance"],
        dimensions: "5lb bag"
      },
      {
        id: 7,
        name: "ThermoControl Heater",
        slug: "thermocontrol-heater",
        description: "Precise temperature control heater for tropical fish. Features digital display and automatic shut-off for safety.",
        price: "69.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Digital display", "Automatic shut-off", "Precise control", "Safety certified"],
        dimensions: "8\" x 1.5\""
      },
      {
        id: 8,
        name: "AirFlow Pro Pump",
        slug: "airflow-pro-pump",
        description: "Silent air pump with decorative bubble effects. Creates beautiful bubble curtains while oxygenating your aquarium.",
        price: "39.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Silent operation", "Decorative bubbles", "High efficiency", "Durable construction"],
        dimensions: "4\" x 3\" x 2\""
      }
    ];

    sampleProducts.forEach(product => {
      this.products.set(product.id, product);
      this.currentProductId = Math.max(this.currentProductId, product.id + 1);
    });
  }

  // Categories
  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values());
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    return Array.from(this.categories.values()).find(cat => cat.slug === slug);
  }

  async createCategory(insertCategory: InsertCategory): Promise<Category> {
    const id = this.currentCategoryId++;
    const category: Category = { ...insertCategory, id };
    this.categories.set(id, category);
    return category;
  }

  // Products
  async getProducts(categoryId?: number): Promise<Product[]> {
    const allProducts = Array.from(this.products.values());
    if (!categoryId || categoryId === 1) {
      return allProducts;
    }
    return allProducts.filter(product => product.categoryId === categoryId);
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getProductBySlug(slug: string): Promise<Product | undefined> {
    return Array.from(this.products.values()).find(product => product.slug === slug);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentProductId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  async searchProducts(query: string): Promise<Product[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.products.values()).filter(product =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.description?.toLowerCase().includes(lowerQuery)
    );
  }

  // Cart
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
  }

  async addToCart(insertCartItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists in cart
    const existingItem = Array.from(this.cartItems.values()).find(
      item => item.sessionId === insertCartItem.sessionId && item.productId === insertCartItem.productId
    );

    if (existingItem) {
      // Update quantity
      const updatedItem = { ...existingItem, quantity: existingItem.quantity + insertCartItem.quantity };
      this.cartItems.set(existingItem.id, updatedItem);
      return updatedItem;
    }

    const id = this.currentCartItemId++;
    const cartItem: CartItem = { 
      ...insertCartItem, 
      id,
      createdAt: new Date()
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItem(id: number, quantity: number): Promise<CartItem> {
    const item = this.cartItems.get(id);
    if (!item) {
      throw new Error("Cart item not found");
    }
    const updatedItem = { ...item, quantity };
    this.cartItems.set(id, updatedItem);
    return updatedItem;
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const itemsToRemove = Array.from(this.cartItems.entries())
      .filter(([_, item]) => item.sessionId === sessionId);
    
    itemsToRemove.forEach(([id, _]) => {
      this.cartItems.delete(id);
    });
  }

  // Orders
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { 
      ...insertOrder, 
      id,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }
}

export const storage = new MemStorage();
