import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Service, ServiceCategory } from '../types';
import { colors, typography, spacing, shadows, borderRadius } from '../constants/theme';
import { Button } from '../components/shared/Button';

// Mock service data
const MOCK_SERVICES: Service[] = [
  {
    id: '1',
    title: 'Dry Cleaning',
    category: 'Cleaning',
    description: 'Professional dry cleaning for delicate garments',
    features: ['Eco-friendly solvents', 'Stain removal', '48-hour turnaround'],
    price: 15.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '2',
    title: 'Shirt Pressing',
    category: 'Finishing',
    description: 'Expert pressing and finishing for shirts',
    features: ['Crisp finish', 'Collar shaping', 'Same-day service'],
    price: 5.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '3',
    title: 'Alterations',
    category: 'Tailoring',
    description: 'Custom alterations by master tailors',
    features: ['Perfect fit', 'Expert craftsmanship', 'Quick turnaround'],
    price: 25.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '4',
    title: 'Suit Cleaning',
    category: 'Cleaning',
    description: 'Specialized cleaning for suits and formal wear',
    features: ['Gentle care', 'Shape retention', 'Premium service'],
    price: 29.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '5',
    title: 'Hemming',
    category: 'Tailoring',
    description: 'Professional hemming for pants and dresses',
    features: ['Precise measurements', 'Hand-stitched', 'Fast service'],
    price: 12.99,
    image: 'https://via.placeholder.com/300x200',
  },
  {
    id: '6',
    title: 'Steam Pressing',
    category: 'Finishing',
    description: 'Gentle steam pressing for all fabrics',
    features: ['Wrinkle removal', 'Fabric care', 'Quick service'],
    price: 8.99,
    image: 'https://via.placeholder.com/300x200',
  },
];

const CATEGORIES: Array<'All' | ServiceCategory> = ['All', 'Cleaning', 'Finishing', 'Tailoring'];

export default function ServicesScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<'All' | ServiceCategory>('All');

  const filteredServices = selectedCategory === 'All'
    ? MOCK_SERVICES
    : MOCK_SERVICES.filter(service => service.category === selectedCategory);

  // Optimize FlatList with getItemLayout for better performance
  const getItemLayout = (_data: any, index: number) => ({
    length: 400, // Approximate height of service card (200px image + 200px content)
    offset: 400 * index + (spacing.lg * index), // Include gap
    index,
  });

  const renderServiceCard = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceCard}
      onPress={() => router.push(`/booking?serviceId=${item.id}`)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: item.image }} style={styles.serviceImage} />
      <View style={styles.serviceContent}>
        <View style={styles.serviceHeader}>
          <Text style={styles.serviceTitle}>{item.title}</Text>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        </View>
        <Text style={styles.serviceDescription}>{item.description}</Text>
        <View style={styles.featuresContainer}>
          {item.features.map((feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text style={styles.checkmark}>✓</Text>
              <Text style={styles.featureText}>{feature}</Text>
            </View>
          ))}
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Starting at</Text>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Our Services</Text>
        <Text style={styles.headerSubtitle}>Choose from our range of garment care services</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {CATEGORIES.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.filterButton,
              selectedCategory === category && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedCategory(category)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                styles.filterText,
                selectedCategory === category && styles.filterTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <FlatList
        data={filteredServices}
        renderItem={renderServiceCard}
        keyExtractor={(item) => item.id}
        getItemLayout={getItemLayout}
        windowSize={5}
        maxToRenderPerBatch={5}
        updateCellsBatchingPeriod={50}
        removeClippedSubviews={true}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  filterContainer: {
    maxHeight: 60,
    backgroundColor: colors.background,
  },
  filterContent: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  filterButton: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },
  filterButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.secondary,
  },
  filterTextActive: {
    color: colors.background,
  },
  listContent: {
    padding: spacing.lg,
    gap: spacing.lg,
  },
  serviceCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    ...shadows.md,
  },
  serviceImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surface,
  },
  serviceContent: {
    padding: spacing.lg,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: spacing.sm,
  },
  serviceTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.text.primary,
    flex: 1,
  },
  categoryBadge: {
    backgroundColor: colors.secondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    marginLeft: spacing.sm,
  },
  categoryText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.medium,
    color: colors.background,
  },
  serviceDescription: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  featuresContainer: {
    marginBottom: spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  checkmark: {
    fontSize: typography.fontSize.base,
    color: colors.success,
    marginRight: spacing.sm,
  },
  featureText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.sm,
  },
  priceLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.regular,
    color: colors.text.secondary,
  },
  price: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.bold,
    color: colors.primary,
  },
});
