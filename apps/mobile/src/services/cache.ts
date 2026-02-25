import AsyncStorage from '@react-native-async-storage/async-storage';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  expiresIn: number; // milliseconds
}

interface CacheOptions {
  expiresIn?: number; // milliseconds, default 5 minutes
}

const DEFAULT_EXPIRY = 5 * 60 * 1000; // 5 minutes

/**
 * Cache service for storing and retrieving frequently accessed data
 * Features:
 * - Automatic expiration
 * - Cache invalidation
 * - Offline data access
 * - Type-safe operations
 */
class CacheService {
  private memoryCache: Map<string, CacheEntry<any>> = new Map();

  /**
   * Get data from cache (checks memory first, then AsyncStorage)
   */
  async get<T>(key: string): Promise<T | null> {
    try {
      // Check memory cache first
      const memoryEntry = this.memoryCache.get(key);
      if (memoryEntry && !this.isExpired(memoryEntry)) {
        return memoryEntry.data as T;
      }

      // Check AsyncStorage
      const stored = await AsyncStorage.getItem(key);
      if (!stored) {
        return null;
      }

      const entry: CacheEntry<T> = JSON.parse(stored);
      
      // Check if expired
      if (this.isExpired(entry)) {
        await this.remove(key);
        return null;
      }

      // Update memory cache
      this.memoryCache.set(key, entry);
      
      return entry.data;
    } catch (error) {
      console.error(`Cache get error for key ${key}:`, error);
      return null;
    }
  }

  /**
   * Set data in cache (both memory and AsyncStorage)
   */
  async set<T>(key: string, data: T, options: CacheOptions = {}): Promise<void> {
    try {
      const expiresIn = options.expiresIn || DEFAULT_EXPIRY;
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        expiresIn,
      };

      // Store in memory cache
      this.memoryCache.set(key, entry);

      // Store in AsyncStorage
      await AsyncStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error(`Cache set error for key ${key}:`, error);
    }
  }

  /**
   * Remove data from cache
   */
  async remove(key: string): Promise<void> {
    try {
      this.memoryCache.delete(key);
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.error(`Cache remove error for key ${key}:`, error);
    }
  }

  /**
   * Clear all cache data
   */
  async clear(): Promise<void> {
    try {
      this.memoryCache.clear();
      // Get all keys and remove cache-related ones
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => key.startsWith('cache:'));
      await AsyncStorage.multiRemove(cacheKeys);
    } catch (error) {
      console.error('Cache clear error:', error);
    }
  }

  /**
   * Invalidate cache entries matching a pattern
   */
  async invalidate(pattern: string): Promise<void> {
    try {
      // Clear from memory cache
      const memoryKeys = Array.from(this.memoryCache.keys());
      memoryKeys.forEach(key => {
        if (key.includes(pattern)) {
          this.memoryCache.delete(key);
        }
      });

      // Clear from AsyncStorage
      const keys = await AsyncStorage.getAllKeys();
      const matchingKeys = keys.filter(key => key.includes(pattern));
      await AsyncStorage.multiRemove(matchingKeys);
    } catch (error) {
      console.error(`Cache invalidate error for pattern ${pattern}:`, error);
    }
  }

  /**
   * Check if cache entry is expired
   */
  private isExpired(entry: CacheEntry<any>): boolean {
    return Date.now() - entry.timestamp > entry.expiresIn;
  }

  /**
   * Get or fetch data with caching
   * If data exists in cache and is not expired, return it
   * Otherwise, fetch new data, cache it, and return it
   */
  async getOrFetch<T>(
    key: string,
    fetchFn: () => Promise<T>,
    options: CacheOptions = {}
  ): Promise<T> {
    // Try to get from cache first
    const cached = await this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fetch new data
    const data = await fetchFn();
    
    // Cache the data
    await this.set(key, data, options);
    
    return data;
  }

  /**
   * Prefetch and cache data for offline access
   */
  async prefetch<T>(key: string, fetchFn: () => Promise<T>, options: CacheOptions = {}): Promise<void> {
    try {
      const data = await fetchFn();
      await this.set(key, data, options);
    } catch (error) {
      console.error(`Cache prefetch error for key ${key}:`, error);
    }
  }
}

// Export singleton instance
export const cacheService = new CacheService();

// Cache key constants for commonly cached data
export const CACHE_KEYS = {
  SERVICES: 'cache:services',
  PRODUCTS: 'cache:products',
  USER_PROFILE: 'cache:user:profile',
  USER_ORDERS: 'cache:user:orders',
  USER_ADDRESSES: 'cache:user:addresses',
  FAQ: 'cache:faq',
  TESTIMONIALS: 'cache:testimonials',
} as const;
