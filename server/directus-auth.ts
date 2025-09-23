import type { User, LoginData, RegisterData } from "@shared/schema";

interface DirectusUser {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  status: string;
}

interface DirectusAuthResponse {
  access_token: string;
  expires: number;
  refresh_token: string;
}

export class DirectusAuth {
  private baseUrl: string;
  private apiKey: string;
  private adminEmail: string = 'xaranex@gmail.com';
  private adminPassword: string = '4yx4w7wlaieniq4saoovl592ld1ysu28';

  constructor() {
    this.baseUrl = process.env.DIRECTUS_URL || 'http://localhost:8055';
    this.apiKey = process.env.DIRECTUS_API_KEY || '';
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const url = `${this.baseUrl.replace(/\/$/, '')}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(this.apiKey && { 'Authorization': `Bearer ${this.apiKey}` }),
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Directus API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  async login(loginData: LoginData): Promise<{ user: DirectusUser; tokens: DirectusAuthResponse }> {
    try {
      const response = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
        }),
      });

      // Get user info
      const userResponse = await this.request('/users/me', {
        headers: {
          'Authorization': `Bearer ${response.data.access_token}`,
        },
      });

      return {
        user: userResponse.data,
        tokens: response.data,
      };
    } catch (error) {
      throw new Error(`Přihlášení se nezdařilo: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  }

  async register(registerData: RegisterData): Promise<{ user: DirectusUser; tokens: DirectusAuthResponse }> {
    try {
      // First login as admin to get access token
      const adminLoginResponse = await this.request('/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: this.adminEmail,
          password: this.adminPassword,
        }),
      });

      const adminToken = adminLoginResponse.data.access_token;

      // Create user using admin token
      const createUserResponse = await this.request('/users', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${adminToken}`,
        },
        body: JSON.stringify({
          email: registerData.email,
          password: registerData.password,
          first_name: registerData.firstName,
          last_name: registerData.lastName,
          status: 'active',
        }),
      });

      // Login the newly created user
      const loginResponse = await this.login({
        email: registerData.email,
        password: registerData.password,
      });

      return loginResponse;
    } catch (error) {
      throw new Error(`Registrace se nezdařila: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  }

  async refreshToken(refreshToken: string): Promise<DirectusAuthResponse> {
    try {
      const response = await this.request('/auth/refresh', {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });

      return response.data;
    } catch (error) {
      throw new Error(`Obnova tokenu se nezdařila: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  }

  async logout(refreshToken: string): Promise<void> {
    try {
      await this.request('/auth/logout', {
        method: 'POST',
        body: JSON.stringify({
          refresh_token: refreshToken,
        }),
      });
    } catch (error) {
      // Logout errors are not critical, just log them
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(accessToken: string): Promise<DirectusUser> {
    try {
      const response = await this.request('/users/me', {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
      });

      return response.data;
    } catch (error) {
      throw new Error(`Získání uživatele se nezdařilo: ${error instanceof Error ? error.message : 'Neznámá chyba'}`);
    }
  }
}

export const directusAuth = new DirectusAuth();