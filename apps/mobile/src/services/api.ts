import { StorageService } from './storage';

const AUTH_TOKEN_KEY = '@darzi_auth_token';

/**
 * Custom API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

/**
 * Check if the device is online
 */
async function checkNetworkConnection(): Promise<boolean> {
  try {
    // Try to fetch a small resource to check connectivity
    const response = await fetch('https://www.google.com/favicon.ico', {
      method: 'HEAD',
      cache: 'no-cache',
    });
    return response.ok;
  } catch {
    return false;
  }
}

/**
 * API client for making HTTP requests with authentication
 */
export class ApiClient {
  private baseURL: string;
  private authToken: string | null = null;

  constructor(baseURL: string = 'https://api.darzi.com') {
    this.baseURL = baseURL;
  }

  /**
   * Initialize the API client by loading the auth token from storage
   */
  async initialize(): Promise<void> {
    this.authToken = await StorageService.getItem(AUTH_TOKEN_KEY);
  }

  /**
   * Set the authentication token
   */
  setAuthToken(token: string): void {
    this.authToken = token;
  }

  /**
   * Clear the authentication token
   */
  clearAuthToken(): void {
    this.authToken = null;
  }

  /**
   * Get default headers including auth token if available
   */
  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (this.authToken) {
      headers['Authorization'] = `Bearer ${this.authToken}`;
    }

    return headers;
  }

  /**
   * Handle API response with enhanced error handling
   */
  private async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      let errorMessage = 'An error occurred';
      let errorData: any = null;

      try {
        errorData = await response.json();
        errorMessage = errorData.message || errorData.error || errorMessage;
      } catch {
        // If response is not JSON, use status text
        errorMessage = response.statusText || errorMessage;
      }

      // Log error for debugging
      console.error('API Error:', {
        status: response.status,
        message: errorMessage,
        data: errorData,
      });

      throw new ApiError(errorMessage, response.status, errorData);
    }

    return response.json();
  }

  /**
   * Make a request with network check and error handling
   */
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    try {
      // Check network connectivity
      const isOnline = await checkNetworkConnection();
      if (!isOnline) {
        throw new ApiError('No internet connection. Please check your network.', 0);
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        ...options,
        headers: this.getHeaders(),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      // Re-throw ApiError as is
      if (error instanceof ApiError) {
        throw error;
      }

      // Handle network errors
      if (error instanceof TypeError && error.message.includes('fetch')) {
        console.error('Network error:', error);
        throw new ApiError('Network error. Please check your connection.');
      }

      // Handle other errors
      console.error('Unexpected error:', error);
      throw new ApiError(
        error instanceof Error ? error.message : 'An unexpected error occurred'
      );
    }
  }

  /**
   * Make a GET request
   */
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Make a POST request
   */
  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * Make a PUT request
   */
  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * Make a DELETE request
   */
  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

// Export a singleton instance
export const apiClient = new ApiClient();
