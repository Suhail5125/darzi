import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../../contexts/AuthContext';
import { useLocation } from '../../hooks';
import { Header, LocationSelector } from '../../components/navigation';
import {
  HeroSection,
  CouponCarousel,
  ServiceGrid,
  QuickActions,
  RecentOrders,
  LoyaltyWidget,
  PersonalizedRecommendations,
  ExpressServiceCTA,
  CareTipsCarousel,
  YouMightAlsoLike,
  Service,
  Coupon,
  QuickAction,
  RecentOrder,
  LoyaltyData,
  Recommendation,
  CareTip,
  SuggestedItem,
} from '../../components/home';
import { HomeScreenSkeleton, ErrorMessage, SafeAreaView } from '../../components/shared';
import { colors, spacing } from '../../constants/theme';

// Mock data - Professional e-commerce style with local assets
const MOCK_COUPONS: Coupon[] = [
  {
    id: '1',
    code: 'CLEAN50',
    title: 'Premium Dry Cleaning',
    subtitle: 'Starting ₹199',
    discount: 'FLAT 50% OFF',
    color: '#4A90E2', // Professional Blue
    features: ['Same day service', 'Eco-friendly'],
    imageSource: require('../../../assets/icon.png'),
  },
  {
    id: '2',
    code: 'ALTER30',
    title: 'Expert Alterations',
    subtitle: 'From ₹99',
    discount: '30% OFF',
    color: '#E94B3C', // Vibrant Red
    features: ['Perfect fit', 'Quick turnaround'],
    imageSource: require('../../../assets/icon.png'),
  },
  {
    id: '3',
    code: 'PRESS25',
    title: 'Steam Pressing',
    subtitle: 'Just ₹49',
    discount: '25% OFF',
    color: '#6C63FF', // Modern Purple
    features: ['Wrinkle-free', 'Professional finish'],
    imageSource: require('../../../assets/icon.png'),
  },
  {
    id: '4',
    code: 'BUNDLE40',
    title: 'Bundle & Save',
    subtitle: '5+ items',
    discount: 'UP TO 40% OFF',
    color: '#10B981', // Fresh Green
    features: ['Best value', 'Free pickup'],
    imageSource: require('../../../assets/icon.png'),
  },
];

const MOCK_SERVICES: Service[] = [
  {
    id: 'washing',
    title: 'Eco Washing',
    category: 'Cleaning',
    description: 'Gentle, eco-conscious laundry care for everyday essentials.',
    image: require('../../../assets/professional_laundry_washing_service.png'),
    price: 'From ₹150',
  },
  {
    id: 'pressing',
    title: 'Steam Pressing',
    category: 'Finishing',
    description: 'Crisp, wrinkle-free finish for your daily wear.',
    image: require('../../../assets/professional_clothes_pressing_service.png'),
    price: 'From ₹80',
  },
  {
    id: 'dry-cleaning',
    title: 'Dry Cleaning',
    category: 'Cleaning',
    description: 'Professional solvent cleaning for delicate fabrics.',
    image: require('../../../assets/dry_cleaning_service_visual.png'),
    price: 'From ₹250',
  },
  {
    id: 'starch',
    title: 'Premium Starch',
    category: 'Finishing',
    description: 'Classic signature finish for dress shirts and linens.',
    image: require('../../../assets/starch_service_crisp_linens.png'),
    price: 'From ₹120',
  },
  {
    id: 'alteration',
    title: 'Expert Alterations',
    category: 'Tailoring',
    description: 'Precision adjustments to your existing wardrobe.',
    image: require('../../../assets/clothing_alteration_service.png'),
    price: 'Quote Required',
  },
  {
    id: 'tailoring',
    title: 'Bespoke Tailoring',
    category: 'Tailoring',
    description: 'Fully custom garment creation from measurement to fitting.',
    image: require('../../../assets/bespoke_tailoring_service.png'),
    price: 'Quote Required',
  },
];

const MOCK_QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'track',
    icon: 'location-outline',
    label: 'Track',
    onPress: () => console.log('Track Order'),
  },
  {
    id: 'repeat',
    icon: 'repeat-outline',
    label: 'Repeat',
    onPress: () => console.log('Repeat Order'),
  },
  {
    id: 'schedule',
    icon: 'calendar-outline',
    label: 'Schedule',
    onPress: () => console.log('Schedule Pickup'),
  },
  {
    id: 'offers',
    icon: 'gift-outline',
    label: 'Offers',
    onPress: () => console.log('View Offers'),
  },
];

const MOCK_RECENT_ORDERS: RecentOrder[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-001',
    serviceName: 'Dry Cleaning + Pressing',
    status: 'processing',
    date: '2 days ago',
    itemCount: 5,
    totalAmount: '₹850',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-002',
    serviceName: 'Shirt Alteration',
    status: 'completed',
    date: '5 days ago',
    itemCount: 2,
    totalAmount: '₹400',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-003',
    serviceName: 'Laundry Service',
    status: 'delivered',
    date: '1 week ago',
    itemCount: 8,
    totalAmount: '₹1,200',
  },
];

