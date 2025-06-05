// Directus SDK integration placeholder
// This would integrate with the Directus backend if API key is provided

const DIRECTUS_URL = "https://f456-185-5-70-249.ngrok-free.app";

interface DirectusProduct {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  images: string[];
  in_stock: boolean;
}

export class DirectusClient {
  private baseUrl: string;
  private apiKey?: string;

  constructor(url: string = DIRECTUS_URL) {
    this.baseUrl = url;
    this.apiKey = import.meta.env.VITE_DIRECTUS_API_KEY || process.env.DIRECTUS_API_KEY;
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.apiKey) {
      headers['Authorization'] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: {
        ...headers,
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Directus request failed: ${response.statusText}`);
    }

    return response.json();
  }

  async getProducts() {
    try {
      const response = await this.request('/items/products');
      return response.data as DirectusProduct[];
    } catch (error) {
      console.warn('Directus API not available, falling back to local data');
      return [];
    }
  }

  async getProduct(id: number) {
    try {
      const response = await this.request(`/items/products/${id}`);
      return response.data as DirectusProduct;
    } catch (error) {
      console.warn('Directus API not available, falling back to local data');
      return null;
    }
  }

  async getCategories() {
    try {
      const response = await this.request('/items/categories');
      return response.data;
    } catch (error) {
      console.warn('Directus API not available, falling back to local data');
      return [];
    }
  }
}

export const directusClient = new DirectusClient();
