import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from '../../components/shared';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';

// Service categories with pricing
const SERVICES = [
  {
    id: 'pressing',
    name: 'Pressing',
    icon: 'shirt-outline',
    color: '#4A90E2',
    items: [
      { id: 'pressing-shirt', name: 'Shirt', price: 10 },
      { id: 'pressing-pant', name: 'Pant', price: 10 },
      { id: 'pressing-kurta', name: 'Kurta', price: 30 },
      { id: 'pressing-saree', name: 'Saree', price: 50 },
      { id: 'pressing-suit', name: 'Suit (2 Piece)', price: 80 },
      { id: 'pressing-blazer', name: 'Blazer', price: 40 },
      { id: 'pressing-dress', name: 'Dress', price: 35 },
      { id: 'pressing-tshirt', name: 'T-Shirt', price: 8 },
    ],
  },
  {
    id: 'dry-cleaning',
    name: 'Dry Cleaning',
    icon: 'water-outline',
    color: '#50C878',
    items: [
      { id: 'dc-shirt', name: 'Shirt', price: 40 },
      { id: 'dc-pant', name: 'Pant', price: 50 },
      { id: 'dc-kurta', name: 'Kurta', price: 80 },
      { id: 'dc-saree', name: 'Saree', price: 150 },
      { id: 'dc-suit', name: 'Suit (2 Piece)', price: 250 },
      { id: 'dc-blazer', name: 'Blazer', price: 120 },
      { id: 'dc-dress', name: 'Dress', price: 100 },
      { id: 'dc-coat', name: 'Coat', price: 180 },
      { id: 'dc-sherwani', name: 'Sherwani', price: 200 },
    ],
  },
  {
    id: 'washing',
    name: 'Washing',
    icon: 'water',
    color: '#9B59B6',
    items: [
      { id: 'wash-shirt', name: 'Shirt', price: 25 },
      { id: 'wash-pant', name: 'Pant', price: 30 },
      { id: 'wash-kurta', name: 'Kurta', price: 40 },
      { id: 'wash-tshirt', name: 'T-Shirt', price: 20 },
      { id: 'wash-jeans', name: 'Jeans', price: 35 },
      { id: 'wash-bedsheet', name: 'Bedsheet', price: 60 },
      { id: 'wash-towel', name: 'Towel', price: 15 },
    ],
  },
  {
    id: 'alteration',
    name: 'Alteration',
    icon: 'cut-outline',
    color: '#E74C3C',
    items: [
      { id: 'alt-shirt', name: 'Shirt Fitting', price: 80 },
      { id: 'alt-pant', name: 'Pant Fitting', price: 100 },
      { id: 'alt-kurta', name: 'Kurta Fitting', price: 120 },
      { id: 'alt-dress', name: 'Dress Fitting', price: 150 },
      { id: 'alt-zipper', name: 'Zipper Replacement', price: 60 },
      { id: 'alt-button', name: 'Button Replacement', price: 30 },
      { id: 'alt-hem', name: 'Hemming', price: 50 },
    ],
  },
  {
    id: 'starch',
    name: 'Starch',
    icon: 'sparkles-outline',
    color: '#F39C12',
    items: [
      { id: 'starch-shirt', name: 'Shirt', price: 15 },
      { id: 'starch-kurta', name: 'Kurta', price: 25 },
      { id: 'starch-saree', name: 'Saree', price: 40 },
    ],
  },
];

