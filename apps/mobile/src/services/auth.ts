import { User } from '../types';
import { apiClient } from './api';
import { StorageService } from './storage';

const AUTH_TOKEN_KEY = '@darzi_auth_token';
const AUTH_USER_KEY = '@darzi_auth_user';

export interface AuthResponse {
  user: User;
  token: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

/**
 * Authentication service for managing user authentication
 */
export class AuthService {
  /**
   * Login with email and password
   */
  static async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      
      // Mock implementation for development
      const mockUser: User = {
        id: '1',
        name: 'John Doe',
        email: credentials.email,
      };
      const mockToken = 'mock-token-' + Date.now();

      const response: AuthResponse = {
        user: mockUser,
        token: mockToken,
      };

      // Store auth data
      await StorageService.setItem(AUTH_TOKEN_KEY, response.token);
      await StorageService.setObject(AUTH_USER_KEY, response.user);
      
      // Set token in API client
      apiClient.setAuthToken(response.token);

      return response;
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  }

  /**
   * Sign up with name, email, and password
   */
  static async signup(credentials: SignupCredentials): Promise<AuthResponse> {
    try {
      // TODO: Replace with actual API call when backend is ready
      // const response = await apiClient.post<AuthResponse>('/auth/signup', credentials);
      
      // Mock implementation for development
      const mockUser: User = {
        id: '1',
        name: credentials.name,
        email: credentials.email,
      };
      const mockToken = 'mock-token-' + Date.now();

      const response: AuthResponse = {
        user: mockUser,
        token: mockToken,
      };

      // Store auth data
      await StorageService.setItem(AUTH_TOKEN_KEY, response.token);
      await StorageService.setObject(AUTH_USER_KEY, response.user);
      
      // Set token in API client
      apiClient.setAuthToken(response.token);

      return response;
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    }
  }

  /**
   * Logout and clear authentication data
   */
  static async logout(): Promise<void> {
    try {
      // TODO: Call logout endpoint when backend is ready
      // await apiClient.post('/auth/logout', {});

      // Clear stored auth data
      await StorageService.removeItem(AUTH_TOKEN_KEY);
      await StorageService.removeItem(AUTH_USER_KEY);
      
      // Clear token from API client
      apiClient.clearAuthToken();
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  /**
   * Get the current user from storage
   */
  static async getCurrentUser(): Promise<User | null> {
    try {
      return await StorageService.getObject<User>(AUTH_USER_KEY);
    } catch (error) {
      console.error('Failed to get current user:', error);
      return null;
    }
  }

  /**
   * Get the current auth token from storage
   */
  static async getAuthToken(): Promise<string | null> {
    try {
      return await StorageService.getItem(AUTH_TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get auth token:', error);
      return null;
    }
  }

  /**
   * Refresh the authentication token
   */
  static async refreshToken(): Promise<string> {
    try {
      // TODO: Implement token refresh when backend is ready
      // const response = await apiClient.post<{ token: string }>('/auth/refresh', {});
      
      // Mock implementation
      const newToken = 'refreshed-token-' + Date.now();
      
      await StorageService.setItem(AUTH_TOKEN_KEY, newToken);
      apiClient.setAuthToken(newToken);
      
      return newToken;
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  }
}
