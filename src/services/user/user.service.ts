import { env } from "@/env";
import { getAuthHeaders, handleResponse } from "../apiClient";

export const userService = {
  getProfile: async () => {
    try {
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile`, {
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  updateProfile: async (updateData: any) => {
    try {
      const isFormData = updateData instanceof FormData;
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/profile`, {
        method: "PUT",
        headers: getAuthHeaders({ json: !isFormData }),
        body: isFormData ? updateData : JSON.stringify(updateData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getMyProjects: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const query = new URLSearchParams();

      
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));

      const queryString = query.toString();
      const url = `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/projects${queryString ? `?${queryString}` : ""}`;

      const response = await fetch(url, {
        headers: getAuthHeaders(),
      });

      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getActivity: async (params: { page?: number; limit?: number } = {}) => {
    try {
      const query = new URLSearchParams();
      if (params.page) query.append("page", String(params.page));
      if (params.limit) query.append("limit", String(params.limit));

      const response = await fetch(
        `${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/users/activity?${query.toString()}`,
        {
          headers: getAuthHeaders(),
        }
      );
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};