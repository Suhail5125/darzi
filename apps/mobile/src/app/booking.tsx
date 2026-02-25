import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { BookingForm, BookingData } from '../components/booking';
import { Service } from '../types';
import { colors, typography, spacing, borderRadius } from '../constants/theme';

// Mock service data (same as in services.tsx)
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Dry Cleaning',
    category: 'Cleaning',
    description: 'Professional dry cleaning for delicate garments',
    features: ['Eco-friendly solvents', 'Stain removal', '48-hour turnaround'],
    price: 15.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '2',
    title: 'Shirt Pressing',
    category: 'Finishing',
    description: 'Expert pressing and finishing for shirts',
    features: ['Crisp finish', 'Collar shaping', 'Same-day service'],
    price: 5.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '3',
    title: 'Alterations',
    category: 'Tailoring',
    description: 'Custom alterations by master tailors',
    features: ['Perfect fit', 'Expert craftsmanship', 'Quick turnaround'],
    price: 25.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '4',
    title: 'Suit Cleaning',
    category: 'Cleaning',
    description: 'Specialized cleaning for suits and formal wear',
    features: ['Gentle care', 'Shape retention', 'Premium service'],
    price: 29.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '5',
    title: 'Hemming',
    category: 'Tailoring',
    description: 'Professional hemming for pants and dresses',
    features: ['Precise measurements', 'Hand-stitched', 'Fast service'],
    price: 12.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '6',
    title: 'Steam Pressing',
    category: 'Finishing',
    description: 'Gentle steam pressing for all fabrics',
    features: ['Wrinkle removal', 'Fabric care', 'Quick service'],
    price: 8.99,
    image: 'https://via.placeholder.com/300x200',
  },
];

export default function BookingScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { user } = useAuth();
  const { showToast } = useToast();
  const { serviceId } = params;
  const [isLoading, setIsLoading] = useState(false);
  const insets = useSafeAreaInsets();

  const handleSubmit = async (bookingData: BookingData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      const serviceName = MOCK_SERVICES.find(s => s.id === bookingData.service)?.title;
      showToast(
        `Booking confirmed for ${serviceName}!`,
        'success'
      );
      
      // Navigate to dashboard
      router.replace('/(tabs)/account');
    } catch (error) {
      showToast('Failed to create booking. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/(tabs)/');
    }
  };

  const paddingTop = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      {/* Header with Back Button */}
      <View style={[styles.header, { paddingTop }]}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBack}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Book Service</Text>
        <View style={styles.headerRight} />
      </View>
      
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Container */}
        <View style={styles.formContainer}>
          <BookingForm
            preselectedService={typeof serviceId === 'string' ? serviceId : undefined}
            services={MOCK_SERVICES}
            userName={user?.name || ''}
            userAddress={user?.address || '41-A, Asif Agency, Shipai Mohalla, Jaipur'}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    backgroundColor: 'transparent',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.serif,
    fontWeight: 'bold',
    color: colors.foreground,
  },
  headerRight: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.xl,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: spacing.md,
  },
});
