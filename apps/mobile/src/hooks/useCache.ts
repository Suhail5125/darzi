import { useState, useEffect, useCallback } from 'react';
import { cacheService } from '../services/cache';

interface UseCacheOptions {
  expiresIn?: number;
  enabled?: boolean;
}

interface UseCacheResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  invalidate: () => Promise<void>;
}

/**
 * Custom hook for using cached data with automatic fetching
 * 
 * @param key - Cache key
 * @param fetchFn - Function to fetch data if not in cache
 * @param options - Cache options
 * @returns Cache result with data, loading state, and utility functions
 * 
 * @example
 * const { data, isLoading, refetch } = useCache(
 *   CACHE_KEYS.SERVICES,
 *   () => api.getServices(),
 *   { expiresIn: 10 * 60 * 1000 } // 10 minutes
 * );
 */
export function useCache<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: UseCacheOptions = {}
): UseCacheResult<T> {
  const { expiresIn, enabled = true } = options;
  
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);
      
      const result = await cacheService.getOrFetch(key, fetchFn, { expiresIn });
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
      console.error(`useCache error for key ${key}:`, err);
    } finally {
      setIsLoading(false);
    }
  }, [key, fetchFn, expiresIn, enabled]);

  const refetch = useCallback(async () => {
    await cacheService.remove(key);
    await fetchData();
  }, [key, fetchData]);

  const invalidate = useCallback(async () => {
    await cacheService.remove(key);
    setData(null);
  }, [key]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    isLoading,
    error,
    refetch,
    invalidate,
  };
}

/**
 * Hook for prefetching data into cache without using it immediately
 * Useful for preloading data that will be needed soon
 * 
 * @example
 * usePrefetch(CACHE_KEYS.PRODUCTS, () => api.getProducts());
 */
export function usePrefetch<T>(
  key: string,
  fetchFn: () => Promise<T>,
  options: UseCacheOptions = {}
): void {
  const { expiresIn, enabled = true } = options;

  useEffect(() => {
    if (enabled) {
      cacheService.prefetch(key, fetchFn, { expiresIn });
    }
  }, [key, fetchFn, expiresIn, enabled]);
}
