import React, { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { ServiceCard, CategoryFilters } from '../../components/explore';
import { Header, LocationSelector, SearchResults } from '../../components/navigation';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation, useSearch } from '../../hooks';
import { ExploreScreenSkeleton, ErrorMessage } from '../../components/shared';
import { colors, spacing, typography } from '../../constants/theme';
import { Service, ServiceCategory } from '../../types';

// Mock data - in a real app, this would come from an API
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Premium Dry Cleaning',
    category: 'Cleaning',
    description: 'Professional dry cleaning for delicate garments using eco-friendly solvents',
    features: ['Eco-friendly process', 'Stain removal', 'Same-day service'],
    price: 15,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '2',
    title: 'Expert Alterations',
    category: 'Tailoring',
    description: 'Expert tailoring and alterations for the perfect fit',
    features: ['Custom fitting', 'Quick turnaround', 'Master tailors'],
    price: 25,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '3',
    title: 'Professional Pressing',
    category: 'Finishing',
    description: 'Professional pressing and finishing for crisp, wrinkle-free garments',
    features: ['Steam pressing', 'Crease removal', 'Fabric care'],
    price: 8,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '4',
    title: 'Garment Repairs',
    category: 'Tailoring',
    description: 'Expert repairs and restoration for damaged garments',
    features: ['Zipper replacement', 'Button repair', 'Hem fixes'],
    price: 20,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '5',
    title: 'Laundry Service',
    category: 'Cleaning',
    description: 'Complete wash and fold service for everyday garments',
    features: ['Wash & fold', 'Fabric softener', 'Fast delivery'],
    price: 12,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '6',
    title: 'Shoe Shine',
    category: 'Finishing',
    description: 'Professional shoe cleaning and polishing service',
    features: ['Deep cleaning', 'Polish & shine', 'Leather care'],
    price: 10,
    image: 'https://via.placeholder.com/300x200',
  },
];

const CATEGORIES: Array<'All' | ServiceCategory> = ['All', 'Cleaning', 'Finishing', 'Tailoring'];

export default function ExploreScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>('All');
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Location management
  const { currentLocation, availableLocations, setLocation } = useLocation();
  
  // Search functionality
  const { query, setQuery, results, isSearching, hasResults } = useSearch(
    MOCK_SERVICES.map(service => ({
      ...service,
      keywords: [...service.features, service.category],
    })),
    {
      searchFields: ['title', 'description', 'category', 'keywords'],
      minQueryLength: 2,
    }
  );

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate API call to fetch services
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, fetch services from API here
    } catch (err) {
      setError('Failed to load services. Please try again.');
      console.error('Failed to load services:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter services based on selected category
  const filteredServices = useMemo(() => {
    if (selectedCategory === 'All') {
      return MOCK_SERVICES;
    }
    return MOCK_SERVICES.filter(service => service.category === selectedCategory);
  }, [selectedCategory]);

  const handleServicePress = (serviceId: string) => {
    router.push({
      pathname: '/booking',
      params: { serviceId },
    });
  };

  const handleLocationPress = () => {
    setShowLocationSelector(true);
  };

  const handleLocationSelect = async (location: typeof currentLocation) => {
    if (location) {
      await setLocation(location);
    }
  };

  // Show search results when user is searching
  const showSearchResults = isAuthenticated && query.length >= 2;

  const renderServiceCard = ({ item, index }: { item: Service; index: number }) => (
    <View style={[styles.cardWrapper, index % 2 === 0 ? styles.cardLeft : styles.cardRight]}>
      <ServiceCard service={item} onPress={() => handleServicePress(item.id)} />
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>🔍</Text>
      <Text style={styles.emptyStateTitle}>No Services Found</Text>
      <Text style={styles.emptyStateText}>
        We couldn't find any services matching your filter. Try selecting a different category.
      </Text>
    </View>
  );

  const renderFooter = () => (
    <View style={styles.ctaSection}>
      <Text style={styles.ctaTitle}>Ready to Get Started?</Text>
      <Text style={styles.ctaText}>
        Book any of our premium services and experience the difference of professional garment care.
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header with search and location */}
      {isAuthenticated && (
        <Header
          showSearch
          showLocation
          location={currentLocation?.displayName}
          onLocationPress={handleLocationPress}
          onSearchChange={setQuery}
          searchPlaceholder="Search services..."
        />
      )}

      {/* Loading State */}
      {isLoading && <ExploreScreenSkeleton />}

      {/* Error State */}
      {!isLoading && error && (
        <ErrorMessage
          message={error}
          onRetry={loadServices}
        />
      )}

      {/* Content */}
      {!isLoading && !error && (
        <>
          {/* Show search results when searching */}
          {showSearchResults ? (
            <SearchResults
              results={results}
              isSearching={isSearching}
              hasQuery={query.length >= 2}
              onResultPress={(item) => handleServicePress(item.id)}
              emptyMessage="No services found"
            />
          ) : (
            <>
              <CategoryFilters
                categories={CATEGORIES}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />

              <FlatList
                data={filteredServices}
                renderItem={renderServiceCard}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerStyle={styles.listContent}
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={renderEmptyState}
                ListFooterComponent={filteredServices.length > 0 ? renderFooter : null}
              />
            </>
          )}
        </>
      )}

      {/* Location Selector Modal */}
      <LocationSelector
        visible={showLocationSelector}
        currentLocation={currentLocation}
        availableLocations={availableLocations}
        onSelectLocation={handleLocationSelect}
        onClose={() => setShowLocationSelector(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xl,
  },
  cardWrapper: {
    flex: 1,
    maxWidth: '50%',
  },
  cardLeft: {
    paddingRight: spacing.xs,
  },
  cardRight: {
    paddingLeft: spacing.xs,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['3xl'],
    paddingHorizontal: spacing.xl,
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.lg,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  ctaSection: {
    marginTop: spacing.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
});
