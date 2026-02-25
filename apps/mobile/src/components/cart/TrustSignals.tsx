import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

const TRUST_ITEMS = [
  { icon: 'shield-checkmark', label: 'Secure Payment' },
  { icon: 'refresh', label: 'Easy Returns' },
  { icon: 'star', label: 'Quality Assured' },
  { icon: 'time', label: 'On-time Delivery' },
];

export function TrustSignals() {
  return (
    <View style={styles.container}>
      {TRUST_ITEMS.map((item, index) => (
        <View key={index} style={styles.item}>
          <Ionicons name={item.icon as any} size={16} color={colors.success} />
          <Text style={styles.label}>{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    gap: spacing.md,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    width: '48%',
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
});
