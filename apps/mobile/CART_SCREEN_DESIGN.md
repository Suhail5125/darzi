# Cart Screen Design Specification

## Overview
Professional cart screen design following the established patterns from Home and Account screens, featuring glassmorphism header, gradient background, and modern e-commerce UX patterns.

## Design Philosophy
- **Visual Consistency**: Match Home and Account screen aesthetics
- **Glassmorphism**: Frosted glass header with blur effects
- **Gradient Background**: Smooth blue-to-white gradient
- **Modern E-commerce**: Professional cart experience with clear pricing
- **Trust Building**: Transparent pricing, secure checkout indicators
- **Conversion Optimization**: Clear CTAs, progress indicators, trust signals

## Screen Structure

### 1. Fixed Glassmorphism Header
```
┌─────────────────────────────────────┐
│  [←]    My Cart (3)    [🎁 Offers]  │
└─────────────────────────────────────┘
```

**Components:**
- Left: Back button (glassmorphism circle)
- Center: "My Cart" title with item count (glassmorphism pill)
- Right: Offers/Coupons icon (glassmorphism circle)
- Background: Frosted glass with blur effect
- Position: Fixed at top, overlays content

### 2. Gradient Background
- Top: `#4A6FA5` (Professional Blue)
- Middle: `#98C1D9` (Sky Blue)
- Bottom: `#FFFFFF` (White)
- Smooth transition throughout scroll

### 3. Main Content (Scrollable)

#### A. Cart Items Section
**Design Pattern: Card-based list**
```
┌─────────────────────────────────────┐
│ Cart Items (3)                      │
│                                     │
│ ┌─────────────────────────────────┐ │
│ │ Dry Cleaning                    │ │
│ │ Professional care for delicate  │ │
│ │ ₹250                            │ │
│ │                    [-] 2 [+] 🗑️ │ │
│ │ Item Total: ₹500                │ │
│ └─────────────────────────────────┘ │
│                                     │
│ [More items...]                     │
└─────────────────────────────────────┘
```

**Features:**
- White card with subtle shadow
- Service name, description, unit price
- Quantity controls with +/- buttons
- Remove button (trash icon)
- Item total calculation
- Smooth animations on quantity change

#### B. Delivery Address Card
```
┌─────────────────────────────────────┐
│ Delivery Address                    │
│                                     │
│ 📍 41-A, Asif Agency, Shipai       │
│    Mohalla, Jaipur                 │
│                          [Change]   │
└─────────────────────────────────────┘
```

**Features:**
- Location icon with address
- Change button (opens address selector)
- Glassmorphism card style
- Matches home screen address design

#### C. Promo Code Section
```
┌─────────────────────────────────────┐
│ Have a Promo Code?                  │
│                                     │
│ ┌─────────────────┐  ┌──────────┐  │
│ │ Enter code      │  │  Apply   │  │
│ └─────────────────┘  └──────────┘  │
│                                     │
│ ✓ CLEAN50 applied - ₹125 saved     │
└─────────────────────────────────────┘
```

**Features:**
- Input field with apply button
- Success indicator when applied
- Savings amount highlighted
- Remove applied coupon option
- Available coupons suggestion

#### D. Tip Selector (Enhanced)
```
┌─────────────────────────────────────┐
│ Add a Tip for Our Team 💙           │
│ Show appreciation for great service │
│                                     │
│ ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐ │
│ │ 10% │  │ 15% │  │ 20% │  │ 25% │ │
│ │ ₹50 │  │ ₹75 │  │₹100 │  │₹125 │ │
│ └─────┘  └─────┘  └─────┘  └─────┘ │
│                                     │
│ Custom: ₹ [____]                    │
└─────────────────────────────────────┘
```

**Features:**
- Preset percentage buttons (10%, 15%, 20%, 25%)
- Calculated amounts shown
- Custom tip input
- Selected state highlighting
- Optional (can skip)

#### E. Delivery Instructions
```
┌─────────────────────────────────────┐
│ Delivery Instructions               │
│                                     │
│ Quick Select:                       │
│ [Leave at door] [Ring bell]         │
│ [Call on arrival] [Meet at lobby]   │
│                                     │
│ Custom Instructions:                │
│ ┌─────────────────────────────────┐ │
│ │ Add special instructions...     │ │
│ │                                 │ │
│ └─────────────────────────────────┘ │
│ 200 characters remaining            │
└─────────────────────────────────────┘
```

**Features:**
- Quick select chips for common instructions
- Custom text area (200 char limit)
- Character counter
- Optional field

#### F. Bill Summary Card
```
┌─────────────────────────────────────┐
│ Bill Summary                        │
│                                     │
│ Item Total          ₹500            │
│ Delivery Fee        ₹50             │
│ Tip                 ₹75             │
│ ─────────────────────────────       │
│ Subtotal            ₹625            │
│ GST (18%)           ₹112.50         │
│ Promo Discount     -₹125            │
│ ─────────────────────────────       │
│ Total Amount        ₹612.50         │
│                                     │
│ 💰 You saved ₹125 on this order!   │
└─────────────────────────────────────┘
```

**Features:**
- Clear line-item breakdown
- Highlighted savings
- Tax calculation shown
- Total prominently displayed
- Glassmorphism card with gradient accent

#### G. Payment Method Preview
```
┌─────────────────────────────────────┐
│ Payment Method                      │
│                                     │
│ 💳 •••• 4242                        │
│                          [Change]   │
└─────────────────────────────────────┘
```