const MOCK_LOYALTY_DATA: LoyaltyData = {
  points: 1250,
  nextMilestone: 2000,
  availableRewards: 3,
  tier: 'gold',
};

const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: '1',
    title: 'Premium Suit Cleaning',
    description: 'Professional care for your formal wear',
    price: 'From ₹500',
    imageSource: require('../../../assets/dry_cleaning_service_visual.png'),
    tag: 'Popular',
  },
  {
    id: '2',
    title: 'Leather Care',
    description: 'Specialized treatment for leather items',
    price: 'From ₹800',
    imageSource: require('../../../assets/icon.png'),
    tag: 'New',
  },
  {
    id: '3',
    title: 'Wedding Dress Care',
    description: 'Delicate handling for special occasions',
    price: 'Quote Required',
    imageSource: require('../../../assets/bespoke_tailoring_service.png'),
  },
];

const MOCK_CARE_TIPS: CareTip[] = [
  {
    id: '1',
    title: 'Remove Wine Stains Quickly',
    description: 'Act fast with salt and cold water to prevent permanent staining on fabrics.',
    icon: '🍷',
    imageSource: require('../../../assets/dry_cleaning_service_visual.png'),
    category: 'stain-removal',
  },
  {
    id: '2',
    title: 'Wool Care Essentials',
    description: 'Always use cold water and lay flat to dry to maintain shape and prevent shrinking.',
    icon: '🧶',
    imageSource: require('../../../assets/professional_laundry_washing_service.png'),
    category: 'fabric-care',
  },
  {
    id: '3',
    title: 'Winter Wardrobe Storage',
    description: 'Clean before storing and use breathable garment bags to protect from moths.',
    icon: '❄️',
    imageSource: require('../../../assets/bespoke_tailoring_service.png'),
    category: 'seasonal',
  },
  {
    id: '4',
    title: 'Read Care Labels',
    description: 'Always check garment labels before washing to avoid damage and maintain quality.',
    icon: '🏷️',
    imageSource: require('../../../assets/clothing_alteration_service.png'),
    category: 'general',
  },
];

const MOCK_SUGGESTED_ITEMS: SuggestedItem[] = [
  {
    id: '1',
    title: 'Premium Suit Care',
    description: 'Complete cleaning and pressing for your formal wear',
    originalPrice: '₹799',
    price: '₹599',
    imageSource: require('../../../assets/dry_cleaning_service_visual.png'),
    tag: 'Popular',
    gradient: ['#667eea', '#764ba2'],
  },
  {
    id: '2',
    title: 'Leather Jacket Care',
    description: 'Specialized treatment for leather and suede items',
    originalPrice: '₹1,199',
    price: '₹899',
    imageSource: require('../../../assets/bespoke_tailoring_service.png'),
    tag: 'Premium',
    gradient: ['#f093fb', '#f5576c'],
  },
  {
    id: '3',
    title: 'Wedding Dress Cleaning',
    description: 'Delicate care for your special occasion garments',
    originalPrice: '₹1,999',
    price: '₹1,499',
    imageSource: require('../../../assets/clothing_alteration_service.png'),
    tag: 'Special',
    gradient: ['#4facfe', '#00f2fe'],
  },
  {
    id: '4',
    title: 'Curtain Cleaning',
    description: 'Professional cleaning for home furnishings',
    originalPrice: '₹999',
    price: '₹799',
    imageSource: require('../../../assets/professional_laundry_washing_service.png'),
    gradient: ['#43e97b', '#38f9d7'],
  },
  {
    id: '5',
    title: 'Shoe Cleaning',
    description: 'Expert care for all types of footwear',
    originalPrice: '₹499',
    price: '₹399',
    imageSource: require('../../../assets/professional_clothes_pressing_service.png'),
    gradient: ['#fa709a', '#fee140'],
  },
];

