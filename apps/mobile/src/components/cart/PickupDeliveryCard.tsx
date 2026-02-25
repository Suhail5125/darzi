import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface PickupDeliveryCardProps {
  name: string;
  address: string;
  onEdit: () => void;
}

export function PickupDeliveryCard({ name, address, onEdit }: PickupDeliveryCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Ionicons name="person-outline" size={18} color={colors.primary} />
      </View>
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{name}</Text>
        <Text style={styles.address} numberOfLines={1}>{address}</Text>
      </View>
      <TouchableOpacity
        onPress={onEdit}
        style={styles.changeButton}
        activeOpacity={0.7}
      >
        <Text style={styles.changeText}>Change</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  content: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  address: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
  changeButton: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
  },
  changeText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
});
