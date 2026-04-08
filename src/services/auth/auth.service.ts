import { env } from "@/env";
import { handleResponse } from "../apiClient";

export interface userData{
    name: string;
    email: string;
    password: string; 
}

export interface credentials{
    email: string;
    password: string; 
}

export const authService = {
  register: async (userData: userData) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      console.log("Register Response:", response);
      // if(!response.ok){
      //   const errorData = await response.json();
      //   throw new Error(errorData.message || "Registration failed");
      // }
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  login: async (credentials: credentials) => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },
};