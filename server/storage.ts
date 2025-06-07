import { 
  users,
  categories, 
  products, 
  cartItems, 
  orders,
  reviews,
  type User,
  type Category, 
  type Product, 
  type CartItem, 
  type Order,
  type Review,
  type InsertUser,
  type InsertCategory, 
  type InsertProduct, 
  type InsertCartItem, 
  type InsertOrder,
  type InsertReview
} from "@shared/schema";

export interface IStorage {
  // Users
  getUserByEmail(email: string): Promise<User | undefined>;
  getUserByDirectusId(directusId: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<User>): Promise<User>;

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

  // Reviews
  getProductReviews(productId: number): Promise<Review[]>;
  createReview(review: InsertReview): Promise<Review>;
  getReview(id: number): Promise<Review | undefined>;
  markReviewHelpful(id: number): Promise<Review>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private categories: Map<number, Category>;
  private products: Map<number, Product>;
  private cartItems: Map<number, CartItem>;
  private orders: Map<number, Order>;
  private reviews: Map<number, Review>;
  private currentUserId: number;
  private currentCategoryId: number;
  private currentProductId: number;
  private currentCartItemId: number;
  private currentOrderId: number;
  private currentReviewId: number;

  constructor() {
    this.categories = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
    this.reviews = new Map();
    this.currentCategoryId = 1;
    this.currentProductId = 1;
    this.currentCartItemId = 1;
    this.currentOrderId = 1;
    this.currentReviewId = 1;

    // Initialize with sample data
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Categories
    const sampleCategories: Category[] = [
      { id: 1, name: "Všechny produkty", slug: "all", description: "Veškeré rybářské produkty" },
      { id: 2, name: "Pruty", slug: "rods", description: "Rybářské pruty pro každou techniku" },
      { id: 3, name: "Navijáky", slug: "reels", description: "Kvalitní navijáky a cívky" },
      { id: 4, name: "Návnady", slug: "baits", description: "Umělé i živé návnady" },
      { id: 5, name: "Háčky a montáže", slug: "hooks", description: "Háčky, olova a montáže" },
      { id: 6, name: "Příslušenství", slug: "accessories", description: "Rybářské doplňky a vybavení" },
    ];

    sampleCategories.forEach(category => {
      this.categories.set(category.id, category);
      this.currentCategoryId = Math.max(this.currentCategoryId, category.id + 1);
    });

    // Products
    const sampleProducts: Product[] = [
      {
        id: 1,
        name: "Kaprový prut Carbon Master 3.6m",
        slug: "kaprovy-prut-carbon-master",
        description: "Prémiový kaprový prut z vysokomodulního uhlíku pro náročné rybáře. Díky své progresivní akci zvládne jak jemné prezentace, tak i boj s velkými rybami. Ergonomická rukojeť s korkovým potahem zajišťuje pohodlí při dlouhých sezeních.",
        price: "3299.99",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: [
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"
        ],
        inStock: true,
        features: ["Vysokomodulní uhlíkové vlákno", "Progresivní akce", "Korkový potah rukojeti", "Testovací křivka 3.5 lb"],
        dimensions: "Délka: 3.6m, Váha: 285g"
      },
      {
        id: 2,
        name: "Naviják Shimano Baitrunner 6000",
        slug: "navijak-shimano-baitrunner",
        description: "Špičkový kaprový naviják s patentovaným systémem Baitrunner pro volný chod. Hliníková cívka a precizní brzdy zajišťují spolehlivost při boji s velkými rybami. Ideal pro feederové i kaprové rybaření.",
        price: "4299.99",
        categoryId: 3,
        imageUrl: "https://images.unsplash.com/photo-1567207539374-7b5d4b37d2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1567207539374-7b5d4b37d2b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Baitrunner systém", "Hliníková cívka", "Precizní brzdy", "Kapacita: 260m/0.35mm"],
        dimensions: "Převod: 4.6:1, Váha: 485g"
      },
      {
        id: 3,
        name: "Balíček umělých návnad Pro Mix",
        slug: "balicek-umelych-navnad-pro-mix",
        description: "Kompletní sada umělých návnad pro všechny druhy dravých ryb. Obsahuje wobbery, spinnery a gumové nástrahy v různých barvách a velikostech. Ideální pro začínající i pokročilé spiningisty.",
        price: "1899.99",
        categoryId: 4,
        imageUrl: "https://images.unsplash.com/photo-1578072449089-902e5384bc13?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578072449089-902e5384bc13?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Wobbery a spinnery", "Gumové nástrahy", "Různé barvy a velikosti", "Praktické plastové boxy"],
        dimensions: "Box: 23cm x 12cm x 4cm"
      },
      {
        id: 4,
        name: "AquaClean Filter Pro",
        slug: "aquaclean-filter-pro",
        description: "Pokročilý 3stupňový filtrační systém pro křišťálově čistou vodu. Zahrnuje mechanické, biologické a chemické filtrační médium.",
        price: "4899.99",
        categoryId: 5,
        imageUrl: "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["3stupňová filtrace", "Křišťálově čistá voda", "Snadná údržba", "Tichý chod"],
        dimensions: "30 cm x 20 cm x 25 cm"
      },
      {
        id: 5,
        name: "Přírodní kořen",
        slug: "prirodni-koren",
        description: "Prémiový kořen pro přírodní akvascaping. Každý kus je jedinečný a vytváří úžasné podmořské krajiny.",
        price: "849.99",
        categoryId: 2,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Přírodní kořen", "Jedinečný kus", "Připravený k akvascapingu", "Předem ošetřený"],
        dimensions: "25 cm x 15 cm x 10 cm"
      },
      {
        id: 6,
        name: "Prémiový substrát",
        slug: "premiovy-substrat",
        description: "Živinami bohatý substrát speciálně navržený pro akvárium s rostlinami. Podporuje zdravý rozvoj kořenů a růst rostlin.",
        price: "599.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Bohatý na živiny", "Podpora růstu rostlin", "pH neutrální", "Přírodní vzhled"],
        dimensions: "2,5 kg pytel"
      },
      {
        id: 7,
        name: "ThermoControl ohřívač",
        slug: "thermocontrol-ohrivac",
        description: "Přesný teplotní ohřívač pro tropické ryby. Obsahuje digitální displej a automatické vypnutí pro bezpečnost.",
        price: "1699.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Digitální displej", "Automatické vypnutí", "Přesné ovládání", "Certifikovaná bezpečnost"],
        dimensions: "20 cm x 4 cm"
      },
      {
        id: 8,
        name: "AirFlow Pro čerpadlo",
        slug: "airflow-pro-cerpadlo",
        description: "Tiché vzduchové čerpadlo s dekorativními bublinkovými efekty. Vytváří krásné bublinové závěsy při okysličování akvária.",
        price: "999.99",
        categoryId: 6,
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&h=500",
        images: ["https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600"],
        inStock: true,
        features: ["Tichý chod", "Dekorativní bubliny", "Vysoká účinnost", "Odolná konstrukce"],
        dimensions: "10 cm x 8 cm x 5 cm"
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

  async getProductReviews(productId: number): Promise<Review[]> {
    return Array.from(this.reviews.values()).filter(review => review.productId === productId);
  }

  async createReview(insertReview: InsertReview): Promise<Review> {
    const id = this.currentReviewId++;
    const review: Review = { 
      ...insertReview, 
      id,
      createdAt: new Date(),
      verified: insertReview.verified || false,
      helpful: 0
    };
    this.reviews.set(id, review);
    return review;
  }

  async getReview(id: number): Promise<Review | undefined> {
    return this.reviews.get(id);
  }

  async markReviewHelpful(id: number): Promise<Review> {
    const review = this.reviews.get(id);
    if (!review) {
      throw new Error(`Review ${id} not found`);
    }
    review.helpful = (review.helpful || 0) + 1;
    this.reviews.set(id, review);
    return review;
  }
}

export const storage = new MemStorage();
