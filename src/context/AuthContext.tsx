"use client";

import { userService } from "@/services/user/user.service";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";


// 1. Define the shape of our User and Context
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string | null;
  createdAt?: string;
}

interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// 2. Create the actual Context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Create the Provider Component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setIsLoading(false);
        return;
      }

      // Load user from localStorage first for instant UI
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }

      try {
        const { data, error } = await userService.getProfile();

        if (data) {
          setUser(data);
          localStorage.setItem("user", JSON.stringify(data));
        } else {
          // Log the actual error to see why it failed
          console.log("Profile Error Details:", error);

          // ONLY logout if it's a specific auth failure
          // Check if your error message includes 'expired' or 'token' or 'unauthorized'
          const isAuthError = error?.toLowerCase().includes("token") ||
            error?.toLowerCase().includes("unauthorized") ||
            error?.toLowerCase().includes("login");

          if (isAuthError) {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            setUser(null);
          }
        }
      } catch (err) {
        // If the API call itself crashes (network error), DON'T remove the token
        console.error("Network or unexpected error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 4. Create a custom hook for easy access
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};