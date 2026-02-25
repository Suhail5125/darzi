import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface LoyaltyData {
  points: number;
  nextMilestone: number;
  availableRewards: number;
  tier?: 'bronze' | 'silver' | 'gold' | 'platinum';
}

interface LoyaltyWidgetProps {
  data: LoyaltyData;
  onPress: () => void;
}

const getTierGradient = (tier?: LoyaltyData['tier']) => {
  switch (tier) {
    case 'bronze':
      return ['#CD7F32', '#B87333'];
    case 'silver':
      return ['#C0C0C0', '#A8A8A8'];
    case 'gold':
      return ['#FFD700', '#FFA500'];
    case 'platinum':
      return ['#E5E4E2', '#BCC6CC'];
    default:
      return [colors.primary, '#3B82F6'];
  }
};

const getTierLabel = (tier?: LoyaltyData['tier']) => {
  if (!tier) return 'Member';
  return tier.charAt(0).toUpperCase() + tier.slice(1);
};

export const LoyaltyWidget: React.FC<LoyaltyWidgetProps> = ({ data, onPress }) => {
  const progress = (data.points / data.nextMilestone) * 100;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={getTierGradient(data.tier)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View>
              <Text style={styles.tierLabel}>{getTierLabel(data.tier)} Rewards</Text>
              <Text style={styles.pointsText}>{data.points.toLocaleString()} Points</Text>
            </View>
            <View style={styles.rewardsBadge}>
              <Text style={styles.rewardsCount}>{data.availableRewards}</Text>
              <Text style={styles.rewardsLabel}>Available</Text>
            </View>
          </View>

          <View style={styles.progressSection}>
            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
            </View>
            <Text style={styles.milestoneText}>
              {data.nextMilestone - data.points} points to next reward
            </Text>
          </View>

          <View style={styles.footer}>
            <Text style={styles.ctaText}>Tap to view rewards →</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
    marginHorizontal: spacing.md,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    padding: spacing.lg,
  },
  content: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  tierLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.xs / 2,
  },
  pointsText: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    minWidth: 70,
  },
  rewardsCount: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardsLabel: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressSection: {
    gap: spacing.xs,
  },
  progressBar: {
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.sm,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.sm,
  },
  milestoneText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  footer: {
    alignItems: 'center',
  },
  ctaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});
