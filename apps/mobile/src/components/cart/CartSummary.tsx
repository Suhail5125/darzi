import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

interface CartSummaryProps {
  subtotal: number;
  tip: number;
  deliveryFee: number;
  discount?: number;
  total: number;
}

export function CartSummary({ subtotal, tip, deliveryFee, discount = 0, total }: CartSummaryProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bill Summary</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Item Total</Text>
        <Text style={styles.value}>₹{subtotal.toFixed(0)}</Text>
      </View>

      {tip > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Delivery Tip</Text>
          <Text style={styles.value}>₹{tip.toFixed(0)}</Text>
        </View>
      )}

      <View style={styles.row}>
        <Text style={styles.label}>Delivery Fee</Text>
        <Text style={styles.value}>₹{deliveryFee.toFixed(0)}</Text>
      </View>

      {discount > 0 && (
        <View style={styles.row}>
          <Text style={styles.label}>Discount</Text>
          <Text style={styles.discountValue}>-₹{discount.toFixed(0)}</Text>
        </View>
      )}

      <View style={styles.divider} />

      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>To Pay</Text>
        <Text style={styles.totalValue}>₹{total.toFixed(0)}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
  value: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  divider: {
    height: 1,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    marginVertical: spacing.sm,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  totalValue: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.primary,
  },
  discountValue: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.success,
  },
});
