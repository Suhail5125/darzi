import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface SettingsItem {
  id: string;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}

interface AccountSettingsProps {
  title: string;
  items: SettingsItem[];
}

export default function AccountSettings({ title, items }: AccountSettingsProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      
      <View style={styles.itemsContainer}>
        {items.map((item, index) => {
          const isLastItem = index === items.length - 1;
          
          return (
            <TouchableOpacity
              key={item.id}
              style={[styles.touchable, !isLastItem && styles.itemMargin]}
              onPress={item.onPress}
              activeOpacity={0.7}
            >
              <View style={styles.item}>
                <View style={styles.itemLeft}>
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                  <Text style={styles.itemLabel}>{item.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.sm,
    marginTop: 0, // Removed top margin for first section
  },
  itemsContainer: {
    // No gap, items handle their own margins
  },
  touchable: {
    backgroundColor: 'transparent',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    height: 48,
  },
  itemMargin: {
    marginBottom: spacing.xs,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  itemLabel: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
});
