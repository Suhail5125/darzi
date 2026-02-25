import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { spacing } from '../../constants/theme';
import { useResponsive } from '../../hooks/useResponsive';

interface ResponsiveGridProps {
  children: ReactNode;
  columns?: number;
  minColumnWidth?: number;
  gap?: number;
  style?: ViewStyle;
}

/**
 * Responsive grid that automatically adjusts columns based on screen size
 */
export function ResponsiveGrid({
  children,
  columns,
  minColumnWidth = 150,
  gap = spacing.md,
  style,
}: ResponsiveGridProps) {
  const { getGridColumns } = useResponsive();

  const numColumns = columns || getGridColumns(minColumnWidth);

  const gridStyle: ViewStyle = {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -gap / 2,
  };

  const itemStyle: ViewStyle = {
    width: `${100 / numColumns}%`,
    paddingHorizontal: gap / 2,
    marginBottom: gap,
  };

  return (
    <View style={[gridStyle, style]}>
      {React.Children.map(children, (child) => (
        <View style={itemStyle}>{child}</View>
      ))}
    </View>
  );
}
