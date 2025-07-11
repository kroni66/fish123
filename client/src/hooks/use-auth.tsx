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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await apiRequest("GET", "/api/auth/user");
        const userData = await response.json();
        setUser(userData);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (data: LoginData) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest("POST", "/api/auth/login", data);
      const loginResult = await response.json();
      
      // Set initial user data from login response
      setUser(loginResult.user);
      
      // Wait a moment for session to be established, then fetch fresh data
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        const userResponse = await apiRequest("GET", "/api/auth/user");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (userError) {
        // If fetching user data fails, keep the login result user data
        console.warn("Failed to fetch updated user data:", userError);
      }
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
      const registerResult = await response.json();
      
      // Set initial user data from registration response
      setUser(registerResult.user);
      
      // Wait a moment for session to be established, then fetch fresh data
      await new Promise(resolve => setTimeout(resolve, 100));
      
      try {
        const userResponse = await apiRequest("GET", "/api/auth/user");
        const userData = await userResponse.json();
        setUser(userData);
      } catch (userError) {
        // If fetching user data fails, keep the registration result user data
        console.warn("Failed to fetch updated user data:", userError);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registrace se nezdařila";
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await apiRequest("POST", "/api/auth/logout");
    } catch {
      // Logout should always succeed on client
    } finally {
      setUser(null);
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