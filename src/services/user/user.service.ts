import { env } from "@/env";
import { getAuthHeaders, handleResponse } from "../apiClient";

export const userService = {
  getProfile: async () => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/users/profile`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  updateProfile: async (updateData: any) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/users/profile`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify(updateData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getMyProjects: async () => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/users/projects`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};