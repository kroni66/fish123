// Directus SDK integration placeholder
// This would integrate with the Directus backend if API key is provided

const DIRECTUS_URL = process.env.DIRECTUS_URL || import.meta.env.VITE_DIRECTUS_URL;

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
    // API key should not be used directly in client-side code if it has elevated privileges.
    // For public data, Directus can be configured to allow access without a key,
    // or a restricted, read-only key can be used if absolutely necessary and safe.
    // Removing direct API key usage here.
    // this.apiKey = import.meta.env.VITE_DIRECTUS_API_KEY; // Removed
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // Authorization header should be added based on user session/token for authenticated requests,
    // or not at all for public requests. Direct API key usage removed from client.
    // if (this.apiKey) {
    //   headers["Authorization"] = `Bearer ${this.apiKey}`;
    // }

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
      const response = await this.request("/items/products");
      return response.data as DirectusProduct[];
    } catch (error) {
      console.warn("Directus API not available, falling back to local data");
      return [];
    }
  }

  async getProduct(id: number) {
    try {
      const response = await this.request(`/items/products/${id}`);
      return response.data as DirectusProduct;
    } catch (error) {
      console.warn("Directus API not available, falling back to local data");
      return null;
    }
  }

  async getCategories() {
    try {
      const response = await this.request("/items/categories");
      return response.data;
    } catch (error) {
      console.warn("Directus API not available, falling back to local data");
      return [];
    }
  }
}

export const directusClient = new DirectusClient();
