import { env } from "@/env";

 export const getAuthHeaders = (options?: { json?: boolean }) => {
  const token = localStorage.getItem("token"); // Adjust based on your auth storage
  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options?.json === false ? {} : { "Content-Type": "application/json" }),
  };
};

export const handleResponse = async (response: Response) => {
  try {
    const result = await response.json();

    // 1. Check if the HTTP status is in the 200-299 range
    if (!response.ok) {
      // Return the error message from the backend, or a fallback
      return { 
        data: null, 
        error: result.message || `Error ${response.status}: ${response.statusText}` 
      };
    }

    // 2. Return the data payload from your backend structure
    // Your API usually returns { success: true, data: { ... }, message: "..." }
    return { 
      data: result.data, 
      error: null 
    };
    
  } catch (err) {
    // 3. Handle cases where the response isn't valid JSON or network fails
    console.error("API Response Parsing Error:", err);
    return { 
      data: null, 
      error: "The server returned an unexpected response." 
    };
  }
};