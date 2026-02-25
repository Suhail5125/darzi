import React, { memo, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CartItem as CartItemType } from '../../types';
import { colors, typography, spacing, borderRadius, touchTarget } from '../../constants/theme';
import { createButtonA11yProps, getPriceLabel } from '../../utils/accessibility';

interface CartItemProps {
  item: CartItemType;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item, onQuantityChange, onRemove }) => {
  const handleDecrement = useCallback(() => {
    onQuantityChange(item.id, item.quantity - 1);
  }, [item.id, item.quantity, onQuantityChange]);

  const handleIncrement = useCallback(() => {
    onQuantityChange(item.id, item.quantity + 1);
  }, [item.id, item.quantity, onQuantityChange]);

  const handleRemove = useCallback(() => {
    onRemove(item.id);
  }, [item.id, onRemove]);
  
  const itemTotal = useMemo(() => item.price * item.quantity, [item.price, item.quantity]);
  const originalPrice = useMemo(() => Math.round(item.price * 1.2), [item.price]); // 20% markup for strikethrough
  const originalTotal = useMemo(() => originalPrice * item.quantity, [originalPrice, item.quantity]);
  
  const decrementA11y = useMemo(() => createButtonA11yProps(
    `Decrease quantity of ${item.serviceName}`,
    `Current quantity is ${item.quantity}`,
    item.quantity <= 1
  ), [item.serviceName, item.quantity]);
  
  const incrementA11y = useMemo(() => createButtonA11yProps(
    `Increase quantity of ${item.serviceName}`,
    `Current quantity is ${item.quantity}`
  ), [item.serviceName, item.quantity]);
  
  const removeA11y = useMemo(() => createButtonA11yProps(
    `Remove ${item.serviceName} from cart`,
    'Double tap to remove this item'
  ), [item.serviceName]);

  return (
    <View 
      style={styles.container}
      accessible={true}
      accessibilityRole="none"
      accessibilityLabel={`${item.serviceName}, ${getPriceLabel(item.price)} each, quantity ${item.quantity}, total ${getPriceLabel(itemTotal)}`}
    >
      {/* Image Box */}
      <View style={styles.imageBox}>
        <Ionicons name="shirt-outline" size={24} color={colors.primary} />
      </View>

      <View style={styles.contentSection}>
        <View style={styles.topRow}>
          <View style={styles.leftSection}>
            <Text style={styles.name} accessible={false}>{item.serviceName}</Text>
            <View style={styles.priceRow}>
              <Text style={styles.price} accessible={false}>₹{item.price}</Text>
              <Text style={styles.originalPrice} accessible={false}>₹{originalPrice}</Text>
              {item.quantity > 1 && (
                <>
                  <Text style={styles.separator}>•</Text>
                  <Text style={styles.itemTotal} accessible={false}>₹{itemTotal}</Text>
                  <Text style={styles.originalTotal} accessible={false}>₹{originalTotal}</Text>
                </>
              )}
            </View>
          </View>

          <View style={styles.quantityControls}>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleDecrement}
              disabled={item.quantity <= 1}
              {...decrementA11y}
            >
              <Ionicons name="remove" size={16} color={item.quantity <= 1 ? colors.text.disabled : colors.error} />
            </TouchableOpacity>

            <Text style={styles.quantity} accessible={false}>{item.quantity}</Text>

            <TouchableOpacity
              style={styles.quantityButton}
              onPress={handleIncrement}
              {...incrementA11y}
            >
              <Ionicons name="add" size={16} color={colors.success} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

// Memoize CartItem to prevent unnecessary re-renders
export default memo(CartItem);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 111, 165, 0.1)',
    gap: spacing.sm,
  },
  imageBox: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.md,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentSection: {
    flex: 1,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  originalPrice: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  separator: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
  },
  itemTotal: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.primary,
  },
  originalTotal: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    textDecorationLine: 'line-through',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(74, 111, 165, 0.2)',
  },
  quantityButton: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    minWidth: 24,
    textAlign: 'center',
  },
});
