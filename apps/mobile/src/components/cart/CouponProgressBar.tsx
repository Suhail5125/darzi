import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface CouponProgressBarProps {
  currentAmount: number;
  targetAmount: number;
  discount: number;
}

export function CouponProgressBar({ currentAmount, targetAmount, discount }: CouponProgressBarProps) {
  const progress = Math.min((currentAmount / targetAmount) * 100, 100);
  const remaining = Math.max(targetAmount - currentAmount, 0);
  const isUnlocked = currentAmount >= targetAmount;

  // Milestone amounts
  const milestones = [
    { amount: 500, discount: 50, label: '₹50 OFF' },
    { amount: 1000, discount: 100, label: '₹100 OFF' },
    { amount: 1500, discount: 150, label: '₹150 OFF' },
    { amount: 2000, discount: 200, label: '₹200 OFF' },
  ];

  return (
    <View style={styles.container}>
      {!isUnlocked ? (
        <View style={styles.messageContainer}>
          <Ionicons name="gift-outline" size={16} color={colors.primary} />
          <Text style={styles.message}>
            Shop for <Text style={styles.highlight}>₹{remaining}</Text> more to unlock{' '}
            <Text style={styles.highlight}>₹{discount} OFF</Text> coupon
          </Text>
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <Ionicons name="checkmark-circle" size={16} color={colors.success} />
          <Text style={styles.successMessage}>
            Congratulations! You've unlocked <Text style={styles.highlight}>₹{discount} OFF</Text>
          </Text>
        </View>
      )}

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        
        {/* Milestones */}
        <View style={styles.milestonesContainer}>
          {milestones.map((milestone, index) => {
            const milestoneProgress = (milestone.amount / targetAmount) * 100;
            const isAchieved = currentAmount >= milestone.amount;
            
            return (
              <View
                key={index}
                style={[
                  styles.milestone,
                  { left: `${milestoneProgress}%` },
                ]}
              >
                <View
                  style={[
                    styles.milestoneIcon,
                    isAchieved && styles.milestoneIconAchieved,
                  ]}
                >
                  {isAchieved ? (
                    <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                  ) : (
                    <View style={styles.milestoneIconEmpty} />
                  )}
                </View>
                <Text style={styles.milestoneLabel}>{milestone.label}</Text>
              </View>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(74, 111, 165, 0.2)',
  },
  messageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    marginBottom: spacing.md,
  },
  message: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    flex: 1,
  },
  successMessage: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.success,
    flex: 1,
  },
  highlight: {
    fontWeight: '700',
    color: colors.primary,
  },
  progressContainer: {
    position: 'relative',
    paddingBottom: spacing.lg,
  },
  progressTrack: {
    height: 8,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.success,
    borderRadius: borderRadius.full,
  },
  milestonesContainer: {
    position: 'relative',
    marginTop: spacing.sm,
  },
  milestone: {
    position: 'absolute',
    alignItems: 'center',
    transform: [{ translateX: -12 }], // Center on position
  },
  milestoneIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(74, 111, 165, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: spacing.xs,
  },
  milestoneIconAchieved: {
    backgroundColor: colors.success,
  },
  milestoneIconEmpty: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(74, 111, 165, 0.3)',
  },
  milestoneLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.secondary,
  },
});