export default function HomeScreen() {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [showLocationSelector, setShowLocationSelector] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Location management
  const { currentLocation, availableLocations, setLocation } = useLocation();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate API call to fetch home screen data
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, fetch services, testimonials, etc. here
    } catch (err) {
      setError('Failed to load home screen data. Please try again.');
      console.error('Failed to load home data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  const handleGetStarted = () => {
    if (isAuthenticated) {
      router.push('/booking');
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleServicePress = (serviceId: string) => {
    if (isAuthenticated) {
      router.push({
        pathname: '/booking',
        params: { serviceId },
      });
    } else {
      router.push('/(auth)/login');
    }
  };

  const handleCouponPress = (coupon: Coupon) => {
    console.log('Coupon pressed:', coupon);
    // TODO: Navigate to coupon details or apply coupon
  };

  const handleLocationPress = () => {
    setShowLocationSelector(true);
  };

  const handleLocationSelect = async (location: typeof currentLocation) => {
    if (location) {
      await setLocation(location);
    }
  };

  const handleReorder = (orderId: string) => {
    console.log('Reorder:', orderId);
    router.push('/booking');
  };

  const handleTrackOrder = (orderId: string) => {
    console.log('Track order:', orderId);
    router.push('/dashboard');
  };

  const handleRateOrder = (orderId: string) => {
    console.log('Rate order:', orderId);
    // TODO: Open rating modal
  };

  const handleViewAllOrders = () => {
    router.push('/dashboard');
  };

  const handleLoyaltyPress = () => {
    console.log('Loyalty pressed');
    // TODO: Navigate to rewards page
  };

  const handleRecommendationPress = (id: string) => {
    console.log('Recommendation pressed:', id);
    router.push('/booking');
  };

  const handleExpressServicePress = () => {
    console.log('Express service pressed');
    router.push('/booking');
  };

  const handleCareTipPress = (tip: CareTip) => {
    console.log('Care tip pressed:', tip);
    // TODO: Navigate to tip details or open modal
  };

  const handleViewAllTips = () => {
    console.log('View all tips');
    // TODO: Navigate to tips page
  };

  const handleEmergencyPress = () => {
    console.log('Emergency service pressed');
    router.push('/booking');
    // TODO: Navigate to emergency booking with priority flag
  };

  const handleSuggestedItemPress = (id: string) => {
    console.log('Suggested item pressed:', id);
    router.push('/booking');
  };

  const handleViewAllSuggestions = () => {
    console.log('View all suggestions');
    router.push('/services');
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
        {/* Glassmorphism Header - Fixed at top with integrated address */}
        <Header
        showSearch={true}
        showNotification={true}
        showAddress={isAuthenticated}
        address={currentLocation?.displayName || '41-A, Asif Agency, Shipai Mohalla, Jaipur'}
        onNotificationPress={() => {
          // Handle notification press
          console.log('Notification pressed');
        }}
        onSearchChange={(text) => {
          // Handle search
          console.log('Search:', text);
        }}
        onAddressPress={handleLocationPress}
        notificationCount={3}
      />
      
      {/* Add padding for fixed header (adjusted for address row when authenticated) */}
      <View style={[styles.headerSpacer, isAuthenticated && styles.headerSpacerWithAddress]} />
      
      {/* Loading State */}
      {isLoading && <HomeScreenSkeleton />}

      {/* Error State */}
      {!isLoading && error && (
        <ErrorMessage
          message={error}
          onRetry={loadData}
        />
      )}

      {/* Content */}
      {!isLoading && !error && (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              tintColor={colors.primary}
            />
          }
        >
          {/* Show Coupons for logged in users, Hero for guests */}
          {isAuthenticated ? (
            <>
              <QuickActions actions={MOCK_QUICK_ACTIONS} onEmergencyPress={handleEmergencyPress} />
              
              <CouponCarousel coupons={MOCK_COUPONS} onCouponPress={handleCouponPress} />
              
              <ServiceGrid services={MOCK_SERVICES} onServicePress={handleServicePress} />
              
              <RecentOrders
                orders={MOCK_RECENT_ORDERS}
                onReorder={handleReorder}
                onTrack={handleTrackOrder}
                onRate={handleRateOrder}
                onViewAll={handleViewAllOrders}
              />
              
              <LoyaltyWidget data={MOCK_LOYALTY_DATA} onPress={handleLoyaltyPress} />
              
              <ExpressServiceCTA onPress={handleExpressServicePress} />
            </>
          ) : (
            <>
              <HeroSection
                title="Premium Garment Care"
                subtitle="Expert cleaning, tailoring, and alterations delivered to your door"
                ctaText="Get Started"
                onCtaPress={handleGetStarted}
              />
              
              <ServiceGrid services={MOCK_SERVICES} onServicePress={handleServicePress} />
            </>
          )}

          {isAuthenticated && (
            <YouMightAlsoLike
              items={MOCK_SUGGESTED_ITEMS}
              title="You Might Also Like"
              onItemPress={handleSuggestedItemPress}
              onViewAll={handleViewAllSuggestions}
            />
          )}

          <CareTipsCarousel tips={MOCK_CARE_TIPS} onTipPress={handleCareTipPress} onViewAll={handleViewAllTips} />
        </ScrollView>
      )}

        {/* Location Selector Modal */}
        <LocationSelector
          visible={showLocationSelector}
          currentLocation={currentLocation}
          availableLocations={availableLocations}
          onSelectLocation={handleLocationSelect}
          onClose={() => setShowLocationSelector(false)}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerSpacer: {
    height: 100, // Space for fixed glassmorphism header (logo + search + notification row)
  },
  headerSpacerWithAddress: {
    height: 138, // Additional space when address row is visible (100 + 38)
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: spacing.md, // Small padding so last item is fully visible above tab bar
  },
  section: {
    paddingHorizontal: spacing.lg,
  },
});
