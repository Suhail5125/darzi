# Cart Screen Testing Guide

## Current State: TESTING MODE ✅

The cart screen is currently configured for testing with mock items automatically added.

## New Cart Layout (Matching Reference Image)

The cart screen now follows this exact order:

1. **Glassmorphism Header** - Fixed at top with back, cart count, offers
2. **Pickup & Delivery Details** - Name, address, phone (changeable)
3. **Coupon Progress Bar** - "Shop for ₹X more to unlock coupon"
4. **Coupons & Offers Section** - Expandable with available coupons
5. **Delivery Time & Cart Items** - "Delivering in 12 mins" + item list
6. **Tip Selector** - Optional tip with presets
7. **Bill Summary** - Itemized breakdown
8. **Savings Highlight** - "Yay! You're saving ₹X"
9. **Delivery Instructions** - Optional special instructions
10. **Sticky Checkout Button** - "Pay Cash/UPI (on delivery)"

## Testing Mode Features

### Mock Items Added Automatically
When you open the cart screen, it will automatically add 3 mock items:
1. **Dry Cleaning** - ₹250 x 2 = ₹500
2. **Steam Pressing** - ₹80 x 3 = ₹240
3. **Expert Alterations** - ₹150 x 1 = ₹150

**Total Subtotal**: ₹890

### Empty State Disabled
The empty cart state is currently commented out so you can see the full cart UI with items.

## How to Test

### 1. Test Cart with Items
- Open the cart tab
- You'll see 3 items automatically added
- Test all features:
  - ✅ Quantity controls (+/-)
  - ✅ Remove items (trash icon)
  - ✅ Apply coupon codes (try: CLEAN50, ALTER30, PRESS25, BUNDLE40)
  - ✅ Select tip percentage (10%, 15%, 20%, 25%)
  - ✅ Enter custom tip
  - ✅ Add delivery instructions
  - ✅ View bill summary
  - ✅ Proceed to checkout

### 2. Test Coupon Codes
Valid test coupons:
- **CLEAN50** - 50% off (₹445 discount)
- **ALTER30** - 30% off (₹267 discount)
- **PRESS25** - 25% off (₹222.50 discount)
- **BUNDLE40** - 40% off (₹356 discount)

### 3. Test Add-ons
Horizontal scrolling add-ons:
- Starch - ₹50
- Press - ₹80
- Shoe Clean - ₹99
- Bag Clean - ₹150

### 4. Test Delivery Instructions
Quick select options:
- Leave at door
- Ring doorbell
- Call on arrival
- Meet at lobby

Or enter custom instructions (200 character limit)

## Switching to Production Mode

When you're done testing and want to enable the empty cart state:

### Step 1: Remove Mock Items
In `apps/mobile/src/app/(tabs)/cart.tsx`, find and **DELETE** this block:

```typescript
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
```

### Step 2: Enable Empty State
In the same file, find and **UNCOMMENT** this block:

```typescript
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
```

Remove the `/*` and `*/` to uncomment.

## Quick Toggle Commands

### Enable Testing Mode (Current)
```typescript
// Mock items: ENABLED
// Empty state: DISABLED
```

### Enable Production Mode
```typescript
// Mock items: DISABLED (deleted)
// Empty state: ENABLED (uncommented)
```

## Testing Checklist

- [ ] Cart header displays correctly with item count
- [ ] Gradient background renders smoothly
- [ ] Cart items display with correct info
- [ ] Quantity controls work (increment/decrement)
- [ ] Remove item works
- [ ] Address card displays
- [ ] Coupon code applies successfully
- [ ] Invalid coupon shows error
- [ ] Remove coupon works
- [ ] Recommended add-ons scroll horizontally
- [ ] Tip selector works (all 4 presets)
- [ ] Custom tip input works
- [ ] "No Tip" button works
- [ ] Delivery instructions save
- [ ] Quick select chips work
- [ ] Bill summary calculates correctly
- [ ] Discount shows in summary
- [ ] Savings card displays when coupon applied
- [ ] Trust signals display
- [ ] Checkout button works
- [ ] Loading state shows during checkout
- [ ] Success message after checkout
- [ ] Cart clears after successful checkout

## Known Test Scenarios

### Scenario 1: Full Cart Flow
1. Open cart (3 items auto-added)
2. Apply coupon "CLEAN50"
3. Select 15% tip
4. Add delivery instruction "Leave at door"
5. Proceed to checkout
6. Verify success message
7. Cart should clear

### Scenario 2: Modify Cart
1. Open cart
2. Increase quantity of Dry Cleaning to 5
3. Remove Steam Pressing
4. Add custom tip of ₹100
5. Verify bill summary updates correctly

### Scenario 3: Coupon Testing
1. Try invalid coupon "INVALID123" - should show error
2. Apply valid coupon "BUNDLE40" - should show success
3. Verify discount in bill summary
4. Remove coupon - discount should disappear

## Notes

- Mock items persist in AsyncStorage until cart is cleared
- Checkout clears the cart automatically
- You can manually clear cart by calling `cart.clearCart()`
- Refresh the app to reset cart if needed

## Troubleshooting

### Cart shows empty even with mock items
- Check if AsyncStorage has old data
- Clear app data and restart
- Verify useEffect is running

### Items not updating
- Check CartContext is properly connected
- Verify AsyncStorage permissions
- Check console for errors

### Checkout not working
- Verify CartContext methods are available
- Check network/API simulation delay
- Look for error messages in console

## Next Steps After Testing

1. Test on physical device
2. Test on different screen sizes
3. Test with real API integration
4. Add analytics tracking
5. Performance testing with many items
6. Accessibility testing with screen reader
7. Switch to production mode
8. Deploy to staging environment
