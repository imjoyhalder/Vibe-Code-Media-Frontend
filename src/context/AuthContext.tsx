"use client";

import { userService } from "@/services/user/user.service";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";


// 1. Define the shape of our User and Context
interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
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

  // Check for existing session on page load/refresh
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const { data, error } = await userService.getProfile();
          if (data) setUser(data);
          else localStorage.removeItem("token");
        } catch (err) {
          localStorage.removeItem("token");
        }
      }
      setIsLoading(false);
    };
    checkAuth();
  }, []);

  const login = (token: string, userData: User) => {
    localStorage.setItem("token", token);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("token");
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