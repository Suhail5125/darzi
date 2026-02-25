import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Platform,
  StatusBar,
  Image,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showNotification?: boolean;
  showAddress?: boolean;
  address?: string;
  onNotificationPress?: () => void;
  onAddressPress?: () => void;
  onSearchChange?: (text: string) => void;
  searchPlaceholder?: string;
  notificationCount?: number;
}

export default function Header({
  title,
  showBack = false,
  showSearch = true,
  showNotification = true,
  showAddress = false,
  address = 'Select delivery location',
  onNotificationPress,
  onAddressPress,
  onSearchChange,
  searchPlaceholder = 'Search services...',
  notificationCount = 0,
}: HeaderProps) {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    }
  };

  const handleSearchChange = (text: string) => {
    setSearchText(text);
    onSearchChange?.(text);
  };

  const paddingTop = Platform.OS === 'ios' ? insets.top : StatusBar.currentHeight || 0;

  return (
    <View style={[styles.container, { paddingTop }]}>
      {/* First Row - Logo, Search, Notification */}
      <View style={styles.content}>
        {/* Left - Logo */}
        <View style={styles.leftSection}>
          {showBack ? (
            <TouchableOpacity
              onPress={handleBack}
              style={styles.iconButton}
              accessibilityLabel="Go back"
              accessibilityRole="button"
            >
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
          ) : (
            Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/icon.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </BlurView>
            ) : (
              <View style={styles.logoContainer}>
                <Image
                  source={require('../../../assets/icon.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
            )
          )}
        </View>

        {/* Center - Search Bar */}
        {showSearch && (
          Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="light" style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={18}
                color={colors.mutedForeground}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.mutedForeground}
                value={searchText}
                onChangeText={handleSearchChange}
                returnKeyType="search"
                accessibilityLabel="Search input"
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => handleSearchChange('')}
                  style={styles.clearButton}
                  accessibilityLabel="Clear search"
                  accessibilityRole="button"
                >
                  <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
                </TouchableOpacity>
              )}
            </BlurView>
          ) : (
            <View style={styles.searchContainer}>
              <Ionicons
                name="search"
                size={18}
                color={colors.mutedForeground}
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                placeholderTextColor={colors.mutedForeground}
                value={searchText}
                onChangeText={handleSearchChange}
                returnKeyType="search"
                accessibilityLabel="Search input"
              />
              {searchText.length > 0 && (
                <TouchableOpacity
                  onPress={() => handleSearchChange('')}
                  style={styles.clearButton}
                  accessibilityLabel="Clear search"
                  accessibilityRole="button"
                >
                  <Ionicons name="close-circle" size={18} color={colors.mutedForeground} />
                </TouchableOpacity>
              )}
            </View>
          )
        )}

        {/* Right - Notification Bell */}
        {showNotification && (
          <View style={styles.rightSection}>
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.notificationButton}>
                <TouchableOpacity
                  onPress={onNotificationPress}
                  style={styles.notificationTouchable}
                  accessibilityLabel={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
                  accessibilityRole="button"
                >
                  <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                  {notificationCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </BlurView>
            ) : (
              <View style={styles.notificationButton}>
                <TouchableOpacity
                  onPress={onNotificationPress}
                  style={styles.notificationTouchable}
                  accessibilityLabel={`Notifications${notificationCount > 0 ? `, ${notificationCount} unread` : ''}`}
                  accessibilityRole="button"
                >
                  <Ionicons name="notifications-outline" size={24} color={colors.primary} />
                  {notificationCount > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>
                        {notificationCount > 9 ? '9+' : notificationCount}
                      </Text>
                    </View>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      </View>

      {/* Second Row - Address Strip (if enabled) */}
      {showAddress && (
        <View style={styles.addressRow}>
          {Platform.OS === 'ios' ? (
            <BlurView intensity={80} tint="light" style={styles.addressBox}>
              <TouchableOpacity
                onPress={onAddressPress}
                activeOpacity={0.7}
                accessibilityLabel={`Delivery location: ${address}`}
                accessibilityRole="button"
                style={styles.addressTouchable}
              >
                {/* Location Icon */}
                <Ionicons name="location-outline" size={16} color={colors.primary} />

                {/* Address Text */}
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
                </Text>

                {/* Chevron */}
                <Ionicons name="chevron-down" size={14} color={colors.mutedForeground} />
              </TouchableOpacity>
            </BlurView>
          ) : (
            <View style={styles.addressBox}>
              <TouchableOpacity
                onPress={onAddressPress}
                activeOpacity={0.7}
                accessibilityLabel={`Delivery location: ${address}`}
                accessibilityRole="button"
                style={styles.addressTouchable}
              >
                {/* Location Icon */}
                <Ionicons name="location-outline" size={16} color={colors.primary} />

                {/* Address Text */}
                <Text style={styles.addressText} numberOfLines={1}>
                  {address}
                </Text>

                {/* Chevron */}
                <Ionicons name="chevron-down" size={14} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    backgroundColor: 'transparent',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  leftSection: {
    width: 44,
    alignItems: 'flex-start',
  },
  logoContainer: {
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
  logo: {
    width: 32,
    height: 32,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  searchIcon: {
    marginRight: spacing.xs,
  },
  searchInput: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    paddingVertical: 0,
  },
  clearButton: {
    padding: spacing.xs / 2,
  },
  rightSection: {
    width: 44,
    alignItems: 'flex-end',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  notificationTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: colors.destructive,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    borderWidth: 2,
    borderColor: '#fff',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    fontFamily: typography.fontFamily.sans,
  },
  // Address Row Styles
  addressRow: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  addressBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs + 2,
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    height: 30,
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  addressTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs + 2,
    flex: 1,
  },
  addressText: {
    flex: 1,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
});
