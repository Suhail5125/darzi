import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

interface EmptyCartProps {
  onBrowseServices: () => void;
  onViewOrders: () => void;
}

export function EmptyCart({ onBrowseServices, onViewOrders }: EmptyCartProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>🛒</Text>
      <Text style={styles.title}>Your Cart is Empty</Text>
      <Text style={styles.subtitle}>Add services to get started with your order</Text>
      
      <TouchableOpacity
        style={styles.primaryButton}
        onPress={onBrowseServices}
        activeOpacity={0.8}
      >
        <Text style={styles.primaryButtonText}>Browse Services</Text>
      </TouchableOpacity>
      
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onViewOrders}
        activeOpacity={0.8}
      >
        <Text style={styles.secondaryButtonText}>View Recent Orders</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    textAlign: 'center',
  },
  primaryButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
    minWidth: 200,
    ...shadows.md,
  },
  primaryButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.xl,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    minWidth: 200,
    borderWidth: 1.5,
    borderColor: colors.primary,
  },
  secondaryButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
    textAlign: 'center',
  },
});
