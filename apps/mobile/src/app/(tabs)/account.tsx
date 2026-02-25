import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Platform, Image, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useToast } from '../../contexts/ToastContext';
import { colors, spacing, typography, borderRadius, shadows } from '../../constants/theme';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from '../../components/shared';
import ProfileSection from '../../components/account/ProfileSection';
import RewardsCard from '../../components/account/RewardsCard';
import AccountSettings, { SettingsItem } from '../../components/account/AccountSettings';

export default function AccountScreen() {
  const { user, isAuthenticated, logout } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();
  const insets = useSafeAreaInsets();

  // Mock data - replace with real data from API
  const membershipTier = 'gold';
  const stats = {
    totalOrders: 12,
    loyaltyPoints: 2450,
    totalSavings: 89,
  };

  const personalSettings: SettingsItem[] = [
    { id: 'profile', label: 'Profile Settings', icon: 'person-outline', onPress: () => handleSettingsPress('profile') },
    { id: 'addresses', label: 'Saved Addresses', icon: 'location-outline', onPress: () => handleSettingsPress('addresses') },
    { id: 'payment', label: 'Payment Methods', icon: 'card-outline', onPress: () => handleSettingsPress('payment') },
  ];

  const preferencesSettings: SettingsItem[] = [
    { id: 'notifications', label: 'Notifications', icon: 'notifications-outline', onPress: () => handleSettingsPress('notifications') },
    { id: 'language', label: 'Language & Region', icon: 'globe-outline', onPress: () => handleSettingsPress('language') },
    { id: 'accessibility', label: 'Accessibility', icon: 'accessibility-outline', onPress: () => handleSettingsPress('accessibility') },
  ];

  const ordersSettings: SettingsItem[] = [
    { id: 'orders', label: 'Order History', icon: 'receipt-outline', onPress: () => router.push('/dashboard') },
    { id: 'favorites', label: 'Favorites', icon: 'heart-outline', onPress: () => handleSettingsPress('favorites') },
    { id: 'reviews', label: 'Reviews & Ratings', icon: 'star-outline', onPress: () => handleSettingsPress('reviews') },
  ];

  const supportSettings: SettingsItem[] = [
    { id: 'help', label: 'Help Center', icon: 'help-circle-outline', onPress: () => router.push('/faq') },
    { id: 'contact', label: 'Contact Support', icon: 'chatbubble-outline', onPress: () => router.push('/contact') },
    { id: 'track', label: 'Track Order', icon: 'navigate-outline', onPress: () => router.push('/dashboard') },
  ];

  const legalSettings: SettingsItem[] = [
    { id: 'terms', label: 'Terms & Conditions', icon: 'document-text-outline', onPress: () => router.push('/terms') },
    { id: 'privacy', label: 'Privacy Policy', icon: 'shield-checkmark-outline', onPress: () => router.push('/privacy') },
    { id: 'about', label: 'About Darzi', icon: 'information-circle-outline', onPress: () => router.push('/about') },
  ];

  const handleSettingsPress = (itemId: string) => {
    console.log('Navigate to:', itemId);
    showToast(`${itemId} screen coming soon`, 'info');
  };

  const handleReferralPress = () => {
    showToast('Referral program coming soon', 'info');
  };

  const handleRewardsPress = () => {
    showToast('Rewards screen coming soon', 'info');
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            try {
              await logout();
              showToast('Logged out successfully', 'success');
              router.replace('/');
            } catch (error) {
              showToast('Failed to logout. Please try again.', 'error');
            }
          },
        },
      ]
    );
  };

  if (!isAuthenticated || !user) {
    return (
      <View style={styles.container}>
        {/* Gradient Background */}
        <LinearGradient
          colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
          <View style={styles.notAuthenticatedContainer}>
            <Text style={styles.notAuthenticatedText}>Please login to view your account</Text>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push('/(auth)/login')}
              accessibilityLabel="Go to login"
              accessibilityRole="button"
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
        {/* Custom Header for Account */}
        <View style={styles.headerContainer}>
          {/* Background for header */}
          <View style={styles.headerBackground} />
          
          <View style={styles.headerContent}>
            {/* Left - Coupon Icon */}
            <View style={styles.headerLeft}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="light" style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => showToast('Coupons coming soon', 'info')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="pricetag-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </BlurView>
              ) : (
                <View style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => showToast('Coupons coming soon', 'info')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="pricetag-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>

            {/* Center - My Account Text (like search bar) */}
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.titleContainer}>
                <Text style={styles.headerTitle}>My Account</Text>
              </BlurView>
            ) : (
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>My Account</Text>
              </View>
            )}

            {/* Right - Referral Icon */}
            <View style={styles.headerRight}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="light" style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={handleReferralPress}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="gift-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </BlurView>
              ) : (
                <View style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={handleReferralPress}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="gift-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Add padding for fixed header */}
        <View style={styles.headerSpacer} />
        
        <ScrollView 
          style={styles.scrollView} 
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* Horizontal Scrolling Cards */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsScrollContent}
            style={styles.cardsScroll}
          >
            <View style={styles.cardSpacer} />
            <ProfileSection 
              user={user} 
              membershipTier={membershipTier}
              stats={stats}
              onEditPress={() => handleSettingsPress('profile')} 
            />
            <View style={styles.cardGap} />
            <RewardsCard
              currentTier={membershipTier}
              points={stats.loyaltyPoints}
              nextTierPoints={3000}
              onPress={handleRewardsPress}
            />
            <View style={styles.cardSpacer} />
          </ScrollView>

          {/* Settings Sections - No outer containers */}
          <AccountSettings
            title="Personal Information"
            items={personalSettings}
          />
          
          <AccountSettings
            title="Preferences"
            items={preferencesSettings}
          />

          <AccountSettings
            title="Orders & Activity"
            items={ordersSettings}
          />
          
          <AccountSettings
            title="Support & Help"
            items={supportSettings}
          />

          <AccountSettings
            title="Legal & About"
            items={legalSettings}
          />

          {/* Social Media Icons */}
          <View style={styles.socialContainer}>
            <Text style={styles.socialTitle}>Connect With Us</Text>
            <View style={styles.socialIcons}>
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => showToast('Facebook coming soon', 'info')}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-facebook" size={24} color="#1877F2" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => showToast('Instagram coming soon', 'info')}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-instagram" size={24} color="#E4405F" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => showToast('X (Twitter) coming soon', 'info')}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => showToast('WhatsApp coming soon', 'info')}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-whatsapp" size={24} color="#25D366" />
              </TouchableOpacity>
              
              <TouchableOpacity
                style={styles.socialButton}
                onPress={() => showToast('YouTube coming soon', 'info')}
                activeOpacity={0.7}
              >
                <Ionicons name="logo-youtube" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Logout Button */}
          <View style={styles.logoutContainer}>
            <TouchableOpacity
              style={styles.logoutButton}
              onPress={handleLogout}
              activeOpacity={0.7}
            >
              <Ionicons name="log-out-outline" size={20} color={colors.error} />
              <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 111, 165, 1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  headerLeft: {
    width: 44,
    alignItems: 'flex-start',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  iconTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
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
  headerTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  headerSpacer: {
    height: Platform.OS === 'ios' ? 100 : 80,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingBottom: spacing.md,
  },
  cardsScroll: {
    marginBottom: spacing.sm,
    marginTop: 12, // Increased from 6 to 12 (6px more)
  },
  cardsScrollContent: {
    paddingVertical: spacing.md,
  },
  cardSpacer: {
    width: spacing.md,
  },
  cardGap: {
    width: spacing.sm, // Decreased from spacing.md to spacing.sm (8px instead of 16px)
  },
  notAuthenticatedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  notAuthenticatedText: {
    fontSize: typography.fontSize.lg,
    color: colors.text.secondary,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  loginButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    minWidth: 120,
    ...shadows.md,
  },
  loginButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.background,
    textAlign: 'center',
  },
  logoutContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    borderWidth: 1.5,
    borderColor: colors.error,
  },
  logoutButtonText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.error,
  },
  socialContainer: {
    paddingHorizontal: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.lg,
  },
  socialTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  socialButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
