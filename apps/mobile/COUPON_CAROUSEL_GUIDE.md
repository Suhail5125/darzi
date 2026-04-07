# Coupon Carousel Component Guide

## Overview
A beautiful, swipeable carousel component for displaying special offers and coupons to logged-in users. Replaces the hero section on the home screen for authenticated users.

## Visual Design

```
┌─────────────────────────────────────────────────┐
│  Special Offers                    View All →   │
│  Limited time deals just for you                │
├─────────────────────────────────────────────────┤
│                                                  │
│  ┌──────────────────────────────────────────┐  │
│  │  🎁                          50% OFF     │  │
│  │                                           │  │
│  │  First Order Special                     │  │
│  │  Get 50% off on your first order         │  │
│  │                                           │  │
│  │  ┌─────────────────────────┐             │  │
│  │  │ CODE: FIRST50           │             │  │
│  │  └─────────────────────────┘             │  │
│  │  ⏰ Valid till Mar 31                    │  │
│  │                                           │  │
│  │  [Apply Now →]                           │  │
│  └──────────────────────────────────────────┘  │
│                                                  │
│              ● ━━━━ ○ ○ ○                      │  ← Pagination
└─────────────────────────────────────────────────┘
```

## Features

### 1. Header Section
- **Title**: "Special Offers"
- **Subtitle**: "Limited time deals just for you"
- **View All Button**: Navigate to all offers

### 2. Coupon Cards
Each card displays:
- **Icon**: Visual indicator (gift, flower, car, etc.)
- **Discount Badge**: Prominent discount amount
- **Title**: Offer name
- **Description**: Brief offer details
- **Coupon Code**: Dashed border container with code
- **Validity**: Expiration date with clock icon
- **Apply Button**: White button with arrow

### 3. Card Design Elements
- **Colorful Background**: Each card has unique color
- **Decorative Circles**: Subtle background patterns
- **Dashed Border**: Coupon-style appearance
- **Shadows**: Elevated card effect
- **Rounded Corners**: Modern, friendly look

### 4. Interaction
- **Horizontal Scroll**: Swipe through offers
- **Snap to Card**: Smooth pagination
- **Pagination Dots**: Visual indicator of position
- **Tap to Apply**: Quick coupon application

## Component Props

```typescript
interface Coupon {
  id: string;
  code: string;              // Coupon code (e.g., "FIRST50")
  title: string;             // Offer title
  description: string;       // Offer description
  discount: string;          // Display text (e.g., "50% OFF")
  validUntil: string;        // Expiry date (e.g., "Mar 31")
  color: string;             // Card background color
  icon?: string;             // Ionicons name (optional)
}

interface CouponCarouselProps {
  coupons: Coupon[];
  onCouponPress?: (coupon: Coupon) => void;
}
```

## Usage

### Basic Usage
```tsx
import { CouponCarousel, Coupon } from '../components/home';

const coupons: Coupon[] = [
  {
    id: '1',
    code: 'FIRST50',
    title: 'First Order Special',
    description: 'Get 50% off on your first dry cleaning order',
    discount: '50% OFF',
    validUntil: 'Mar 31',
    color: '#667eea',
    icon: 'gift',
  },
  // ... more coupons
];

<CouponCarousel
  coupons={coupons}
  onCouponPress={(coupon) => {
    console.log('Coupon pressed:', coupon);
    // Apply coupon or navigate to details
  }}
/>
```

### In Home Screen
```tsx
{isAuthenticated ? (
  <CouponCarousel coupons={MOCK_COUPONS} onCouponPress={handleCouponPress} />
) : (
  <HeroSection {...heroProps} />
)}
```

## Color Palette

Suggested colors for different offer types:

```typescript
// Premium/Luxury
color: '#667eea' // Purple

// Seasonal/Fresh
color: '#f5576c' // Pink/Red

// Service/Delivery
color: '#4facfe' // Blue

// Savings/Value
color: '#43e97b' // Green

// Limited Time
color: '#fa709a' // Hot Pink

// New Customer
color: '#feca57' // Yellow/Gold
```

## Customization

### Card Dimensions
```typescript
const CARD_WIDTH = width - spacing.lg * 2;  // Full width minus padding
const CARD_SPACING = spacing.md;            // Gap between cards
```

### Adjust Card Size
```typescript
// For smaller cards
const CARD_WIDTH = width * 0.85;

// For larger cards (tablet)
const CARD_WIDTH = width > 768 ? 600 : width - spacing.lg * 2;
```

### Change Colors
```typescript
// Update individual coupon colors
const coupon = {
  ...otherProps,
  color: '#your-color-here',
};
```

### Modify Layout
```typescript
// In styles
card: {
  // Adjust padding
  padding: spacing.xl,
  
  // Change border radius
  borderRadius: borderRadius.lg,
  
  // Modify shadow
  ...shadows.xl,
}
```

