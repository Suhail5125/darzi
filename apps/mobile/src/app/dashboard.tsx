import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { OrderList } from '../components/dashboard/OrderList';
import { Button } from '../components/shared/Button';
import { Card } from '../components/shared/Card';
import { DashboardScreenSkeleton, ErrorMessage, EmptyState } from '../components/shared';
import { useAuth } from '../contexts/AuthContext';
import { colors, spacing, typography } from '../constants/theme';
import { Order } from '../types';

export default function DashboardScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Mock data - in a real app, this would come from an API
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // Simulate API call to fetch dashboard data
      await new Promise(resolve => setTimeout(resolve, 1000));
      // In a real app, fetch orders from API here
      setOrders([
        {
          id: '1001',
          serviceType: 'Dry Cleaning',
          status: 'In Progress',
          date: '2024-01-15',
          total: 45.99,
        },
        {
          id: '1002',
          serviceType: 'Tailoring',
          status: 'Delivered',
          date: '2024-01-10',
          total: 32.50,
        },
        {
          id: '1003',
          serviceType: 'Finishing',
          status: 'Picked Up',
          date: '2024-01-05',
          total: 28.00,
        },
      ]);
    } catch (err) {
      setError('Failed to load dashboard data. Please try again.');
      console.error('Failed to load dashboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const activeOrders = orders.filter(order => order.status === 'In Progress').length;
  const completedOrders = orders.filter(order => order.status === 'Delivered' || order.status === 'Picked Up').length;
  const totalItems = orders.reduce((sum, order) => sum + 1, 0);

  const onRefresh = async () => {
    setRefreshing(true);
    await loadDashboardData();
    setRefreshing(false);
  };

  const handleOrderPress = (orderId: string) => {
    // Navigate to order details screen (to be implemented)
    console.log('Order pressed:', orderId);
  };

  const handleStartNewOrder = () => {
    router.push('/booking');
  };

  const handleViewProfile = () => {
    router.push('/(tabs)/account');
  };

  return (
    <>
      {/* Loading State */}
      {isLoading && <DashboardScreenSkeleton />}

      {/* Error State */}
      {!isLoading && error && (
        <View style={styles.container}>
          <ErrorMessage
            message={error}
            onRetry={loadDashboardData}
          />
        </View>
      )}

      {/* Empty State */}
      {!isLoading && !error && orders.length === 0 && (
        <View style={styles.container}>
          <EmptyState
            icon="📦"
            title="No Orders Yet"
            message="You haven't placed any orders yet. Start your first order to see it here!"
            actionLabel="Start New Order"
            onAction={handleStartNewOrder}
          />
        </View>
      )}

      {/* Content */}
      {!isLoading && !error && orders.length > 0 && (
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {/* User Greeting */}
          <View style={styles.greetingSection}>
            <Text style={styles.greeting}>Hello, {user?.name || 'Guest'}!</Text>
            <Text style={styles.subGreeting}>Welcome back to your dashboard</Text>
          </View>

          {/* Summary Cards */}
          <SummaryCards
            activeOrders={activeOrders}
            completedOrders={completedOrders}
            totalItems={totalItems}
          />

          {/* Start New Order Button */}
          <Button
            title="Start New Order"
            onPress={handleStartNewOrder}
            variant="primary"
            style={styles.newOrderButton}
          />

          {/* Orders List */}
          <OrderList orders={orders} onOrderPress={handleOrderPress} />

          {/* Account Information Section */}
          <View style={styles.accountSection}>
            <Text style={styles.sectionTitle}>Account Information</Text>
            <Card variant="outlined" style={styles.accountCard}>
              <View style={styles.accountInfo}>
                <View>
                  <Text style={styles.accountLabel}>Name</Text>
                  <Text style={styles.accountValue}>{user?.name || 'N/A'}</Text>
                </View>
                <View style={styles.accountInfoItem}>
                  <Text style={styles.accountLabel}>Email</Text>
                  <Text style={styles.accountValue}>{user?.email || 'N/A'}</Text>
                </View>
              </View>
              <Button
                title="View Profile"
                onPress={handleViewProfile}
                variant="outline"
                size="small"
                style={styles.profileButton}
              />
            </Card>
          </View>
        </ScrollView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    padding: spacing.md,
  },
  greetingSection: {
    marginBottom: spacing.lg,
  },
  greeting: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  subGreeting: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  newOrderButton: {
    marginBottom: spacing.lg,
  },
  accountSection: {
    marginTop: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  accountCard: {
    padding: spacing.lg,
  },
  accountInfo: {
    marginBottom: spacing.md,
  },
  accountInfoItem: {
    marginTop: spacing.md,
  },
  accountLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  accountValue: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  profileButton: {
    marginTop: spacing.sm,
  },
});
