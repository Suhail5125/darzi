import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { OptimizedImage } from '../shared/OptimizedImage';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { User } from '../../types';

type MembershipTier = 'bronze' | 'silver' | 'gold' | 'platinum';

interface ProfileHeroCardProps {
  user: User;
  membershipTier?: MembershipTier;
  stats?: {
    totalOrders: number;
    loyaltyPoints: number;
    totalSavings: number;
  };
  onEditPress: () => void;
}

const tierColors = {
  bronze: { primary: '#CD7F32', secondary: '#B87333' },
  silver: { primary: '#C0C0C0', secondary: '#A8A8A8' },
  gold: { primary: '#FFD700', secondary: '#FFC700' },
  platinum: { primary: '#E5E4E2', secondary: '#D4D3D1' },
};

const tierLabels = {
  bronze: 'Bronze Member',
  silver: 'Silver Member',
  gold: 'Gold Member',
  platinum: 'Platinum Member',
};

export default function ProfileHeroCard({ 
  user, 
  membershipTier = 'bronze',
  stats = { totalOrders: 0, loyaltyPoints: 0, totalSavings: 0 },
  onEditPress 
}: ProfileHeroCardProps) {
  const tierColor = tierColors[membershipTier];

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#4A6FA5', '#667eea', '#4A6FA5']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Glass overlay */}
        {Platform.OS === 'ios' ? (
          <BlurView intensity={20} tint="dark" style={styles.glassOverlay}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <OptimizedImage 
                  source={{ uri: user.avatar }} 
                  style={styles.avatar}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  accessibilityLabel={`${user.name}'s profile picture`}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              {/* Tier badge */}
              <View style={[styles.tierBadge, { backgroundColor: tierColor.primary }]}>
                <Text style={styles.tierIcon}>⭐</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <View style={[styles.tierLabel, { borderColor: tierColor.primary }]}>
                <Text style={[styles.tierText, { color: tierColor.primary }]}>
                  {tierLabels[membershipTier]}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={onEditPress}
              accessibilityLabel="Edit profile"
              accessibilityRole="button"
            >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📦</Text>
              <Text style={styles.statValue}>{stats.totalOrders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💎</Text>
              <Text style={styles.statValue}>{stats.loyaltyPoints.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>${stats.totalSavings}</Text>
              <Text style={styles.statLabel}>Saved</Text>
            </View>
          </View>
        </BlurView>
      ) : (
        <View style={styles.glassOverlay}>
          {/* Profile Section */}
          <View style={styles.profileSection}>
            <View style={styles.avatarContainer}>
              {user.avatar ? (
                <OptimizedImage 
                  source={{ uri: user.avatar }} 
                  style={styles.avatar}
                  contentFit="cover"
                  cachePolicy="memory-disk"
                  accessibilityLabel={`${user.name}'s profile picture`}
                />
              ) : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarText}>
                    {user.name.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              {/* Tier badge */}
              <View style={[styles.tierBadge, { backgroundColor: tierColor.primary }]}>
                <Text style={styles.tierIcon}>⭐</Text>
              </View>
            </View>

            <View style={styles.infoContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              <View style={[styles.tierLabel, { borderColor: tierColor.primary }]}>
                <Text style={[styles.tierText, { color: tierColor.primary }]}>
                  {tierLabels[membershipTier]}
                </Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.editButton}
              onPress={onEditPress}
              accessibilityLabel="Edit profile"
              accessibilityRole="button"
            >
              <Text style={styles.editIcon}>✏️</Text>
            </TouchableOpacity>
          </View>

          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>📦</Text>
              <Text style={styles.statValue}>{stats.totalOrders}</Text>
              <Text style={styles.statLabel}>Orders</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💎</Text>
              <Text style={styles.statValue}>{stats.loyaltyPoints.toLocaleString()}</Text>
              <Text style={styles.statLabel}>Points</Text>
            </View>
            
            <View style={styles.statDivider} />
            
            <View style={styles.statItem}>
              <Text style={styles.statIcon}>💰</Text>
              <Text style={styles.statValue}>${stats.totalSavings}</Text>
              <Text style={styles.statLabel}>Saved</Text>
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
    marginTop: spacing.lg,
    marginBottom: spacing.md,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.lg,
  },
  gradient: {
    borderRadius: borderRadius.lg,
  },
  glassOverlay: {
    backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    overflow: 'hidden',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: spacing.lg,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  avatarText: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.background,
  },
  tierBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#2B4162',
  },
  tierIcon: {
    fontSize: 14,
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: typography.fontSize.xl,
    fontWeight: '700',
    color: colors.background,
    marginBottom: spacing.xs,
  },
  email: {
    fontSize: typography.fontSize.sm,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.sm,
  },
  tierLabel: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  tierText: {
    fontSize: typography.fontSize.xs,
    fontWeight: '600',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  editIcon: {
    fontSize: 18,
  },
  statsSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.fontSize.lg,
    fontWeight: '700',
    color: colors.background,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: typography.fontSize.xs,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  statDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
});
