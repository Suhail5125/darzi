import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface SuggestedItem {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  imageUrl?: string;
  imageSource?: any;
  tag?: string;
  gradient?: [string, string];
}

interface YouMightAlsoLikeProps {
  items: SuggestedItem[];
  title?: string;
  onItemPress: (id: string) => void;
  onViewAll?: () => void;
}

export const YouMightAlsoLike: React.FC<YouMightAlsoLikeProps> = ({
  items,
  title = 'You Might Also Like',
  onItemPress,
  onViewAll,
}) => {
  if (items.length === 0) return null;

  const defaultGradients: [string, string][] = [
    ['#667eea', '#764ba2'],
    ['#f093fb', '#f5576c'],
    ['#4facfe', '#00f2fe'],
    ['#43e97b', '#38f9d7'],
    ['#fa709a', '#fee140'],
  ];

  return (
    <View style={styles.container}>
      <View style={styles.sectionBox}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>{title}</Text>
          {onViewAll && (
            <TouchableOpacity onPress={onViewAll} activeOpacity={0.7}>
              <View style={styles.viewAllButton}>
                <Text style={styles.viewAllText}>View All</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.primary} />
              </View>
            </TouchableOpacity>
          )}
        </View>
        
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
        >
          {items.map((item, index) => {
            const gradient = item.gradient || defaultGradients[index % defaultGradients.length];
            
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.card}
                onPress={() => onItemPress(item.id)}
                activeOpacity={0.95}
              >
                <View style={styles.imageWrapper}>
                  <Image
                    source={item.imageSource || { uri: item.imageUrl || 'https://via.placeholder.com/300' }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                  <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.7)']}
                    style={styles.gradientOverlay}
                  />
                  
                  {item.tag && (
                    <View style={styles.tagContainer}>
                      <LinearGradient
                        colors={gradient}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        style={styles.tagGradient}
                      >
                        <Text style={styles.tagText}>{item.tag}</Text>
                      </LinearGradient>
                    </View>
                  )}
                  
                  <View style={styles.priceContainer}>
                    {item.originalPrice && (
                      <Text style={styles.originalPriceText}>{item.originalPrice}</Text>
                    )}
                    <Text style={styles.priceText}>{item.price}</Text>
                  </View>
                </View>
                
                <View style={styles.contentSection}>
                  <Text style={styles.itemTitle} numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text style={styles.itemDescription} numberOfLines={2}>
                    {item.description}
                  </Text>
                  
                  <LinearGradient
                    colors={gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.ctaButton}
                  >
                    <Text style={styles.ctaText}>Book Now</Text>
                  </LinearGradient>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  viewAllText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  scrollView: {
    marginHorizontal: -spacing.md,
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    gap: spacing.md,
  },
  card: {
    width: 220,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
  },
  imageWrapper: {
    width: '100%',
    height: 140,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '60%',
  },
  tagContainer: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
  },
  tagGradient: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: borderRadius.full,
  },
  tagText: {
    fontSize: 11,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  priceContainer: {
    position: 'absolute',
    bottom: spacing.sm,
    left: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  originalPriceText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    opacity: 0.8,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  priceText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '800',
    color: '#FFFFFF',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  contentSection: {
    padding: spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
  },
  itemTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.text.primary,
    marginBottom: spacing.xs / 2,
  },
  itemDescription: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.xs * 1.5,
    marginBottom: spacing.sm,
  },
  ctaButton: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.full,
    alignItems: 'center',
  },
  ctaText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