**Features:**
- Selected payment method preview
- Change button
- Secure indicator icon

#### H. Checkout CTA
```
┌─────────────────────────────────────┐
│  🔒 Proceed to Secure Checkout      │
│         ₹612.50                     │
└─────────────────────────────────────┘
```

**Features:**
- Large, prominent button
- Security lock icon
- Total amount displayed
- Gradient background
- Loading state during processing
- Disabled state when processing

#### I. Trust Signals
```
┌─────────────────────────────────────┐
│ ✓ Secure Payment  ✓ Easy Returns   │
│ ✓ Quality Assured ✓ On-time Delivery│
└─────────────────────────────────────┘
```

**Features:**
- Trust badges
- Subtle, non-intrusive
- Above checkout button

#### J. Recommended Add-ons (Optional)
```
┌─────────────────────────────────────┐
│ Complete Your Order                 │
│                                     │
│ ┌──────┐  ┌──────┐  ┌──────┐       │
│ │ 🧺   │  │ 👔   │  │ 👞   │       │
│ │Starch│  │Press │  │Shoe  │       │
│ │ +₹50 │  │ +₹80 │  │Clean │       │
│ └──────┘  └──────┘  │ +₹99 │       │
│                     └──────┘        │
└─────────────────────────────────────┘
```

**Features:**
- Horizontal scroll
- Quick add buttons
- Complementary services
- Increases order value

## Empty Cart State

```
┌─────────────────────────────────────┐
│                                     │
│           🛒                        │
│                                     │
│     Your Cart is Empty              │
│                                     │
│  Add services to get started        │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   Browse Services           │   │
│  └─────────────────────────────┘   │
│                                     │
│  ┌─────────────────────────────┐   │
│  │   View Recent Orders        │   │
│  └─────────────────────────────┘   │
│                                     │
└─────────────────────────────────────┘
```

**Features:**
- Large cart icon
- Clear messaging
- Two CTAs: Browse Services, View Recent Orders
- Centered layout
- Friendly tone

## Interactions & Animations

### 1. Quantity Changes
- Smooth number transition
- Instant price update
- Haptic feedback on button press
- Disable decrement at quantity 1

### 2. Item Removal
- Swipe-to-delete gesture
- Confirmation dialog (optional)
- Smooth slide-out animation
- Update totals immediately
- Show undo toast

### 3. Coupon Application
- Loading indicator on apply
- Success animation (checkmark)
- Error shake animation if invalid
- Highlight savings amount

### 4. Checkout Flow
- Button loading state
- Disable interactions during processing
- Success animation on completion
- Error handling with retry option

### 5. Scroll Behavior
- Header remains fixed
- Smooth scroll performance
- Pull-to-refresh support
- Scroll-to-top on tab press

## Accessibility

### Screen Reader Support
- Cart item count announced
- Price changes announced
- Quantity controls labeled
- Checkout button clearly labeled
- Error messages announced

### Touch Targets
- Minimum 44x44pt touch targets
- Adequate spacing between buttons
- Large checkout button

### Visual Accessibility
- High contrast text
- Clear focus indicators
- Sufficient color contrast (WCAG AA)
- Support for larger text sizes

## Responsive Behavior

### Small Screens (< 375px)
- Stack tip buttons vertically
- Reduce padding slightly
- Maintain readability

### Large Screens (> 414px)
- Wider cards with max-width
- Better use of horizontal space
- Larger touch targets

## Performance Considerations

1. **Memoization**: Cart items memoized to prevent unnecessary re-renders
2. **Debouncing**: Quantity changes debounced for API calls
3. **Optimistic Updates**: UI updates immediately, sync with backend
4. **Image Optimization**: Service images lazy-loaded
5. **Smooth Animations**: Use native driver for animations

## Error Handling

### Network Errors
- Retry mechanism
- Offline indicator
- Queue actions for when online

### Validation Errors
- Inline error messages
- Clear error states
- Helpful error copy

### Payment Errors
- Clear error messaging
- Retry option
- Alternative payment methods

## Success States

### Order Placed
- Success animation
- Order confirmation screen
- Order tracking link
- Share order option

## Technical Implementation Notes

### State Management
- Use CartContext for global cart state
- Local state for UI interactions
- Persist cart to AsyncStorage

### API Integration
- Update cart on backend
- Sync on app launch
- Handle conflicts gracefully

### Analytics Tracking
- Track cart additions/removals
- Track checkout funnel
- Track coupon usage
- Track abandonment points

## Design Tokens

### Colors
- Primary: `#4A6FA5`
- Success: `#10B981`
- Error: `#EF4444`
- Background: `#FFFFFF`
- Surface: `#F9FAFB`
- Border: `#E5E7EB`

### Spacing
- xs: 4px
- sm: 8px
- md: 16px
- lg: 24px
- xl: 32px

### Typography
- Title: 20px, Semibold
- Body: 16px, Regular
- Caption: 14px, Regular
- Price: 18px, Bold

### Border Radius
- sm: 8px
- md: 12px
- lg: 16px
- full: 9999px

## Next Steps

1. Create enhanced cart components
2. Implement glassmorphism header
3. Add animations and transitions
4. Integrate with CartContext
5. Add analytics tracking
6. Test on multiple devices
7. Optimize performance
8. Add error boundaries
