import { env } from "@/env";
import { getAuthHeaders, handleResponse } from "../apiClient";

// Define the shape of your filters to match the backend
export interface ProjectFilters {
    tag?: string;
    sort?: 'vibeScore' | 'createdAt';
    page?: number;
    limit?: number;
}

export const projectService = {
  // Existing getProjects...
  getProjects: async (filters: ProjectFilters = {}) => {
        try {
            // 1. Convert the filters object into URL query parameters
            const queryParams = new URLSearchParams();
            
            if (filters.tag) queryParams.append('tag', filters.tag);
            if (filters.sort) queryParams.append('sort', filters.sort);
            if (filters.page) queryParams.append('page', filters.page.toString());
            if (filters.limit) queryParams.append('limit', filters.limit.toString());

            const queryString = queryParams.toString();
            const url = `${env.BACKEND_URL}/api/v1/projects${queryString ? `?${queryString}` : ''}`;

            // 2. Fetch data from the backend
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // data will contain { projects, total, page, limit } based on your backend return
            return { data, error: null };
        } catch (error) {
            console.error("Project Fetch Error:", error);
            return { 
                data: null, 
                error: error instanceof Error ? error.message : 'Failed to fetch projects' 
            };
        }
    },

  getProjectById: async (id: string) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects/${id}`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getAverages: async () => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects/averages`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  createProject: async (projectData: any) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(projectData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  deleteProject: async (id: string) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  // --- Interactions ---
  submitReview: async (id: string, reviewData: any) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects/${id}/review`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify(reviewData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getComments: async (id: string) => {
    try {
      const response = await fetch(`${env.BACKEND_URL}/api/v1/projects/${id}/comments`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};