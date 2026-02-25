import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface RecentOrder {
  id: string;
  orderNumber: string;
  serviceName: string;
  status: 'pending' | 'processing' | 'completed' | 'delivered';
  date: string;
  itemCount: number;
  totalAmount: string;
  imageUrl?: string;
}

interface RecentOrdersProps {
  orders: RecentOrder[];
  onReorder: (orderId: string) => void;
  onTrack: (orderId: string) => void;
  onRate: (orderId: string) => void;
  onViewAll: () => void;
}

const getStatusColor = (status: RecentOrder['status']) => {
  switch (status) {
    case 'pending':
      return '#F59E0B'; // Orange/Yellow
    case 'processing':
      return '#3B82F6'; // Blue
    case 'completed':
      return '#10B981'; // Green
    case 'delivered':
      return '#6B7280'; // Gray
    default:
      return colors.mutedForeground;
  }
};

const getActionButtonColor = (status: RecentOrder['status']) => {
  // Rate button for delivered orders - Yellow
  if (status === 'delivered') {
    return '#F59E0B';
  }
  // Track button for active orders - matches status color
  return getStatusColor(status);
};

const getStatusLabel = (status: RecentOrder['status']) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'In Progress';
    case 'completed':
      return 'Ready';
    case 'delivered':
      return 'Delivered';
    default:
      return status;
  }
};

export const RecentOrders: React.FC<RecentOrdersProps> = ({
  orders,
  onReorder,
  onTrack,
  onRate,
  onViewAll,
}) => {
  if (orders.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Semi-transparent box container */}
      <View style={styles.sectionBox}>
        {/* Header inside the box */}
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
            <View style={styles.viewAllButton}>
              <Text style={styles.viewAllText}>View All</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.primary} />
            </View>
          </TouchableOpacity>
        </View>

        {/* Horizontal scrollable order cards */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.ordersScrollContent}
          style={styles.ordersScroll}
        >
          {orders.slice(0, 3).map((order, index) => {
            const statusColor = getStatusColor(order.status);
            const actionColor = getActionButtonColor(order.status);
            const isLastItem = index === orders.slice(0, 3).length - 1;
            const isFirstItem = index === 0;
            
            return (
              <View 
                key={order.id} 
                style={[
                  styles.orderCard,
                  { 
                    backgroundColor: `${statusColor}15`,
                    borderColor: `${statusColor}40`,
                    marginLeft: isFirstItem ? spacing.md : 0,
                    marginRight: isLastItem ? spacing.md : spacing.sm,
                  }
                ]}
              >
                {/* Order number and status badge in single line */}
                <View style={styles.orderHeader}>
                  <View style={styles.orderInfo}>
                    <Ionicons name="receipt-outline" size={16} color={statusColor} />
                    <Text style={styles.orderNumber}>{order.orderNumber}</Text>
                  </View>
                  <View style={[styles.statusBadge, { backgroundColor: `${statusColor}25` }]}>
                    <Text style={[styles.statusText, { color: statusColor }]}>
                      {getStatusLabel(order.status)}
                    </Text>
                  </View>
                </View>

                {/* Service name - single line with ellipsis */}
                <Text style={styles.serviceName} numberOfLines={1} ellipsizeMode="tail">
                  {order.serviceName}
                </Text>

                {/* Items and date in single line */}
                <View style={styles.orderMeta}>
                  <View style={styles.metaItem}>
                    <Ionicons name="cube-outline" size={12} color={colors.mutedForeground} />
                    <Text style={styles.metaText}>
                      {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                    </Text>
                  </View>
                  <View style={styles.metaItem}>
                    <Ionicons name="calendar-outline" size={12} color={colors.mutedForeground} />
                    <Text style={styles.metaText}>{order.date}</Text>
                  </View>
                </View>

                {/* Action buttons in single line */}
                <View style={styles.orderActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.reorderButton]}
                    onPress={() => onReorder(order.id)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="repeat-outline" size={16} color={colors.foreground} />
                    <Text style={styles.actionButtonText}>Reorder</Text>
                  </TouchableOpacity>

                  {order.status !== 'delivered' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.primaryActionButton, { backgroundColor: actionColor }]}
                      onPress={() => onTrack(order.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="location-outline" size={16} color="#FFFFFF" />
                      <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
                        Track
                      </Text>
                    </TouchableOpacity>
                  )}

                  {order.status === 'delivered' && (
                    <TouchableOpacity
                      style={[styles.actionButton, styles.primaryActionButton, { backgroundColor: actionColor }]}
                      onPress={() => onRate(order.id)}
                      activeOpacity={0.7}
                    >
                      <Ionicons name="star-outline" size={16} color="#FFFFFF" />
                      <Text style={[styles.actionButtonText, styles.primaryActionButtonText]}>
                        Rate
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  ordersScroll: {
    marginHorizontal: -spacing.md,
  },
  ordersScrollContent: {
    // No padding - cards handle their own margins
  },
  orderCard: {
    width: 280,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    // marginLeft and marginRight are set dynamically
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  orderNumber: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  statusBadge: {
    paddingHorizontal: spacing.xs + 2,
    paddingVertical: 4,
    borderRadius: borderRadius.full,
  },
  statusText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  serviceName: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  orderMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.mutedForeground,
  },
  orderActions: {
    flexDirection: 'row',
    gap: spacing.xs,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    borderRadius: borderRadius.md,
  },
  reorderButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
  primaryActionButton: {
    borderWidth: 0,
  },
  actionButtonText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  primaryActionButtonText: {
    color: '#FFFFFF',
  },
});
