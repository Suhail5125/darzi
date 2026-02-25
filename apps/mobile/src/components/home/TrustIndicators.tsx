import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card } from '../shared/Card';
import { colors, typography, spacing } from '../../constants/theme';

export interface TrustIndicator {
  id: string;
  icon: string;
  title: string;
  description: string;
}

interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}

export const TrustIndicators: React.FC<TrustIndicatorsProps> = ({ indicators }) => {
  return (
    <View style={styles.container}>
      <View style={styles.grid}>
        {indicators.map((indicator) => (
          <View key={indicator.id} style={styles.indicatorWrapper}>
            <Card style={styles.card}>
              <Text style={styles.icon}>{indicator.icon}</Text>
              <Text style={styles.title}>{indicator.title}</Text>
              <Text style={styles.description}>{indicator.description}</Text>
            </Card>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  indicatorWrapper: {
    width: '48%',
    marginBottom: spacing.md,
  },
  card: {
    padding: spacing.md,
    alignItems: 'center',
    minHeight: 140,
  },
  icon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
});
