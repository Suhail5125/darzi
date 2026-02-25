import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../shared/Card';
import { colors, spacing, typography } from '../../constants/theme';

interface SummaryCardsProps {
  activeOrders: number;
  completedOrders: number;
  totalItems: number;
}

export function SummaryCards({ activeOrders, completedOrders, totalItems }: SummaryCardsProps) {
  return (
    <View style={styles.container}>
      <Card style={styles.card} variant="elevated">
        <Text style={styles.number}>{activeOrders}</Text>
        <Text style={styles.label}>Active Orders</Text>
      </Card>
      <Card style={styles.card} variant="elevated">
        <Text style={styles.number}>{completedOrders}</Text>
        <Text style={styles.label}>Completed</Text>
      </Card>
      <Card style={styles.card} variant="elevated">
        <Text style={styles.number}>{totalItems}</Text>
        <Text style={styles.label}>Total Items</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  number: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
  },
});
