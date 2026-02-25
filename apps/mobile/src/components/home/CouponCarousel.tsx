import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface Coupon {
  id: string;
  code: string;
  title: string;
  subtitle?: string;
  discount: string;
  color: string;
  imageSource: any; // Local image require()
  features?: string[];
}

interface CouponCarouselProps {
  coupons: Coupon[];
  onCouponPress?: (coupon: Coupon) => void;
  autoScrollInterval?: number;
}

const { width } = Dimensions.get('window');
const CARD_MARGIN = spacing.md; // Same as address strip horizontal padding
const CARD_WIDTH = width - (CARD_MARGIN * 2);
const CARD_HEIGHT = 180;
const CARD_SPACING = spacing.md;

export const CouponCarousel: React.FC<CouponCarouselProps> = ({
  coupons,
  onCouponPress,
  autoScrollInterval = 3500,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoScrollTimer = useRef<NodeJS.Timeout | null>(null);
  const isScrolling = useRef(false);

  // Continuous auto-scroll (1→2→3→4→1→2→3...)
  useEffect(() => {
    if (coupons.length <= 1) return;

    const startAutoScroll = () => {
      autoScrollTimer.current = setInterval(() => {
        if (!isScrolling.current && scrollViewRef.current) {
          setActiveIndex((prevIndex) => {
            const nextIndex = (prevIndex + 1) % coupons.length;
            const scrollX = nextIndex * (CARD_WIDTH + CARD_SPACING);
            
            scrollViewRef.current?.scrollTo({
              x: scrollX,
              animated: true,
            });
            
            return nextIndex;
          });
        }
      }, autoScrollInterval);
    };

    startAutoScroll();

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, [coupons.length, autoScrollInterval]);

  const handleScrollBeginDrag = () => {
    isScrolling.current = true;
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
  };

  const handleMomentumScrollEnd = (event: any) => {
    isScrolling.current = false;
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    
    // Update active index based on scroll position
    const clampedIndex = Math.max(0, Math.min(index, coupons.length - 1));
    setActiveIndex(clampedIndex);

    // Restart auto-scroll after manual scroll
    if (autoScrollTimer.current) {
      clearInterval(autoScrollTimer.current);
    }
    autoScrollTimer.current = setInterval(() => {
      if (!isScrolling.current && scrollViewRef.current) {
        setActiveIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % coupons.length;
          const scrollX = nextIndex * (CARD_WIDTH + CARD_SPACING);
          
          scrollViewRef.current?.scrollTo({
            x: scrollX,
            animated: true,
          });
          
          return nextIndex;
        });
      }
    }, autoScrollInterval);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled={false}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        snapToAlignment="center"
        contentContainerStyle={styles.scrollContent}
        onScrollBeginDrag={handleScrollBeginDrag}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        scrollEventThrottle={16}
      >
        {coupons.map((coupon, index) => (
          <TouchableOpacity
            key={coupon.id}
            activeOpacity={0.9}
            onPress={() => onCouponPress?.(coupon)}
            style={[
              styles.card,
              { backgroundColor: coupon.color },
              index === coupons.length - 1 && styles.lastCard,
            ]}
          >
            {/* Left Content - 60% */}
            <View style={styles.leftContent}>
              {/* Discount Badge */}
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{coupon.discount}</Text>
              </View>

              {/* Title */}
              <Text style={styles.title} numberOfLines={2}>
                {coupon.title}
              </Text>

              {/* Subtitle */}
              {coupon.subtitle && (
                <Text style={styles.subtitle} numberOfLines={1}>
                  {coupon.subtitle}
                </Text>
              )}

              {/* Features */}
              {coupon.features && coupon.features.length > 0 && (
                <Text style={styles.features} numberOfLines={1}>
                  {coupon.features.join(', ')}
                </Text>
              )}

              {/* Code Badge */}
              <View style={styles.codeContainer}>
                <Text style={styles.codeText}>CODE: {coupon.code}</Text>
              </View>
            </View>

            {/* Right Content - 40% */}
            <View style={styles.rightContent}>
              <Image
                source={coupon.imageSource}
                style={styles.productImage}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Pagination Dots */}
      {coupons.length > 1 && (
        <View style={styles.pagination}>
          {coupons.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                index === activeIndex && styles.activeDot,
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.xs, // Gap of 4 units before action bar
    marginTop: 10, // Gap of 10 units from top
  },
  scrollContent: {
    paddingHorizontal: CARD_MARGIN,
    gap: CARD_SPACING,
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: borderRadius.xl,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  lastCard: {
    marginRight: 0,
  },
  leftContent: {
    flex: 0.6,
    padding: spacing.md + 2,
    justifyContent: 'space-between',
  },
  discountBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs - 3,
    borderRadius: borderRadius.sm,
  },
  discountText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: colors.primary,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.serif,
    fontWeight: 'bold',
    color: '#fff',
    lineHeight: typography.fontSize.xl * 1.25,
    marginTop: spacing.xs,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: spacing.xs / 2,
  },
  features: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: spacing.xs / 2,
  },
  codeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.15)',
    paddingHorizontal: spacing.sm - 2,
    paddingVertical: spacing.xs - 3,
    borderRadius: borderRadius.sm,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
    marginTop: spacing.xs,
  },
  codeText: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#fff',
    letterSpacing: 0.5,
  },
  rightContent: {
    flex: 0.4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: spacing.xs,
  },
  productImage: {
    width: '100%',
    height: '85%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.sm,
    gap: 4,
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.mutedForeground,
    opacity: 0.25,
  },
  activeDot: {
    width: 18,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.primary,
    opacity: 1,
  },
});
