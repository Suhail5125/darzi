import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface PromoCodeSectionProps {
  appliedCoupon: string | null;
  discount: number;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export function PromoCodeSection({
  appliedCoupon,
  discount,
  onApplyCoupon,
  onRemoveCoupon,
}: PromoCodeSectionProps) {
  const [couponCode, setCouponCode] = useState('');

  const handleApply = () => {
    if (couponCode.trim()) {
      onApplyCoupon(couponCode.toUpperCase());
      setCouponCode('');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Have a Promo Code?</Text>
      
      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          value={couponCode}
          onChangeText={setCouponCode}
          placeholder="Enter code"
          placeholderTextColor={colors.text.disabled}
          autoCapitalize="characters"
          editable={!appliedCoupon}
        />
        <TouchableOpacity
          style={[styles.applyButton, appliedCoupon && styles.applyButtonDisabled]}
          onPress={handleApply}
          disabled={!couponCode.trim() || !!appliedCoupon}
          activeOpacity={0.8}
        >
          <Text style={styles.applyButtonText}>Apply</Text>
        </TouchableOpacity>
      </View>

      {appliedCoupon && (
        <View style={styles.appliedContainer}>
          <View style={styles.appliedContent}>
            <Ionicons name="checkmark-circle" size={20} color={colors.success} />
            <Text style={styles.appliedText}>
              {appliedCoupon} applied - ₹{discount.toFixed(0)} saved
            </Text>
          </View>
          <TouchableOpacity onPress={onRemoveCoupon}>
            <Ionicons name="close-circle" size={20} color={colors.error} />
          </TouchableOpacity>
        </View>
      )}
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
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  inputRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: colors.border,
  },
  applyButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 80,
  },
  applyButtonDisabled: {
    backgroundColor: colors.text.disabled,
  },
  applyButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  appliedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
  },
  appliedContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  appliedText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.success,
  },
});
