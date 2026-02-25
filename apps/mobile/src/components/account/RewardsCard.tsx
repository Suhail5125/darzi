import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface RewardsCardProps {
  currentTier: MembershipTier;
  points: number;
  nextTierPoints: number;
  onPress: () => void;
}

const getTierGradient = (tier: MembershipTier): [string, string, ...string[]] => {
  switch (tier) {
    case 'bronze':
      return ['#CD7F32', '#B87333'];
    case 'silver':
      return ['#C0C0C0', '#A8A8A8'];
    case 'gold':
      return ['#FFD700', '#FFA500'];
    case 'platinum':
      return ['#E5E4E2', '#BCC6CC'];
  }
};

const getTierLabel = (tier: MembershipTier) => {
  return tier.charAt(0).toUpperCase() + tier.slice(1);
};

export default function RewardsCard({ 
  currentTier, 
  points, 
  nextTierPoints,
  onPress 
}: RewardsCardProps) {
  const progress = (points / nextTierPoints) * 100;
  const pointsToNext = Math.max(nextTierPoints - points, 0);
  const isMaxTier = currentTier === 'platinum';

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.9}
    >
      <LinearGradient
        colors={getTierGradient(currentTier)}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.tierInfo}>
              <Text style={styles.tierLabel}>{getTierLabel(currentTier)} Rewards</Text>
              <Text style={styles.pointsText}>{points.toLocaleString()} pts</Text>
            </View>
            <View style={styles.rewardsBadge}>
              <Text style={styles.rewardsCount}>3</Text>
              <Text style={styles.rewardsLabel}>Available</Text>
            </View>
          </View>

          {!isMaxTier && (
            <View style={styles.progressSection}>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: `${Math.min(progress, 100)}%` }]} />
              </View>
              <Text style={styles.milestoneText}>
                {pointsToNext} pts to next tier
              </Text>
            </View>
          )}

          {isMaxTier && (
            <View style={styles.maxTierBadge}>
              <Text style={styles.maxTierText}>🎉 Highest tier!</Text>
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 280,
    height: 160,
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  gradient: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tierInfo: {
    flex: 1,
  },
  tierLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  pointsText: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardsBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    minWidth: 50,
  },
  rewardsCount: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  rewardsLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  progressSection: {
    gap: spacing.xs / 2,
  },
  progressBar: {
    height: 6,
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
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  maxTierBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  maxTierText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
