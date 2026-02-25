import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

interface AddressStripProps {
  address?: string;
  onPress?: () => void;
}

export const AddressStrip: React.FC<AddressStripProps> = ({
  address = 'Select delivery location',
  onPress,
}) => {
  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="light" style={styles.addressBox}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityLabel={`Delivery location: ${address}`}
            accessibilityRole="button"
            accessibilityHint="Double tap to change delivery location"
            style={styles.touchable}
          >
            {/* Location Icon */}
            <Ionicons name="location-sharp" size={20} color="#2B4162" />

            {/* Address Text */}
            <Text style={styles.address} numberOfLines={1}>
              {address}
            </Text>

            {/* Chevron */}
            <Ionicons name="chevron-down" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        </BlurView>
      ) : (
        <View style={styles.addressBox}>
          <TouchableOpacity
            onPress={onPress}
            activeOpacity={0.7}
            accessibilityLabel={`Delivery location: ${address}`}
            accessibilityRole="button"
            accessibilityHint="Double tap to change delivery location"
            style={styles.touchable}
          >
            {/* Location Icon */}
            <Ionicons name="location-sharp" size={20} color="#2B4162" />

            {/* Address Text */}
            <Text style={styles.address} numberOfLines={1}>
              {address}
            </Text>

            {/* Chevron */}
            <Ionicons name="chevron-down" size={16} color={colors.mutedForeground} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'transparent',
  },
  addressBox: {
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    height: 40,
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  touchable: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    gap: spacing.sm,
    height: '100%',
  },
  address: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
});
