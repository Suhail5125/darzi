import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, StatusBar, KeyboardAvoidingView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useCart } from '../../contexts/CartContext';
import { useToast } from '../../contexts/ToastContext';
import {
  CartItem,
  CartSummary,
  TipSelector,
  DeliveryInstructions,
  EmptyCart,
  PickupDeliveryCard,
  CouponsOffersSection,
  SavingsHighlight,
} from '../../components/cart';
import { SafeAreaView } from '../../components/shared';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

export default function CartScreen() {
  const router = useRouter();
  const cart = useCart();
  const { showToast } = useToast();
  
  // User details
  const [userName, setUserName] = useState('Rajesh Kumar');
  const [deliveryAddress, setDeliveryAddress] = useState('41-A, Asif Agency, Shipai Mohalla, Jaipur');
  const [pickupInstructions, setPickupInstructions] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // Available coupons
  const availableCoupons = [
    {
      code: 'CLEAN50',
      title: 'Save ₹50 with CLEAN50',
      description: '50% off on dry cleaning services',
      discount: 0.5,
    },
    {
      code: 'ALTER30',
      title: 'Save ₹30 with ALTER30',
      description: '30% off on alteration services',
      discount: 0.3,
    },
    {
      code: 'PRESS25',
      title: 'Save ₹25 with PRESS25',
      description: '25% off on pressing services',
      discount: 0.25,
    },
  ];

  // TESTING: Add mock items to cart on mount (remove this later)
  React.useEffect(() => {
    if (cart.items.length === 0) {
      // Add mock items for testing
      cart.addItem({
        serviceId: 'dry-cleaning',
        serviceName: 'Dry Cleaning',
        description: 'Professional solvent cleaning for delicate fabrics',
        price: 250,
        quantity: 2,
      });
      cart.addItem({
        serviceId: 'pressing',
        serviceName: 'Steam Pressing',
        description: 'Crisp, wrinkle-free finish for your daily wear',
        price: 80,
        quantity: 3,
      });
      cart.addItem({
        serviceId: 'alteration',
        serviceName: 'Expert Alterations',
        description: 'Precision adjustments to your existing wardrobe',
        price: 150,
        quantity: 1,
      });
    }
  }, []);

  const handleApplyCoupon = (code: string) => {
    // Mock coupon validation
    const validCoupons: Record<string, number> = {
      'CLEAN50': 0.5,
      'ALTER30': 0.3,
      'PRESS25': 0.25,
      'BUNDLE40': 0.4,
    };

    if (validCoupons[code]) {
      const discountAmount = cart.subtotal * validCoupons[code];
      setAppliedCoupon(code);
      setDiscount(discountAmount);
      showToast(`Coupon "${code}" applied! You saved ₹${discountAmount.toFixed(0)}`, 'success');
    } else {
      showToast('Invalid coupon code', 'error');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setDiscount(0);
    showToast('Coupon removed', 'info');
  };

  const handleCheckout = async () => {
    try {
      setIsCheckingOut(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      showToast('Order placed successfully!', 'success');
      cart.clearCart();
      router.push('/dashboard');
    } catch (error) {
      showToast('Checkout failed. Please try again.', 'error');
      console.error('Checkout error:', error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleChangeAddress = () => {
    showToast('Address selection coming soon', 'info');
  };

  const handleOffersPress = () => {
    showToast('Available offers coming soon', 'info');
  };

  // Calculate final total with discount
  const finalTotal = cart.total - discount;

  // TESTING: Temporarily disabled empty state check
  // Uncomment this block later to show empty state when cart is empty
  /*
  if (cart.items.length === 0) {
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#4A6FA5', '#98C1D9', '#FFFFFF']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        <SafeAreaView edges={['left', 'right']} style={styles.safeArea}>
          <EmptyCart
            onBrowseServices={() => router.push('/(tabs)/explore')}
            onViewOrders={() => router.push('/dashboard')}
          />
        </SafeAreaView>
      </View>
    );
  }
  */

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
        <KeyboardAvoidingView 
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
        >
        {/* Glassmorphism Header */}
        <View style={styles.headerContainer}>
          <View style={styles.headerBackground} />
          
          <View style={styles.headerContent}>
            {/* Left - Empty Space (no back button) */}
            <View style={styles.headerLeft} />

            {/* Center - Title with item count */}
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.titleContainer}>
                <Text style={styles.headerTitle}>My Cart ({cart.itemCount})</Text>
              </BlurView>
            ) : (
              <View style={styles.titleContainer}>
                <Text style={styles.headerTitle}>My Cart ({cart.itemCount})</Text>
              </View>
            )}

            {/* Right - Order History Icon */}
            <View style={styles.headerRight}>
              {Platform.OS === 'ios' ? (
                <BlurView intensity={80} tint="light" style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => router.push('/dashboard')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="receipt-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </BlurView>
              ) : (
                <View style={styles.iconButton}>
                  <TouchableOpacity
                    onPress={() => router.push('/dashboard')}
                    style={styles.iconTouchable}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="receipt-outline" size={24} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>
        
        {/* Header Spacer */}
        <View style={styles.headerSpacer} />
        
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
        >
          {/* 1. Pickup & Delivery Details - Compact Single Line */}
          <View style={styles.section}>
            <PickupDeliveryCard
              name={userName}
              address={deliveryAddress}
              onEdit={handleChangeAddress}
            />
          </View>

          {/* 2. Coupons & Offers Section */}
          <View style={styles.section}>
            <CouponsOffersSection
              availableCoupons={availableCoupons}
              appliedCoupon={appliedCoupon}
              onApplyCoupon={handleApplyCoupon}
              onRemoveCoupon={handleRemoveCoupon}
            />
          </View>

          {/* 3. Cart Items - All in Single Container */}
          <View style={styles.section}>
            <View style={styles.cartItemsContainer}>
              {cart.items.map((item, index) => (
                <CartItem
                  key={item.id}
                  item={item}
                  onQuantityChange={cart.updateQuantity}
                  onRemove={(id) => {
                    cart.removeItem(id);
                    showToast('Item removed from cart', 'info');
                  }}
                />
              ))}
            </View>
            
            {/* Add More Items Link */}
            <TouchableOpacity
              style={styles.addMoreButton}
              onPress={() => router.push('/(tabs)/explore')}
              activeOpacity={0.7}
            >
              <Text style={styles.addMoreText}>Forgot something? </Text>
              <Text style={styles.addMoreLink}>Add More Items</Text>
            </TouchableOpacity>
          </View>

          {/* 4. Tip Selector */}
          <View style={styles.section}>
            <TipSelector
              selectedTip={cart.tip}
              onTipChange={cart.updateTip}
              subtotal={cart.subtotal}
            />
          </View>

          {/* 5. Bill Summary */}
          <View style={styles.section}>
            <CartSummary
              subtotal={cart.subtotal}
              tip={cart.tip}
              deliveryFee={cart.deliveryFee}
              discount={discount}
              total={finalTotal}
            />
          </View>

          {/* 6. Savings Highlight */}
          {discount > 0 && (
            <View style={styles.section}>
              <SavingsHighlight amount={discount} />
            </View>
          )}

          {/* 7. Delivery Instructions with Tabs */}
          <View style={styles.section}>
            <DeliveryInstructions
              pickupInstructions={pickupInstructions}
              deliveryInstructions={deliveryInstructions}
              onPickupInstructionsChange={setPickupInstructions}
              onDeliveryInstructionsChange={setDeliveryInstructions}
            />
          </View>

          {/* Bottom padding for sticky button */}
          <View style={styles.bottomPadding} />
        </ScrollView>

        {/* 9. Sticky Checkout Button */}
        <View style={styles.checkoutContainer}>
          <TouchableOpacity
            style={[styles.checkoutButton, isCheckingOut && styles.checkoutButtonDisabled]}
            onPress={handleCheckout}
            disabled={isCheckingOut}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={isCheckingOut ? ['#9CA3AF', '#6B7280'] : ['#4A6FA5', '#2E5A8F']}
              style={styles.checkoutGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <View style={styles.checkoutContent}>
                <View style={styles.checkoutLeft}>
                  <Text style={styles.checkoutLabel}>Total Amount</Text>
                  <Text style={styles.checkoutAmount}>₹{finalTotal.toFixed(0)}</Text>
                </View>
                <View style={styles.checkoutRight}>
                  <Text style={styles.checkoutButtonText}>
                    {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                  </Text>
                  <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        </KeyboardAvoidingView>
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
  keyboardAvoid: {
    flex: 1,
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
    alignItems: 'flex-start',
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
  scrollView: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  contentContainer: {
    paddingTop: 28,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  cartItemsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
  },
  addMoreButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  addMoreText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
  },
  addMoreLink: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  bottomPadding: {
    height: spacing.xl,
  },
  checkoutContainer: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 111, 165, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  checkoutButton: {
    borderRadius: borderRadius.md,
    overflow: 'hidden',
  },
  checkoutButtonDisabled: {
    opacity: 0.6,
  },
  checkoutGradient: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  checkoutContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  checkoutLeft: {
    flex: 1,
  },
  checkoutLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  checkoutAmount: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  checkoutRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  checkoutButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
