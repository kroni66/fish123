import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { apiRequest } from "@/lib/queryClient";
import type { User, LoginData, RegisterData } from "@shared/schema";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface TokenData {
  access_token: string;
  refresh_token: string;
  expires: number;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getStoredTokens = (): TokenData | null => {
    try {
      const tokens = localStorage.getItem("auth_tokens");
      return tokens ? JSON.parse(tokens) : null;
    } catch {
      return null;
    }
  };

  const setStoredTokens = (tokens: TokenData | null) => {
    if (tokens) {
      localStorage.setItem("auth_tokens", JSON.stringify(tokens));
    } else {
      localStorage.removeItem("auth_tokens");
    }
  };

  const isTokenExpired = (tokens: TokenData): boolean => {
    return Date.now() >= tokens.expires * 1000;
  };

  const refreshTokens = async (): Promise<TokenData | null> => {
    const tokens = getStoredTokens();
    if (!tokens) return null;

    try {
      const response = await apiRequest("POST", "/api/auth/refresh", {
        refreshToken: tokens.refresh_token,
      });
      const newTokens = await response.json();
      setStoredTokens(newTokens);
      return newTokens;
    } catch {
      setStoredTokens(null);
      return null;
    }
  };

  const makeAuthenticatedRequest = async (url: string): Promise<Response> => {
    let tokens = getStoredTokens();
    
    if (!tokens) {
      throw new Error("No authentication tokens");
    }

    if (isTokenExpired(tokens)) {
      tokens = await refreshTokens();
      if (!tokens) {
        throw new Error("Unable to refresh tokens");
      }
    }

    return fetch(url, {
      headers: {
        "Authorization": `Bearer ${tokens.access_token}`,
        "Content-Type": "application/json",
      },
    });
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await makeAuthenticatedRequest("/api/auth/me");
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setStoredTokens(null);
        setUser(null);
      }
    } catch {
      setStoredTokens(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const tokens = getStoredTokens();
    if (tokens) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const result = await response.json();
      
      setStoredTokens(result.tokens);
      setUser(result.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Přihlášení se nezdařilo";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest("POST", "/api/auth/register", data);
      const result = await response.json();
      
      setStoredTokens(result.tokens);
      setUser(result.user);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registrace se nezdařila";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      const tokens = getStoredTokens();
      if (tokens) {
        await apiRequest("POST", "/api/auth/logout", {
          refreshToken: tokens.refresh_token,
        });
      }
    } catch {
      // Logout should always succeed on client
    } finally {
      setStoredTokens(null);
      setUser(null);
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}