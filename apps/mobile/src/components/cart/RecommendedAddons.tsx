import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

interface Addon {
  id: string;
  icon: string;
  name: string;
  price: number;
}

const ADDONS: Addon[] = [
  { id: 'starch', icon: '🧺', name: 'Starch', price: 50 },
  { id: 'press', icon: '👔', name: 'Press', price: 80 },
  { id: 'shoe-clean', icon: '👞', name: 'Shoe Clean', price: 99 },
  { id: 'bag-clean', icon: '👜', name: 'Bag Clean', price: 150 },
];

interface RecommendedAddonsProps {
  onAddAddon: (addonId: string) => void;
}

export function RecommendedAddons({ onAddAddon }: RecommendedAddonsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Complete Your Order</Text>
      
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {ADDONS.map((addon) => (
          <TouchableOpacity
            key={addon.id}
            style={styles.addonCard}
            onPress={() => onAddAddon(addon.id)}
            activeOpacity={0.8}
          >
            <Text style={styles.addonIcon}>{addon.icon}</Text>
            <Text style={styles.addonName}>{addon.name}</Text>
            <Text style={styles.addonPrice}>+₹{addon.price}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  scrollContent: {
    gap: spacing.sm,
  },
  addonCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
    width: 100,
    ...shadows.sm,
  },
  addonIcon: {
    fontSize: 32,
    marginBottom: spacing.xs,
  },
  addonName: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.xs,
  },
  addonPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.primary,
  },
});
