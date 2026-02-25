import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { OptimizedImage } from '../shared/OptimizedImage';
import { Card } from '../shared/Card';
import { colors, typography, spacing, borderRadius, touchTarget } from '../../constants/theme';
import { Service } from '../../types';
import { createButtonA11yProps, createImageA11yProps, getPriceLabel } from '../../utils/accessibility';

interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onPress }) => {
  const featuresText = service.features.slice(0, 3).join(', ');
  const priceText = getPriceLabel(service.price);
  
  const a11yLabel = `${service.title}, ${service.category}, ${priceText} per item. Features: ${featuresText}`;
  const a11yProps = createButtonA11yProps(
    a11yLabel,
    'Double tap to book this service'
  );
  
  const imageA11yProps = createImageA11yProps(
    `${service.title} service image`,
    false
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.7}
      {...a11yProps}
    >
      <Card style={styles.card} variant="elevated">
        <OptimizedImage
          source={{ uri: service.image }}
          style={styles.image}
          contentFit="cover"
          priority="low"
          cachePolicy="memory-disk"
          accessibilityLabel={imageA11yProps.accessibilityLabel}
          accessibilityIgnoresInvertColors={imageA11yProps.accessibilityIgnoresInvertColors}
          accessible={imageA11yProps.accessible}
        />
        
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} numberOfLines={2} accessible={false}>
              {service.title}
            </Text>
            <View style={styles.categoryBadge} accessible={false}>
              <Text style={styles.categoryText}>{service.category}</Text>
            </View>
          </View>

          <Text style={styles.description} numberOfLines={2} accessible={false}>
            {service.description}
          </Text>

          <View style={styles.features} accessible={false}>
            {service.features.slice(0, 3).map((feature, index) => (
              <View key={index} style={styles.featureItem}>
                <Text style={styles.checkmark}>✓</Text>
                <Text style={styles.featureText} numberOfLines={1}>
                  {feature}
                </Text>
              </View>
            ))}
          </View>

          <View style={styles.footer} accessible={false}>
            <Text style={styles.price}>${service.price}</Text>
            <Text style={styles.priceLabel}>per item</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

// Memoize ServiceCard to prevent unnecessary re-renders
export default memo(ServiceCard);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: spacing.md,
    minHeight: touchTarget.minHeight,
  },
  card: {
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 140,
    backgroundColor: colors.surface,
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  categoryBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.primary,
  },
  description: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  features: {
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  checkmark: {
    fontSize: typography.fontSize.sm,
    color: colors.success,
    marginRight: spacing.xs,
  },
  featureText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
    marginRight: spacing.xs,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
});
