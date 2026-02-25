import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveContainerProps {
  children: ReactNode;
  style?: ViewStyle;
  scrollable?: boolean;
  centerContent?: boolean;
  maxWidth?: number;
  horizontalPadding?: boolean;
  safeArea?: boolean;
}

/**
 * Responsive container that adapts to different screen sizes
 * Handles safe areas, orientation changes, and provides consistent padding
 */
export function ResponsiveContainer({
  children,
  style,
  scrollable = false,
  centerContent = false,
  maxWidth,
  horizontalPadding = true,
  safeArea = true,
}: ResponsiveContainerProps) {
  const insets = useSafeAreaInsets();
  const { isTablet, getResponsiveSpacing } = useResponsive();

  const containerStyle: ViewStyle = {
    flex: 1,
    paddingTop: safeArea ? insets.top : 0,
    paddingBottom: safeArea ? insets.bottom : 0,
    paddingLeft: horizontalPadding ? getResponsiveSpacing(spacing.md) : 0,
    paddingRight: horizontalPadding ? getResponsiveSpacing(spacing.md) : 0,
  };

  const contentStyle: ViewStyle = {
    flex: 1,
    maxWidth: maxWidth || (isTablet ? 1024 : undefined),
    width: '100%',
    alignSelf: centerContent ? 'center' : 'stretch',
  };

  if (scrollable) {
    return (
      <ScrollView
        style={[containerStyle, style]}
        contentContainerStyle={contentStyle}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
      >
        {children}
      </ScrollView>
    );
  }

  return (
    <View style={[containerStyle, style]}>
      <View style={contentStyle}>{children}</View>
    </View>
  );
}
