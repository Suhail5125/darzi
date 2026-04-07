# Caching Strategy

This document describes the caching implementation for the Darzi mobile app, designed to improve performance and enable offline data access.

## Overview

The caching system uses a two-tier approach:
1. **Memory Cache**: Fast in-memory storage for frequently accessed data
2. **Persistent Cache**: AsyncStorage for offline access and data persistence

## Cache Service

The `CacheService` class (`src/services/cache.ts`) provides the core caching functionality:

### Key Features

- **Automatic Expiration**: Cache entries expire after a configurable time (default: 5 minutes)
- **Cache Invalidation**: Remove specific cache entries or patterns
- **Offline Access**: Data persists in AsyncStorage for offline use
- **Type Safety**: Full TypeScript support with generics
- **Memory + Disk**: Two-tier caching for optimal performance

### Basic Usage

```typescript
import { cacheService, CACHE_KEYS } from '../services/cache';

// Set data in cache
await cacheService.set(CACHE_KEYS.SERVICES, servicesData, {
  expiresIn: 10 * 60 * 1000 // 10 minutes
});

// Get data from cache
const services = await cacheService.get(CACHE_KEYS.SERVICES);

// Get or fetch (automatic caching)
const services = await cacheService.getOrFetch(
  CACHE_KEYS.SERVICES,
  () => api.getServices(),
  { expiresIn: 10 * 60 * 1000 }
);

// Invalidate cache
await cacheService.invalidate('services');

// Clear all cache
await cacheService.clear();
```

## React Hooks

### useCache Hook

The `useCache` hook provides a React-friendly way to use cached data:

```typescript
import { useCache } from '../hooks/useCache';
import { CACHE_KEYS } from '../services/cache';

function ServicesScreen() {
  const { data, isLoading, error, refetch } = useCache(
    CACHE_KEYS.SERVICES,
    () => api.getServices(),
    { expiresIn: 10 * 60 * 1000 }
  );

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  
  return <ServicesList services={data} onRefresh={refetch} />;
}
```

### usePrefetch Hook

Prefetch data that will be needed soon:

```typescript
import { usePrefetch } from '../hooks/useCache';
import { CACHE_KEYS } from '../services/cache';

function HomeScreen() {
  // Prefetch products for faster navigation
  usePrefetch(CACHE_KEYS.PRODUCTS, () => api.getProducts());
  
  return <HomeContent />;
}
```

## Cache Keys

Predefined cache keys are available in `CACHE_KEYS`:

```typescript
export const CACHE_KEYS = {
  SERVICES: 'cache:services',
  PRODUCTS: 'cache:products',
  USER_PROFILE: 'cache:user:profile',
  USER_ORDERS: 'cache:user:orders',
  USER_ADDRESSES: 'cache:user:addresses',
  FAQ: 'cache:faq',
  TESTIMONIALS: 'cache:testimonials',
} as const;
```

## Caching Strategy by Data Type

### Static Content (Long Cache)
- **FAQ, Testimonials, About Content**
- Cache Duration: 1 hour
- Invalidation: Manual or on app update

```typescript
const { data } = useCache(
  CACHE_KEYS.FAQ,
  () => api.getFAQ(),
  { expiresIn: 60 * 60 * 1000 } // 1 hour
);
```

### Semi-Static Content (Medium Cache)
- **Services, Products**
- Cache Duration: 10 minutes
- Invalidation: On pull-to-refresh

```typescript
const { data, refetch } = useCache(
  CACHE_KEYS.SERVICES,
  () => api.getServices(),
  { expiresIn: 10 * 60 * 1000 } // 10 minutes
);
```

### Dynamic Content (Short Cache)
- **User Orders, Cart**
- Cache Duration: 2 minutes
- Invalidation: On data mutation

```typescript
const { data, invalidate } = useCache(
  CACHE_KEYS.USER_ORDERS,
  () => api.getUserOrders(),
  { expiresIn: 2 * 60 * 1000 } // 2 minutes
);

// After creating a new order
await api.createOrder(orderData);
await invalidate(); // Clear cache to fetch fresh data
```

### User Profile (Session Cache)
- **User Profile, Preferences**
- Cache Duration: 5 minutes
- Invalidation: On profile update or logout

```typescript
const { data, invalidate } = useCache(
  CACHE_KEYS.USER_PROFILE,
  () => api.getUserProfile(),
  { expiresIn: 5 * 60 * 1000 } // 5 minutes
);
```

## Cache Invalidation Patterns

### On Data Mutation
```typescript
// After updating user profile
await api.updateProfile(profileData);
await cacheService.remove(CACHE_KEYS.USER_PROFILE);
```

### On Logout
```typescript
// Clear all user-related cache
await cacheService.invalidate('user');
```

### On Pull-to-Refresh
```typescript
const { refetch } = useCache(CACHE_KEYS.SERVICES, fetchServices);

const onRefresh = async () => {
  await refetch(); // Clears cache and fetches fresh data
};
```

### Pattern-Based Invalidation
```typescript
// Invalidate all order-related cache
await cacheService.invalidate('orders');
```

## Offline Support

The caching system automatically provides offline support:

1. **Data Persistence**: All cached data is stored in AsyncStorage
2. **Stale Data Access**: Expired cache data can still be accessed offline
3. **Graceful Degradation**: App shows cached data when network is unavailable

### Implementing Offline-First Screens

```typescript
import NetInfo from '@react-native-community/netinfo';

function ServicesScreen() {
  const [isOnline, setIsOnline] = useState(true);
  
  const { data, isLoading, error } = useCache(
    CACHE_KEYS.SERVICES,
    async () => {
      if (!isOnline) {
        // Return cached data even if expired
        const cached = await cacheService.get(CACHE_KEYS.SERVICES);
        if (cached) return cached;
      }
      return api.getServices();
    }
  );

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected ?? false);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      {!isOnline && <OfflineIndicator />}
      <ServicesList services={data} />
    </>
  );
}
```

## Performance Considerations

### Memory Management
- Memory cache is cleared when app is closed
- Only frequently accessed data should use memory cache
- Large datasets should rely on AsyncStorage only

### Cache Size
- Monitor AsyncStorage usage
- Implement cache size limits if needed
- Clear old cache entries periodically

### Network Efficiency
- Reduce API calls by 70-90% with proper caching
- Prefetch data for better perceived performance
- Use stale-while-revalidate pattern for critical data

## Best Practices

1. **Use Appropriate Expiry Times**: Balance freshness vs performance
2. **Invalidate on Mutations**: Always clear cache after data changes
3. **Prefetch Strategically**: Preload data users are likely to need
4. **Handle Errors Gracefully**: Show cached data when fetch fails
5. **Monitor Cache Size**: Prevent excessive storage usage
6. **Test Offline Scenarios**: Ensure app works without network

## Testing Cache Behavior

```typescript
// Test cache hit
const data1 = await cacheService.getOrFetch(key, fetchFn);
const data2 = await cacheService.getOrFetch(key, fetchFn);
// fetchFn should only be called once

// Test cache expiration
await cacheService.set(key, data, { expiresIn: 100 });
await new Promise(resolve => setTimeout(resolve, 150));
const expired = await cacheService.get(key);
// expired should be null

// Test cache invalidation
await cacheService.set(key, data);
await cacheService.invalidate('pattern');
const invalidated = await cacheService.get(key);
// invalidated should be null
```

## Future Enhancements

- [ ] Cache size management and LRU eviction
- [ ] Background cache refresh
- [ ] Cache analytics and monitoring
- [ ] Compression for large cached data
- [ ] Selective cache warming on app start
