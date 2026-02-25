import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Text } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, touchTarget } from '../../constants/theme';
import { useCart } from '../../contexts/CartContext';
import { createTabA11yProps } from '../../utils/accessibility';

type IconName = keyof typeof Ionicons.glyphMap;

interface TabConfig {
  name: string;
  label: string;
  icon: IconName;
  iconFocused: IconName;
}

const TAB_CONFIG: Record<string, TabConfig> = {
  index: {
    name: 'index',
    label: 'Home',
    icon: 'home-outline',
    iconFocused: 'home',
  },
  explore: {
    name: 'explore',
    label: 'Explore',
    icon: 'compass-outline',
    iconFocused: 'compass',
  },
  cart: {
    name: 'cart',
    label: 'Cart',
    icon: 'cart-outline',
    iconFocused: 'cart',
  },
  account: {
    name: 'account',
    label: 'Account',
    icon: 'person-outline',
    iconFocused: 'person',
  },
};

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const { itemCount } = useCart();

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const tabConfig = TAB_CONFIG[route.name];

        if (!tabConfig) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        const iconName = isFocused ? tabConfig.iconFocused : tabConfig.icon;
        const color = isFocused ? colors.primary : colors.text.secondary;

        // Show badge only for cart tab
        const showBadge = route.name === 'cart' && itemCount > 0;
        
        // Create accessibility props
        const tabLabel = showBadge 
          ? `${tabConfig.label}, ${itemCount} items in cart`
          : tabConfig.label;
        const a11yProps = createTabA11yProps(
          tabLabel,
          isFocused,
          index,
          state.routes.length
        );

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
            {...a11yProps}
          >
            <View style={styles.iconContainer}>
              <Ionicons 
                name={iconName} 
                size={24} 
                color={color}
                accessible={false}
              />
              {showBadge && (
                <View 
                  style={styles.badge}
                  accessible={false}
                >
                  <Text style={styles.badgeText}>
                    {itemCount > 99 ? '99+' : itemCount}
                  </Text>
                </View>
              )}
            </View>
            <Text 
              style={[styles.label, { color }]}
              accessible={false}
            >
              {tabConfig.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xs,
    minHeight: touchTarget.minHeight,
  },
  iconContainer: {
    position: 'relative',
    marginBottom: spacing.xs / 2,
  },
  label: {
    fontSize: 12,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -10,
    backgroundColor: colors.error,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: colors.background,
    fontSize: 10,
    fontWeight: 'bold',
  },
});