## Integration with Backend

### Fetch Coupons from API
```typescript
const [coupons, setCoupons] = useState<Coupon[]>([]);

useEffect(() => {
  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/coupons/active');
      const data = await response.json();
      setCoupons(data);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
    }
  };
  
  if (isAuthenticated) {
    fetchCoupons();
  }
}, [isAuthenticated]);
```

### Apply Coupon
```typescript
const handleCouponPress = async (coupon: Coupon) => {
  try {
    // Copy code to clipboard
    await Clipboard.setStringAsync(coupon.code);
    
    // Show toast
    showToast({
      type: 'success',
      message: `Coupon ${coupon.code} copied!`,
    });
    
    // Navigate to booking with coupon
    router.push({
      pathname: '/booking',
      params: { couponCode: coupon.code },
    });
  } catch (error) {
    console.error('Failed to apply coupon:', error);
  }
};
```

## Accessibility

### Labels
```typescript
accessibilityLabel={`${coupon.title}. ${coupon.discount}. Code ${coupon.code}. Valid until ${coupon.validUntil}`}
accessibilityRole="button"
accessibilityHint="Double tap to apply this coupon"
```

### Touch Targets
- Card: Full width, 200+ height ✅
- Apply button: 44px height ✅
- View All button: 44px height ✅

### Screen Reader
- Announces coupon details
- Indicates validity period
- Confirms when applied

## Performance

### Optimization Tips
1. **Memoize Cards**: Use `React.memo` for coupon cards
2. **Lazy Load Images**: If using coupon images
3. **Limit Coupons**: Show max 5-6 active coupons
4. **Cache Data**: Store fetched coupons locally

```typescript
const CouponCard = React.memo(({ coupon, onPress }) => {
  // Card implementation
});
```

## Animation Ideas

### Card Entrance
```typescript
// Fade in and slide up
Animated.parallel([
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 300,
  }),
  Animated.timing(slideAnim, {
    toValue: 0,
    duration: 300,
  }),
]).start();
```

### Badge Pulse
```typescript
// Pulse discount badge
Animated.sequence([
  Animated.timing(scale, { toValue: 1.1, duration: 200 }),
  Animated.timing(scale, { toValue: 1.0, duration: 200 }),
]).start();
```

## Testing Checklist

- [ ] Coupons display correctly
- [ ] Horizontal scroll works smoothly
- [ ] Pagination dots update on scroll
- [ ] Cards snap to position
- [ ] Apply button is tappable
- [ ] View All button works
- [ ] Coupon code is readable
- [ ] Validity date is clear
- [ ] Icons display correctly
- [ ] Colors are vibrant
- [ ] Works on small phones
- [ ] Works on tablets
- [ ] Landscape orientation
- [ ] Accessibility labels
- [ ] Screen reader support

## Common Issues

### Cards Not Snapping
```typescript
// Ensure snapToInterval matches card width + spacing
snapToInterval={CARD_WIDTH + CARD_SPACING}
```

### Pagination Not Updating
```typescript
// Check scroll event throttle
scrollEventThrottle={16}
```

### Colors Not Showing
```typescript
// Verify color format
color: '#667eea' // ✅ Correct
color: '667eea'  // ❌ Missing #
```

## Future Enhancements

1. **Auto-scroll**: Automatically cycle through coupons
2. **Favorites**: Let users save favorite coupons
3. **Share**: Share coupons with friends
4. **Notifications**: Alert when new coupons available
5. **Categories**: Filter coupons by service type
6. **Countdown**: Show time remaining for expiring coupons
7. **Usage Tracking**: Show how many times used
8. **Personalization**: Show relevant coupons based on history

## Example: Full Implementation

```tsx
import React, { useState, useEffect } from 'react';
import { CouponCarousel, Coupon } from '../components/home';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchCoupons();
    }
  }, [isAuthenticated]);

  const fetchCoupons = async () => {
    // Fetch from API
    const data = await api.getCoupons();
    setCoupons(data);
  };

  const handleCouponPress = (coupon: Coupon) => {
    router.push({
      pathname: '/booking',
      params: { couponCode: coupon.code },
    });
  };

  return (
    <SafeAreaView>
      <Header />
      <ScrollView>
        {isAuthenticated && (
          <CouponCarousel
            coupons={coupons}
            onCouponPress={handleCouponPress}
          />
        )}
        {/* Other content */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

## Summary

The Coupon Carousel provides:
- ✅ Beautiful, swipeable coupon cards
- ✅ Clear discount information
- ✅ Easy code copying/application
- ✅ Smooth pagination
- ✅ Responsive design
- ✅ Accessible interface
- ✅ Customizable styling
- ✅ Performance optimized

Perfect for showcasing special offers to logged-in users!
