import React, { memo, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../shared/Card';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Order } from '../../types';
import { getPriceLabel, getDateLabel } from '../../utils/accessibility';

interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ order, onPress }) => {
  const getStatusColor = useCallback((status: Order['status']) => {
    switch (status) {
      case 'In Progress':
        return colors.warning;
      case 'Delivered':
        return colors.success;
      case 'Picked Up':
        return colors.info;
      default:
        return colors.text.secondary;
    }
  }, []);
  
  const statusColor = useMemo(() => getStatusColor(order.status), [order.status, getStatusColor]);
  
  const orderDate = useMemo(() => new Date(order.date), [order.date]);
  
  const a11yLabel = useMemo(() => 
    `Order ${order.id}, ${order.serviceType}, Status: ${order.status}, ${getDateLabel(orderDate)}, Total: ${getPriceLabel(order.total)}`,
    [order.id, order.serviceType, order.status, orderDate, order.total]
  );

  return (
    <Card 
      onPress={onPress} 
      variant="outlined" 
      style={styles.card}
      accessibilityLabel={a11yLabel}
      accessibilityHint="Double tap to view order details"
      accessibilityRole="button"
    >
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.orderId} accessible={false}>Order #{order.id}</Text>
          <Text style={styles.serviceType} accessible={false}>{order.serviceType}</Text>
        </View>
        <View 
          style={[styles.statusBadge, { backgroundColor: statusColor }]}
          accessible={false}
        >
          <Text style={styles.statusText}>{order.status}</Text>
        </View>
      </View>
      <View style={styles.footer} accessible={false}>
        <Text style={styles.date}>{order.date}</Text>
        <Text style={styles.total}>${order.total.toFixed(2)}</Text>
      </View>
    </Card>
  );
};

// Memoize OrderCard to prevent unnecessary re-renders
export default memo(OrderCard);

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  headerLeft: {
    flex: 1,
  },
  orderId: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  serviceType: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.background,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  date: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  total: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});
