import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Skeleton } from './Skeleton';
import { spacing, borderRadius } from '../../constants/theme';

export function HomeScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Hero Section Skeleton */}
      <Skeleton width="100%" height={300} borderRadius={0} style={styles.hero} />
      
      {/* Service Grid Skeleton */}
      <View style={styles.section}>
        <Skeleton width={200} height={24} style={styles.title} />
        <View style={styles.grid}>
          {[1, 2, 3, 4].map((i) => (
            <View key={i} style={styles.gridItem}>
              <Skeleton width="100%" height={120} />
              <Skeleton width="80%" height={16} style={styles.spacing} />
              <Skeleton width="100%" height={12} style={styles.spacing} />
            </View>
          ))}
        </View>
      </View>

      {/* Testimonials Skeleton */}
      <View style={styles.section}>
        <Skeleton width={180} height={24} style={styles.title} />
        <Skeleton width="100%" height={150} style={styles.spacing} />
      </View>
    </View>
  );
}

export function ExploreScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Category Filters Skeleton */}
      <View style={styles.filterRow}>
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width={80} height={36} borderRadius={18} style={styles.filterChip} />
        ))}
      </View>

      {/* Service Cards Skeleton */}
      <View style={styles.section}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <View key={i} style={styles.serviceCard}>
            <Skeleton width="100%" height={200} />
            <View style={styles.cardContent}>
              <Skeleton width="70%" height={20} style={styles.spacing} />
              <Skeleton width="40%" height={16} style={styles.spacing} />
              <Skeleton width="100%" height={14} style={styles.spacing} />
              <Skeleton width="90%" height={14} style={styles.spacing} />
              <Skeleton width="50%" height={18} style={styles.spacing} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export function DashboardScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Greeting Skeleton */}
      <View style={styles.section}>
        <Skeleton width={200} height={28} style={styles.spacing} />
      </View>

      {/* Summary Cards Skeleton */}
      <View style={styles.summaryCards}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.summaryCard}>
            <Skeleton width={40} height={40} borderRadius={20} style={styles.spacing} />
            <Skeleton width={60} height={32} style={styles.spacing} />
            <Skeleton width="80%" height={14} />
          </View>
        ))}
      </View>

      {/* Orders List Skeleton */}
      <View style={styles.section}>
        <Skeleton width={150} height={24} style={styles.title} />
        {[1, 2, 3, 4].map((i) => (
          <View key={i} style={styles.orderCard}>
            <View style={styles.orderHeader}>
              <Skeleton width={100} height={16} />
              <Skeleton width={80} height={24} borderRadius={12} />
            </View>
            <Skeleton width="60%" height={14} style={styles.spacing} />
            <Skeleton width="40%" height={14} style={styles.spacing} />
            <Skeleton width={80} height={18} style={styles.spacing} />
          </View>
        ))}
      </View>
    </View>
  );
}

export function CartScreenSkeleton() {
  return (
    <View style={styles.container}>
      {/* Cart Items Skeleton */}
      <View style={styles.section}>
        {[1, 2, 3].map((i) => (
          <View key={i} style={styles.cartItem}>
            <Skeleton width={80} height={80} />
            <View style={styles.cartItemContent}>
              <Skeleton width="70%" height={18} style={styles.spacing} />
              <Skeleton width="90%" height={14} style={styles.spacing} />
              <Skeleton width={100} height={32} style={styles.spacing} />
            </View>
          </View>
        ))}
      </View>

      {/* Cart Summary Skeleton */}
      <View style={styles.section}>
        <Skeleton width="100%" height={200} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: spacing.lg,
  },
  hero: {
    marginBottom: spacing.lg,
  },
  title: {
    marginBottom: spacing.md,
  },
  spacing: {
    marginTop: spacing.sm,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    marginBottom: spacing.lg,
  },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  filterChip: {
    marginRight: spacing.sm,
  },
  serviceCard: {
    marginBottom: spacing.lg,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
  },
  cardContent: {
    padding: spacing.md,
  },
  summaryCards: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
  },
  summaryCard: {
    flex: 1,
    alignItems: 'center',
    padding: spacing.md,
    marginHorizontal: spacing.xs,
  },
  orderCard: {
    padding: spacing.md,
    marginBottom: spacing.md,
    borderRadius: borderRadius.md,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },
  cartItem: {
    flexDirection: 'row',
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  cartItemContent: {
    flex: 1,
    marginLeft: spacing.md,
  },
});
