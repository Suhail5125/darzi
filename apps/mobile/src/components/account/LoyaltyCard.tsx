import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';

type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface LoyaltyCardProps {
  currentTier: MembershipTier;
  points: number;
  nextTierPoints: number;
  onRedeemPress: () => void;
}

const tierInfo = {
  bronze: { name: 'Bronze', next: 'Silver', color: '#CD7F32', icon: '🥉' },
  silver: { name: 'Silver', next: 'Gold', color: '#C0C0C0', icon: '🥈' },
  gold: { name: 'Gold', next: 'Platinum', color: '#FFD700', icon: '🥇' },
  platinum: { name: 'Platinum', next: 'Elite', color: '#E5E4E2', icon: '💎' },
};

export default function LoyaltyCard({ 
  currentTier, 
  points, 
  nextTierPoints,
  onRedeemPress 
}: LoyaltyCardProps) {
  const tier = tierInfo[currentTier];
  const progress = Math.min((points / nextTierPoints) * 100, 100);
  const pointsToNext = Math.max(nextTierPoints - points, 0);
  const isMaxTier = currentTier === 'platinum';

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A6FA5', '#667eea']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {Platform.OS === 'ios' ? (
          <BlurView intensity={20} tint="dark" style={styles.glassCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.tierInfo}>
              <Text style={styles.tierIcon}>{tier.icon}</Text>
              <View>
                <Text style={styles.tierName}>{tier.name} Member</Text>
                <Text style={styles.pointsText}>{points.toLocaleString()} points</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={onRedeemPress}
              accessibilityLabel="Redeem rewards"
              accessibilityRole="button"
            >
              <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Section */}
          {!isMaxTier && (
            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>
                  {pointsToNext.toLocaleString()} points to {tier.next}
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${progress}%`,
                        backgroundColor: tier.color,
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}

          {isMaxTier && (
            <View style={styles.maxTierBadge}>
              <Text style={styles.maxTierText}>🎉 You've reached the highest tier!</Text>
            </View>
          )}

          {/* Benefits Preview */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>Your Benefits</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitItem}>✓ Priority support</Text>
              <Text style={styles.benefitItem}>✓ Exclusive discounts</Text>
              <Text style={styles.benefitItem}>✓ Free express delivery</Text>
            </View>
          </View>
        </BlurView>
      ) : (
        <View style={styles.glassCard}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.tierInfo}>
              <Text style={styles.tierIcon}>{tier.icon}</Text>
              <View>
                <Text style={styles.tierName}>{tier.name} Member</Text>
                <Text style={styles.pointsText}>{points.toLocaleString()} points</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.redeemButton}
              onPress={onRedeemPress}
              accessibilityLabel="Redeem rewards"
              accessibilityRole="button"
            >
              <Text style={styles.redeemText}>Redeem</Text>
            </TouchableOpacity>
          </View>

          {/* Progress Section */}
          {!isMaxTier && (
            <View style={styles.progressSection}>
              <View style={styles.progressInfo}>
                <Text style={styles.progressLabel}>
                  {pointsToNext.toLocaleString()} points to {tier.next}
                </Text>
              </View>
              
              <View style={styles.progressBarContainer}>
                <View style={styles.progressBarBackground}>
                  <View 
                    style={[
                      styles.progressBarFill, 
                      { 
                        width: `${progress}%`,
                        backgroundColor: tier.color,
                      }
                    ]} 
                  />
                </View>
              </View>
            </View>
          )}

          {isMaxTier && (
            <View style={styles.maxTierBadge}>
              <Text style={styles.maxTierText}>🎉 You've reached the highest tier!</Text>
            </View>
          )}

          {/* Benefits Preview */}
          <View style={styles.benefitsSection}>
            <Text style={styles.benefitsTitle}>Your Benefits</Text>
            <View style={styles.benefitsList}>
              <Text style={styles.benefitItem}>✓ Priority support</Text>
              <Text style={styles.benefitItem}>✓ Exclusive discounts</Text>
              <Text style={styles.benefitItem}>✓ Free express delivery</Text>
            </View>
          </View>
        </View>
      )}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  gradient: {
    borderRadius: borderRadius.lg,
  },
  glassCard: {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  tierInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  tierIcon: {
    fontSize: 40,
  },
  tierName: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 2,
  },
  pointsText: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  redeemButton: {
    backgroundColor: '#FFD700',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.md,
    ...shadows.sm,
  },
  redeemText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '700',
    color: '#2B4162',
  },
  progressSection: {
    marginBottom: spacing.md,
  },
  progressInfo: {
    marginBottom: spacing.sm,
  },
  progressLabel: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
  },
  progressBarContainer: {
    marginTop: spacing.xs,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: borderRadius.sm,
  },
  maxTierBadge: {
    backgroundColor: 'rgba(255, 215, 0, 0.2)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 215, 0, 0.3)',
  },
  maxTierText: {
    fontSize: typography.fontSize.sm,
    color: '#FFD700',
    fontWeight: '600',
    textAlign: 'center',
  },
  benefitsSection: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: spacing.md,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  benefitsTitle: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.background,
    marginBottom: spacing.sm,
  },
  benefitsList: {
    gap: spacing.xs,
  },
  benefitItem: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
  },
});
