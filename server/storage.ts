import { 
  users,
  categories, 
  products, 
  cartItems, 
  orders,
  reviews,
  articles,
  articleCategories,
  wishlistItems,
  type User,
  type Category, 
  type Product, 
  type CartItem, 
  type Order,
  type Review,
  type Article,
  type ArticleCategory,
  type WishlistItem,
  type InsertUser,
  type InsertCategory, 
  type InsertProduct, 
  type InsertCartItem, 
  type InsertOrder,
  type InsertReview,
  type InsertArticle,
  type InsertArticleCategory,
  type InsertWishlistItem
} from "@shared/schema";

export interface IStorage {
  // Users
  // getUserByEmail(email: string): Promise<User | undefined>; // Removed as Directus handles this
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

  // Articles
  getArticles(categorySlug?: string): Promise<Article[]>;
  getArticleById(id: number): Promise<Article | undefined>;
  getArticleBySlug(slug: string): Promise<Article | undefined>;
  createArticle(article: InsertArticle): Promise<Article>;
  getArticleCategories(): Promise<ArticleCategory[]>;

  // Wishlist
  getWishlistItems(sessionId: string): Promise<WishlistItem[]>;
  getWishlistItemsByUser(userId: string, accessToken?: string): Promise<WishlistItem[]>;
  addToWishlist(item: InsertWishlistItem, accessToken?: string): Promise<WishlistItem>;
  removeFromWishlist(id: number): Promise<void>;
  isInWishlist(sessionId: string, productId: number): Promise<boolean>;
  isInWishlistByUser(userId: string, productId: number): Promise<boolean>;
}

// MemStorage class removed as it's no longer used.
// The application will now exclusively use DirectusStorage.

// The 'storage' variable is initialized in routes.ts using DirectusStorage.
// Ensure that DirectusStorage implements all methods from IStorage.
// export const storage = new MemStorage(); // This line is removed.