export default function ExploreScreen() {
  const router = useRouter();
  const cart = useCart();
  const { showToast } = useToast();
  const [selectedService, setSelectedService] = useState(SERVICES[0].id);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const currentService = SERVICES.find(s => s.id === selectedService) || SERVICES[0];

  const handleQuantityChange = (itemId: string, delta: number) => {
    const currentQty = quantities[itemId] || 0;
    const newQty = Math.max(0, currentQty + delta);
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: newQty,
    }));
  };

  const handleAddToCart = () => {
    let itemsAdded = 0;
    
    Object.entries(quantities).forEach(([itemId, quantity]) => {
      if (quantity > 0) {
        const service = SERVICES.find(s => s.items.some(i => i.id === itemId));
        const item = service?.items.find(i => i.id === itemId);
        
        if (service && item) {
          cart.addItem({
            serviceId: itemId,
            serviceName: `${service.name} - ${item.name}`,
            description: `${service.name} service for ${item.name}`,
            price: item.price,
            quantity: quantity,
          });
          itemsAdded++;
        }
      }
    });

    if (itemsAdded > 0) {
      showToast(`${itemsAdded} item(s) added to cart`, 'success');
      setQuantities({});
    } else {
      showToast('Please select at least one item', 'info');
    }
  };

  const getTotalItems = () => {
    return Object.values(quantities).reduce((sum, qty) => sum + qty, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(quantities).reduce((sum, [itemId, quantity]) => {
      const service = SERVICES.find(s => s.items.some(i => i.id === itemId));
      const item = service?.items.find(i => i.id === itemId);
      return sum + (item?.price || 0) * quantity;
    }, 0);
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <LinearGradient
        colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />
      
      <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBackground} />
          
          <View style={styles.headerContent}>
            {/* Left - Empty */}
            <View style={styles.headerLeft} />

            {/* Center - Title */}
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Our Services</Text>
              </BlurView>
            ) : (
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>Our Services</Text>
              </View>
            )}

            {/* Right - Cart Icon */}
            <View style={styles.headerRight}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="light" style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => router.push('/(tabs)/cart')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cart-outline" size={24} color={colors.primary} />
                    {cart.itemCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cart.itemCount}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </BlurView>
              ) : (
                <View style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => router.push('/(tabs)/cart')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="cart-outline" size={24} color={colors.primary} />
                    {cart.itemCount > 0 && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{cart.itemCount}</Text>
                      </View>
                    )}
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Header Spacer */}
        <View style={styles.headerSpacer} />

        {/* Service Category Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabsContainer}
          contentContainerStyle={styles.tabsContent}
        >
          {SERVICES.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={[
                styles.tab,
                selectedService === service.id && styles.tabActive,
              ]}
              onPress={() => setSelectedService(service.id)}
              activeOpacity={0.7}
            >
              <Ionicons
                name={service.icon as any}
                size={20}
                color={selectedService === service.id ? '#FFFFFF' : service.color}
              />
              <Text
                style={[
                  styles.tabText,
                  selectedService === service.id && styles.tabTextActive,
                ]}
              >
                {service.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Pricing List */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.priceListContainer}>
            {currentService.items.map((item, index) => (
              <View
                key={item.id}
                style={[
                  styles.priceItem,
                  index === currentService.items.length - 1 && styles.priceItemLast,
                ]}
              >
                <View style={styles.priceItemLeft}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemPrice}>₹{item.price}</Text>
                </View>
                
                <View style={styles.quantityControl}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, -1)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="remove" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>
                    {quantities[item.id] || 0}
                  </Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, 1)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="add" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>

          {/* Info Section */}
          <View style={styles.infoSection}>
            <View style={styles.infoCard}>
              <Ionicons name="time-outline" size={24} color={colors.primary} />
              <Text style={styles.infoTitle}>Quick Turnaround</Text>
              <Text style={styles.infoText}>
                Most services completed within 24-48 hours
              </Text>
            </View>
            
            <View style={styles.infoCard}>
              <Ionicons name="shield-checkmark-outline" size={24} color={colors.primary} />
              <Text style={styles.infoTitle}>Quality Guaranteed</Text>
              <Text style={styles.infoText}>
                100% satisfaction or your money back
              </Text>
            </View>
          </View>

          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* Sticky Add to Cart Button */}
        {getTotalItems() > 0 && (
          <View style={styles.addToCartContainer}>
            <TouchableOpacity
              style={styles.addToCartButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#4A6FA5', '#2E5A8F']}
                style={styles.addToCartGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <View style={styles.addToCartContent}>
                  <View style={styles.addToCartLeft}>
                    <Text style={styles.addToCartItems}>
                      {getTotalItems()} {getTotalItems() === 1 ? 'Item' : 'Items'}
                    </Text>
                    <Text style={styles.addToCartPrice}>₹{getTotalPrice()}</Text>
                  </View>
                  <View style={styles.addToCartRight}>
                    <Text style={styles.addToCartText}>Add to Cart</Text>
                    <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                  </View>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    paddingTop: Platform.OS === 'ios' ? 44 : StatusBar.currentHeight || 0,
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(74, 111, 165, 1)',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  headerLeft: {
    width: 44,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  iconTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    backgroundColor: '#E74C3C',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    height: 40,
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  headerTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  headerRight: {
    width: 44,
    alignItems: 'flex-end',
  },
  headerSpacer: {
    height: Platform.OS === 'ios' ? 100 : 80,
  },
  tabsContainer: {
    maxHeight: 60,
  },
  tabsContent: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    gap: spacing.sm,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: 'rgba(74, 111, 165, 0.2)',
    marginRight: spacing.sm,
  },
  tabActive: {
    backgroundColor: '#4A6FA5',
    borderColor: '#4A6FA5',
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.primary,
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: spacing.md,
    paddingHorizontal: spacing.md,
  },
  priceListContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  priceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(74, 111, 165, 0.1)',
  },
  priceItemLast: {
    borderBottomWidth: 0,
  },
  priceItemLeft: {
    flex: 1,
  },
  itemName: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.primary,
    fontWeight: '600',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  quantityButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.primary,
    minWidth: 30,
    textAlign: 'center',
  },
  infoSection: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  infoCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    alignItems: 'center',
  },
  infoTitle: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.primary,
    marginTop: spacing.xs,
    marginBottom: 4,
    textAlign: 'center',
  },
  infoText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.xs * 1.4,
  },
  bottomPadding: {
    height: 100,
  },
  addToCartContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 111, 165, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  addToCartButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  addToCartGradient: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  addToCartContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addToCartLeft: {
    flex: 1,
  },
  addToCartItems: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  addToCartPrice: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  addToCartRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  addToCartText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
