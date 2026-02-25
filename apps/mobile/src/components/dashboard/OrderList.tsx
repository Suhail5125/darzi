import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import OrderCard from './OrderCard';
import { colors, spacing, typography } from '../../constants/theme';
import { Order } from '../../types';

interface OrderListProps {
  orders: Order[];
  onOrderPress: (orderId: string) => void;
}

export function OrderList({ orders, onOrderPress }: OrderListProps) {
  // Memoize the render item callback
  const renderItem = useCallback(({ item }: { item: Order }) => (
    <OrderCard order={item} onPress={() => onOrderPress(item.id)} />
  ), [onOrderPress]);

  // Memoize keyExtractor
  const keyExtractor = useCallback((item: Order) => item.id, []);

  if (orders.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No orders yet</Text>
        <Text style={styles.emptySubtext}>Start your first order to see it here</Text>
      </View>
    );
  }

  // Optimize FlatList with getItemLayout for better performance
  const getItemLayout = (_data: any, index: number) => ({
    length: 120, // Approximate height of OrderCard
    offset: 120 * index,
    index,
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recent Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        getItemLayout={getItemLayout}
        windowSize={5}
        maxToRenderPerBatch={10}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        scrollEnabled={false}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  emptySubtext: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.disabled,
  },
});
