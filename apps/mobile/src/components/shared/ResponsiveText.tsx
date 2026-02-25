import React, { ReactNode } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { colors, typography } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveTextProps {
  children: ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body' | 'caption' | 'label';
  style?: TextStyle;
  numberOfLines?: number;
  accessible?: boolean;
  accessibilityRole?: 'header' | 'text' | 'none';
  accessibilityLabel?: string;
}

/**
 * Responsive text component that adapts font size based on screen size
 * Supports dynamic text sizing for accessibility
 */
export function ResponsiveText({
  children,
  variant = 'body',
  style,
  numberOfLines,
  accessible = true,
  accessibilityRole = 'text',
  accessibilityLabel,
}: ResponsiveTextProps) {
  const { fontSizes } = useResponsive();

  const variantStyles: Record<string, TextStyle> = {
    h1: {
      fontSize: fontSizes['4xl'],
      fontFamily: typography.fontFamily.bold,
      color: colors.text.primary,
      lineHeight: fontSizes['4xl'] * typography.lineHeight.tight,
    },
    h2: {
      fontSize: fontSizes['3xl'],
      fontFamily: typography.fontFamily.bold,
      color: colors.text.primary,
      lineHeight: fontSizes['3xl'] * typography.lineHeight.tight,
    },
    h3: {
      fontSize: fontSizes['2xl'],
      fontFamily: typography.fontFamily.semibold,
      color: colors.text.primary,
      lineHeight: fontSizes['2xl'] * typography.lineHeight.normal,
    },
    h4: {
      fontSize: fontSizes.xl,
      fontFamily: typography.fontFamily.semibold,
      color: colors.text.primary,
      lineHeight: fontSizes.xl * typography.lineHeight.normal,
    },
    body: {
      fontSize: fontSizes.base,
      fontFamily: typography.fontFamily.regular,
      color: colors.text.primary,
      lineHeight: fontSizes.base * typography.lineHeight.normal,
    },
    caption: {
      fontSize: fontSizes.sm,
      fontFamily: typography.fontFamily.regular,
      color: colors.text.secondary,
      lineHeight: fontSizes.sm * typography.lineHeight.normal,
    },
    label: {
      fontSize: fontSizes.sm,
      fontFamily: typography.fontFamily.medium,
      color: colors.text.primary,
      lineHeight: fontSizes.sm * typography.lineHeight.normal,
    },
  };

  return (
    <Text
      style={[variantStyles[variant], style]}
      numberOfLines={numberOfLines}
      accessible={accessible}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      allowFontScaling={true}
      maxFontSizeMultiplier={2}
    >
      {children}
    </Text>
  );
}
