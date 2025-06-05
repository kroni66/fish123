export interface CartItemWithProduct {
  id: number;
  sessionId: string;
  productId: number | null;
  quantity: number;
  createdAt: Date | null;
  product?: {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    price: string;
    categoryId: number | null;
    imageUrl: string | null;
    images: string[];
    inStock: boolean | null;
    features: string[];
    dimensions: string | null;
  };
}

export interface SearchFilters {
  category: number | null;
  query: string;
  minPrice?: number;
  maxPrice?: number;
}
