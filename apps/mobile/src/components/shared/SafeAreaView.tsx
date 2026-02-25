import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets, Edge } from 'react-native-safe-area-context';
import { colors, spacing } from '../../constants/theme';

interface SafeAreaViewProps {
  children: ReactNode;
  style?: ViewStyle;
  edges?: Edge[];
  scrollable?: boolean;
  backgroundColor?: string;
}

/**
 * SafeAreaView wrapper that handles safe areas consistently
 * Matches web's page-padding-top utility and ensures proper spacing
 * 
 * @param edges - Which edges to apply safe area (default: all)
 * @param scrollable - Whether content should scroll
 * @param backgroundColor - Background color (default: theme background)
 */
export function SafeAreaView({
  children,
  style,
  edges = ['top', 'bottom', 'left', 'right'],
  scrollable = false,
  backgroundColor = colors.background,
}: SafeAreaViewProps) {
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor,
    paddingTop: edges.includes('top') ? insets.top : 0,
    paddingBottom: edges.includes('bottom') ? insets.bottom : 0,
    paddingLeft: edges.includes('left') ? insets.left : 0,
    paddingRight: edges.includes('right') ? insets.right : 0,
  };

  if (scrollable) {
    return (
      <ScrollView
        style={[containerStyle, style]}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={Platform.OS === 'web'}
        bounces={true}
      >
        {children}
      </ScrollView>
    );
  }

  return <View style={[containerStyle, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
});
