import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface SavingsHighlightProps {
  amount: number;
}

export function SavingsHighlight({ amount }: SavingsHighlightProps) {
  if (amount <= 0) return null;

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle" size={24} color={colors.success} />
      <View style={styles.content}>
        <Text style={styles.title}>Yay! You're saving</Text>
        <Text style={styles.amount}>₹{amount.toFixed(0)} on this order</Text>
      </View>
      <Ionicons name="gift" size={24} color={colors.success} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    marginBottom: 2,
  },
  amount: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.success,
  },
});
