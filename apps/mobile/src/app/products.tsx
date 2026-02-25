import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, FlatList } from 'react-native';
import { useToast } from '../contexts/ToastContext';
import { colors, spacing, typography, borderRadius, shadows } from '../constants/theme';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
}

export default function ProductsScreen() {
  const { showToast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Care Products', 'Accessories', 'Tools'];

  const products: Product[] = [
    {
      id: '1',
      name: 'Fabric Protector Spray',
      description: 'Premium fabric protector that repels water and stains while maintaining breathability.',
      price: 24.99,
      category: 'Care Products',
      image: '🧴',
    },
    {
      id: '2',
      name: 'Delicate Garment Bag',
      description: 'Breathable garment bag perfect for storing and protecting delicate fabrics.',
      price: 19.99,
      category: 'Accessories',
      image: '👜',
    },
    {
      id: '3',
      name: 'Lint Roller Set',
      description: 'Professional-grade lint roller with 3 refill rolls for keeping garments pristine.',
      price: 12.99,
      category: 'Tools',
      image: '🧹',
    },
    {
      id: '4',
      name: 'Eco-Friendly Stain Remover',
      description: 'Biodegradable stain remover effective on tough stains without harsh chemicals.',
      price: 16.99,
      category: 'Care Products',
      image: '🧪',
    },
    {
      id: '5',
      name: 'Cedar Hanger Set',
      description: 'Set of 5 premium cedar hangers that naturally repel moths and freshen clothes.',
      price: 34.99,
      category: 'Accessories',
      image: '🪝',
    },
    {
      id: '6',
      name: 'Fabric Shaver',
      description: 'Electric fabric shaver removes pilling and fuzz to restore garment appearance.',
      price: 29.99,
      category: 'Tools',
      image: '⚡',
    },
    {
      id: '7',
      name: 'Garment Steamer',
      description: 'Portable garment steamer for quick wrinkle removal and fabric refreshing.',
      price: 49.99,
      category: 'Tools',
      image: '💨',
    },
    {
      id: '8',
      name: 'Wool Care Kit',
      description: 'Complete care kit for wool garments including wash, conditioner, and comb.',
      price: 39.99,
      category: 'Care Products',
      image: '🧶',
    },
  ];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  // Optimize FlatList with getItemLayout for better performance
  const getItemLayout = (_data: any, index: number) => {
    const itemHeight = 280; // Approximate height of product card
    const row = Math.floor(index / 2);
    return {
      length: itemHeight,
      offset: itemHeight * row,
      index,
    };
  };

  const handleAddToCart = (product: Product) => {
    showToast(`${product.name} added to cart!`, 'success');
  };

  const handleProductPress = (product: Product) => {
    Alert.alert(
      product.name,
      `${product.description}\n\nPrice: $${product.price.toFixed(2)}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Add to Cart', onPress: () => handleAddToCart(product) },
      ]
    );
  };

  const renderProductCard = ({ item }: { item: Product }) => (
    <View style={styles.productCardWrapper}>
      <TouchableOpacity
        style={styles.productCard}
        onPress={() => handleProductPress(item)}
        activeOpacity={0.7}
        accessibilityLabel={`${item.name}, $${item.price.toFixed(2)}`}
        accessibilityRole="button"
        accessibilityHint="Tap to view product details"
      >
        <View style={styles.productImageContainer}>
          <Text style={styles.productImage}>{item.image}</Text>
        </View>
        
        <View style={styles.productInfo}>
          <Text style={styles.productCategory}>{item.category}</Text>
          <Text style={styles.productName} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.productDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <View style={styles.productFooter}>
            <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={() => handleAddToCart(item)}
              activeOpacity={0.7}
              accessibilityLabel={`Add ${item.name} to cart`}
              accessibilityRole="button"
            >
              <Text style={styles.addToCartButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyStateIcon}>📦</Text>
      <Text style={styles.emptyStateTitle}>No Products Found</Text>
      <Text style={styles.emptyStateText}>
        No products match the selected category. Try selecting a different filter.
      </Text>
    </View>
  );

  const renderHeader = () => (
    <>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Products</Text>
        <Text style={styles.headerSubtitle}>
          Premium garment care products and accessories
        </Text>
      </View>

      {/* Category Filters */}
      <View style={styles.filtersSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContainer}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.filterChip,
                selectedCategory === category && styles.filterChipActive,
              ]}
              onPress={() => setSelectedCategory(category)}
              activeOpacity={0.7}
              accessibilityLabel={`Filter by ${category}`}
              accessibilityRole="button"
              accessibilityState={{ selected: selectedCategory === category }}
            >
              <Text
                style={[
                  styles.filterChipText,
                  selectedCategory === category && styles.filterChipTextActive,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredProducts}
        renderItem={renderProductCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        getItemLayout={getItemLayout}
        windowSize={5}
        maxToRenderPerBatch={10}
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
  listContent: {
    paddingBottom: spacing.xl,
  },
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  filtersSection: {
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  filtersContainer: {
    paddingHorizontal: spacing.lg,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  filterChipText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.primary,
    fontWeight: '500',
  },
  filterChipTextActive: {
    color: colors.background,
  },
  productCardWrapper: {
    width: '50%',
    padding: spacing.sm,
  },
  productCard: {
    flex: 1,
  },
  productImageContainer: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    ...shadows.sm,
  },
  productImage: {
    fontSize: 64,
  },
  productInfo: {
    flex: 1,
  },
  productCategory: {
    fontSize: typography.fontSize.xs,
    color: colors.text.secondary,
    textTransform: 'uppercase',
    marginBottom: spacing.xs,
  },
  productName: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  productDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    marginBottom: spacing.sm,
  },
  productFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productPrice: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.primary,
  },
  addToCartButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.md,
  },
  addToCartButtonText: {
    fontSize: typography.fontSize.sm,
    fontWeight: '600',
    color: colors.background,
  },
  emptyState: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  emptyStateIcon: {
    fontSize: 64,
    marginBottom: spacing.md,
  },
  emptyStateTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  emptyStateText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
});
