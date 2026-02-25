import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Card } from '../shared/Card';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating?: number;
  avatar?: string;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - spacing.xl * 2;
const CARD_SPACING = spacing.md;

export const TestimonialCarousel: React.FC<TestimonialCarouselProps> = ({ testimonials }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const index = Math.round(scrollPosition / (CARD_WIDTH + CARD_SPACING));
    setActiveIndex(index);
  };

  const renderTestimonial = ({ item }: { item: Testimonial }) => (
    <View style={styles.cardWrapper}>
      <Card style={styles.card}>
        <Text style={styles.text}>"{item.text}"</Text>
        <View style={styles.footer}>
          <Text style={styles.name}>{item.name}</Text>
          {item.rating && (
            <View style={styles.ratingContainer}>
              {Array.from({ length: 5 }).map((_, index) => (
                <Text key={index} style={styles.star}>
                  {index < item.rating! ? '★' : '☆'}
                </Text>
              ))}
            </View>
          )}
        </View>
      </Card>
    </View>
  );

  const renderPaginationDots = () => (
    <View style={styles.pagination}>
      {testimonials.map((_, index) => (
        <View
          key={index}
          style={[
            styles.dot,
            index === activeIndex && styles.activeDot,
          ]}
        />
      ))}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={testimonials}
        renderItem={renderTestimonial}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + CARD_SPACING}
        decelerationRate="fast"
        onScroll={handleScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.listContent}
      />
      {renderPaginationDots()}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.lg,
  },
  listContent: {
    paddingHorizontal: spacing.xl,
  },
  cardWrapper: {
    width: CARD_WIDTH,
    marginRight: CARD_SPACING,
  },
  card: {
    padding: spacing.lg,
    minHeight: 150,
  },
  text: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.primary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    fontStyle: 'italic',
    marginBottom: spacing.md,
  },
  footer: {
    marginTop: 'auto',
  },
  name: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: typography.fontSize.base,
    color: colors.accent,
    marginRight: 2,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
    width: 24,
  },
});
