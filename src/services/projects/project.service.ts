import { env } from "@/env";
import { getAuthHeaders, handleResponse } from "../apiClient";

// Define the shape of your filters to match the backend
export interface ProjectFilters {
  title?: string;
  tag?: string;
  sort?: 'vibeScore' | 'createdAt';
  page?: number;
  limit?: number;
}

const getBaseUrl = () => {
  if (typeof window === 'undefined') {
    return env.BACKEND_URL;
  }
  return env.NEXT_PUBLIC_BACKEND_URL;
};

export const projectService = {
  // Existing getProjects...
  getProjects: async (filters: ProjectFilters = {}) => {
    try {
      // 1. Convert the filters object into URL query parameters
      const queryParams = new URLSearchParams();
      console.log(queryParams)

      if (filters.title) queryParams.append('title', filters.title);
      if (filters.tag) queryParams.append('tag', filters.tag);
      if (filters.sort) queryParams.append('sort', filters.sort);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.limit) queryParams.append('limit', filters.limit.toString());

      const queryString = queryParams.toString();
      const url = `${getBaseUrl()}/api/v1/projects${queryString ? `?${queryString}` : ''}`;

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
      console.log(data)
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
      const response = await fetch(`${getBaseUrl()}/api/v1/projects/${id}`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  getAverages: async () => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/projects/averages`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  

  createProject: async (projectData: any) => {
    try {
      const isFormData = projectData instanceof FormData;
      const response = await fetch(`${getBaseUrl()}/api/v1/projects`, {
        method: "POST",
        headers: getAuthHeaders({ json: !isFormData }),
        body: isFormData ? projectData : JSON.stringify(projectData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  updateProject: async (id: string, projectData: any) => {
    try {
      const isFormData = projectData instanceof FormData;
      const response = await fetch(`${getBaseUrl()}/api/v1/projects/${id}`, {
        method: "PUT",
        headers: getAuthHeaders({ json: !isFormData }),
        body: isFormData ? projectData : JSON.stringify(projectData),
      });
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  },

  deleteProject: async (id: string) => {
    try {
      const response = await fetch(`${getBaseUrl()}/api/v1/projects/${id}`, {
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
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}/review`, {
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
      const response = await fetch(`${env.NEXT_PUBLIC_BACKEND_URL}/api/v1/projects/${id}/comments`);
      return await handleResponse(response);
    } catch (error: any) {
      return { data: null, error: error.message };
    }
  }
};



export const calculateVibeScore = (ratings: Array<{ vibes: number; creativity: number; usefulness: number; cursedness: number }>) => {
  if (!ratings || ratings.length === 0) return 0.0;

  const total = ratings.reduce((acc, curr) => {
    // Basic average of the four metrics
    const avg = (curr.vibes + curr.creativity + curr.usefulness + curr.cursedness) / 4;
    return acc + avg;
  }, 0);

  // Return formatted to one decimal place (e.g., 4.2)
  return (total / ratings.length).toFixed(1);
};