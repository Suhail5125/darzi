import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface Coupon {
  code: string;
  title: string;
  description: string;
  discount: number;
}

interface CouponsOffersSectionProps {
  availableCoupons: Coupon[];
  appliedCoupon: string | null;
  onApplyCoupon: (code: string) => void;
  onRemoveCoupon: () => void;
}

export function CouponsOffersSection({
  availableCoupons,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
}: CouponsOffersSectionProps) {
  const [showCoupons, setShowCoupons] = useState(false);
  const [manualCode, setManualCode] = useState('');

  const handleApplyManual = () => {
    if (manualCode.trim()) {
      onApplyCoupon(manualCode.toUpperCase());
      setManualCode('');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with coupon icon */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setShowCoupons(!showCoupons)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="pricetag-outline" size={18} color={colors.primary} />
          <Text style={styles.headerText}>View & Apply Coupons</Text>
        </View>
        <Ionicons
          name={showCoupons ? 'chevron-up' : 'chevron-down'}
          size={20}
          color={colors.primary}
        />
      </TouchableOpacity>

      {/* Expanded Content */}
      {showCoupons && (
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Coupons & offers</Text>

          {/* Available Coupons */}
          {availableCoupons.map((coupon) => (
            <View key={coupon.code} style={styles.couponCard}>
              <View style={styles.couponIcon}>
                <Ionicons name="pricetag" size={20} color={colors.success} />
              </View>
              <View style={styles.couponInfo}>
                <Text style={styles.couponTitle}>{coupon.title}</Text>
                <Text style={styles.couponDescription}>{coupon.description}</Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  appliedCoupon === coupon.code && styles.appliedButton,
                ]}
                onPress={() =>
                  appliedCoupon === coupon.code
                    ? onRemoveCoupon()
                    : onApplyCoupon(coupon.code)
                }
                activeOpacity={0.7}
              >
                <Text
                  style={[
                    styles.applyButtonText,
                    appliedCoupon === coupon.code && styles.appliedButtonText,
                  ]}
                >
                  {appliedCoupon === coupon.code ? 'Applied' : 'Apply'}
                </Text>
              </TouchableOpacity>
            </View>
          ))}

          {/* Manual Code Entry */}
          <View style={styles.manualCodeContainer}>
            <TextInput
              style={styles.manualCodeInput}
              value={manualCode}
              onChangeText={setManualCode}
              placeholder="Enter coupon code"
              placeholderTextColor={colors.text.disabled}
              autoCapitalize="characters"
            />
            <TouchableOpacity
              style={[
                styles.manualApplyButton,
                !manualCode.trim() && styles.manualApplyButtonDisabled,
              ]}
              onPress={handleApplyManual}
              disabled={!manualCode.trim()}
              activeOpacity={0.7}
            >
              <Text style={styles.manualApplyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: spacing.sm,
  },
  headerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    flex: 1,
  },
  content: {
    padding: spacing.md,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 111, 165, 0.1)',
  },
  sectionTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(74, 111, 165, 0.1)',
  },
  couponIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  couponInfo: {
    flex: 1,
  },
  couponTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: 2,
  },
  couponDescription: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
  applyButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    borderWidth: 1.5,
    borderColor: colors.primary,
    minWidth: 70,
    alignItems: 'center',
  },
  appliedButton: {
    backgroundColor: colors.success,
    borderColor: colors.success,
  },
  applyButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  appliedButtonText: {
    color: '#FFFFFF',
  },
  manualCodeContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  manualCodeInput: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    borderWidth: 1,
    borderColor: 'rgba(74, 111, 165, 0.2)',
  },
  manualApplyButton: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 70,
  },
  manualApplyButtonDisabled: {
    backgroundColor: colors.text.disabled,
  },
  manualApplyButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
