import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface CareTip {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl?: string;
  imageSource?: any;
  category: 'stain-removal' | 'fabric-care' | 'seasonal' | 'general';
}

interface CareTipsCarouselProps {
  tips: CareTip[];
  onTipPress?: (tip: CareTip) => void;
  onViewAll?: () => void;
}

const getCategoryColor = (category: CareTip['category']) => {
  switch (category) {
    case 'stain-removal':
      return '#EF4444';
    case 'fabric-care':
      return '#3B82F6';
    case 'seasonal':
      return '#F59E0B';
    case 'general':
      return '#10B981';
    default:
      return colors.primary;
  }
};

const getCategoryLabel = (category: CareTip['category']) => {
  switch (category) {
    case 'stain-removal':
      return 'Stain Removal';
    case 'fabric-care':
      return 'Fabric Care';
    case 'seasonal':
      return 'Seasonal';
    case 'general':
      return 'General';
    default:
      return category;
  }
};

export const CareTipsCarousel: React.FC<CareTipsCarouselProps> = ({ 
  tips, 
  onTipPress,
  onViewAll,
}) => {
  if (tips.length === 0) return null;

  const ITEM_HEIGHT = 100;
  const VISIBLE_ITEMS = 2.5;
  const CONTAINER_HEIGHT = ITEM_HEIGHT * VISIBLE_ITEMS;

  return (
    <View style={styles.container}>
      <View style={styles.sectionBox}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>Care Tips & Guides</Text>
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
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
          scrollEnabled={true}
          style={[styles.scrollView, { height: CONTAINER_HEIGHT, marginBottom: -spacing.md }]}
          contentContainerStyle={styles.scrollContent}
        >
          {tips.map((tip, index) => {
            const categoryColor = getCategoryColor(tip.category);
            const isLastItem = index === tips.length - 1;
            
            return (
              <TouchableOpacity
                key={tip.id}
                style={[styles.tipCard, isLastItem && styles.lastTipCard]}
                onPress={() => onTipPress?.(tip)}
                activeOpacity={0.9}
              >
                {/* Full card background image */}
                <Image
                  source={tip.imageSource || { uri: tip.imageUrl || 'https://via.placeholder.com/400x100' }}
                  style={styles.backgroundImage}
                  resizeMode="cover"
                />
                
                {/* Dark gradient overlay for text readability */}
                <LinearGradient
                  colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.7)']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.gradientOverlay}
                />
                
                {/* Category badge on left side */}
                <View style={[styles.categoryBadge, { backgroundColor: categoryColor }]}>
                  <Text style={styles.categoryText}>
                    {getCategoryLabel(tip.category)}
                  </Text>
                </View>
                
                {/* Content section overlaid on image */}
                <View style={styles.textContent}>
                  <Text style={styles.tipTitle} numberOfLines={2}>
                    {tip.title}
                  </Text>
                  
                  <Text style={styles.tipDescription} numberOfLines={2}>
                    {tip.description}
                  </Text>
                </View>
                
                {/* Arrow indicator on right, vertically centered */}
                <View style={styles.arrowContainer}>
                  <Ionicons name="chevron-forward" size={24} color="#FFFFFF" />
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
    marginBottom: 0, // No margin at bottom - goes right to tab bar
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
    // height set dynamically
  },
  scrollContent: {
    gap: spacing.sm,
    paddingBottom: spacing.md, // Add padding at bottom so last card aligns properly
  },
  tipCard: {
    height: 100,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  lastTipCard: {
    marginBottom: 0,
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  gradientOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  categoryBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderTopRightRadius: borderRadius.lg,
    borderBottomLeftRadius: borderRadius.md,
  },
  categoryText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  textContent: {
    position: 'absolute',
    left: spacing.md,
    right: 60,
    top: '50%',
    transform: [{ translateY: -20 }],
  },
  tipTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: spacing.xs / 2,
    lineHeight: typography.fontSize.base * 1.3,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  tipDescription: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: '#FFFFFF',
    lineHeight: typography.fontSize.xs * 1.4,
    opacity: 0.95,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  arrowContainer: {
    position: 'absolute',
    right: spacing.md,
    top: '50%',
    marginTop: -12,
  },
});
