import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface DeliveryTimeCardProps {
  deliveryTime: string;
  itemCount: number;
  onSchedule: () => void;
}

export function DeliveryTimeCard({ deliveryTime, itemCount, onSchedule }: DeliveryTimeCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="time-outline" size={20} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.deliveryTime}>Delivering in {deliveryTime}</Text>
        <Text style={styles.itemCount}>{itemCount} items</Text>
      </View>
      <TouchableOpacity
        style={styles.scheduleButton}
        onPress={onSchedule}
        activeOpacity={0.7}
      >
        <Ionicons name="calendar-outline" size={16} color={colors.primary} />
        <Text style={styles.scheduleText}>Schedule</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
  },
  deliveryTime: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 2,
  },
  itemCount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
  scheduleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  scheduleText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
});
