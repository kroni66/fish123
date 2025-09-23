// Simplified schema for Directus integration - no database schemas needed
// Types are defined based on Directus collections

export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  directusId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description?: string;
  price: number;
  categoryId?: number;
  imageUrl?: string;
  images: string[];
  inStock: boolean;
  features: string[];
  dimensions?: string;
}

export interface CartItem {
  id: number;
  sessionId: string;
  productId: number;
  quantity: number;
  createdAt: Date;
}

export interface Order {
  id: number;
  userId?: string;
  sessionId: string;
  total: number;
  items: any[]; // OrderItem[]
  customerInfo: any; // CustomerInfo
  status: string;
  createdAt: Date;
}

export interface Review {
  id: number;
  productId: number;
  customerName: string;
  customerEmail: string;
  rating: number;
  title: string;
  comment: string;
  verified: boolean;
  helpful: number;
  userId?: string;
  createdAt: Date;
}

export interface Article {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  imageUrl?: string;
  readTime: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ArticleCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  createdAt: Date;
}

export interface WishlistItem {
  id: number;
  userId?: string;
  sessionId?: string;
  productId: number;
  createdAt: Date;
}

// Insert types (for creating new records)
export type InsertUser = Omit<User, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertCategory = Omit<Category, 'id'>;
export type InsertProduct = Omit<Product, 'id'>;
export type InsertCartItem = Omit<CartItem, 'id' | 'createdAt'>;
export type InsertOrder = Omit<Order, 'id' | 'createdAt'>;
export type InsertReview = Omit<Review, 'id' | 'createdAt'>;
export type InsertArticle = Omit<Article, 'id' | 'createdAt' | 'updatedAt'>;
export type InsertArticleCategory = Omit<ArticleCategory, 'id' | 'createdAt'>;
export type InsertWishlistItem = Omit<WishlistItem, 'id' | 'createdAt'>;

// JSON field types
export type CustomerInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
};

export type OrderItem = {
  productId: number;
  name: string;
  price: string;
  quantity: number;
};

// Authentication schemas using Zod
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Neplatná e-mailová adresa"),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků"),
});

export const registerSchema = z.object({
  email: z.string().email("Neplatná e-mailová adresa"),
  password: z.string().min(6, "Heslo musí mít alespoň 6 znaků"),
  firstName: z.string().min(1, "Jméno je povinné"),
  lastName: z.string().min(1, "Příjmení je povinné"),
});

// Insert schemas
export const insertCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export const insertProductSchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
  price: z.number(),
  categoryId: z.number().optional(),
  imageUrl: z.string().optional(),
  images: z.array(z.string()).default([]),
  inStock: z.boolean().default(true),
  features: z.array(z.string()).default([]),
  dimensions: z.string().optional(),
});

export const insertCartItemSchema = z.object({
  sessionId: z.string(),
  productId: z.number(),
  quantity: z.number().min(1).default(1),
});

export const insertOrderSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string(),
  total: z.number(),
  items: z.array(z.any()),
  customerInfo: z.object({
    name: z.string(),
    email: z.string(),
    address: z.string(),
    city: z.string(),
    postalCode: z.string(),
  }),
  status: z.string().default("pending"),
});

export const insertReviewSchema = z.object({
  productId: z.number(),
  userId: z.string(),
  customerName: z.string().optional(),
  customerEmail: z.string().email().optional(),
  rating: z.number().min(1).max(5),
  title: z.string().min(3, "Nadpis musí mít alespoň 3 znaky"),
  comment: z.string().min(5, "Komentář musí mít alespoň 5 znaků"),
  verified: z.boolean().default(false),
});

export const insertWishlistItemSchema = z.object({
  userId: z.string().optional(),
  sessionId: z.string().optional(),
  productId: z.number(),
});

export const insertArticleSchema = z.object({
  title: z.string(),
  slug: z.string(),
  excerpt: z.string(),
  content: z.string(),
  author: z.string(),
  category: z.string(),
  imageUrl: z.string().optional(),
  readTime: z.number(),
  published: z.boolean().default(true),
});

export const insertArticleCategorySchema = z.object({
  name: z.string(),
  slug: z.string(),
  description: z.string().optional(),
});

export type LoginData = z.infer<typeof loginSchema>;
export type RegisterData = z.infer<typeof registerSchema>;
