# Account Tab Design Specification

## Overview
The Account tab provides a premium, personalized experience for users to manage their profile, preferences, and access support. The design follows our glassmorphism aesthetic with elegant cards, smooth interactions, and clear information hierarchy.

## Design Principles
- **Premium & Professional**: Sophisticated glassmorphism effects with navy blue accents
- **User-Centric**: Quick access to frequently used features
- **Clear Hierarchy**: Organized sections with visual separation
- **Trust Building**: Loyalty status, achievements, and social proof
- **Accessible**: WCAG AA compliant with proper touch targets

## Layout Structure

### 1. Profile Hero Section (Glassmorphism Card)
**Visual Design:**
- Glassmorphic card with gradient background (navy to lighter blue)
- Profile avatar with subtle glow effect
- User name and email with elegant typography
- Membership tier badge (Bronze/Silver/Gold/Platinum)
- Quick stats row: Orders, Points, Savings

**Components:**
```
┌─────────────────────────────────────┐
│  [Avatar]  John Doe                 │
│  ⭐        john@email.com            │
│            Gold Member               │
│                                      │
│  📦 12 Orders  💎 2,450 pts  💰 $89 │
└─────────────────────────────────────┘
```

### 2. Quick Actions Grid
**Purpose:** Fast access to common tasks
**Items:**
- Edit Profile (with icon)
- Order History (with icon)
- Loyalty Rewards (with icon)
- Refer Friends (with icon)

**Visual:** 2x2 grid with glassmorphic mini-cards

### 3. Account Management Section
**Grouped Settings Cards:**

**Personal Information**
- Profile Settings → Edit name, phone, preferences
- Saved Addresses → Manage delivery locations
- Payment Methods → Cards, wallets, UPI

**Preferences**
- Notifications → Push, email, SMS preferences
- Language & Region → Localization settings
- Accessibility → Font size, contrast options

**Orders & Activity**
- Order History → Past orders with status
- Favorites → Saved services
- Reviews & Ratings → Your feedback history

### 4. Loyalty & Rewards Card
**Visual Design:**
- Premium glassmorphic card with gold accents
- Progress bar showing next tier
- Current points balance
- Quick CTA: "Redeem Rewards"

**Content:**
```
┌─────────────────────────────────────┐
│  🏆 Gold Member                      │
│  2,450 points                        │
│  ▓▓▓▓▓▓▓▓░░ 550 to Platinum         │
│  [Redeem Rewards →]                  │
└─────────────────────────────────────┘
```

### 5. Support & Help Section
**Items:**
- Help Center → FAQs, guides
- Contact Support → Chat, call, email
- Track Order → Real-time tracking
- Report Issue → Quick feedback

### 6. Legal & About Section
**Items:**
- Terms & Conditions
- Privacy Policy
- About Darzi
- App Version

### 7. Social Connect Section
**Visual:** Horizontal row of social icons with glassmorphic buttons
**Platforms:** Instagram, Facebook, WhatsApp, Twitter

### 8. Logout Button
**Design:** Prominent but not alarming, with confirmation dialog

## Component Specifications

### ProfileHeroCard Component
```typescript
interface ProfileHeroCardProps {
  user: User;
  membershipTier: 'bronze' | 'silver' | 'gold' | 'platinum';
  stats: {
    totalOrders: number;
    loyaltyPoints: number;
    totalSavings: number;
  };
  onEditPress: () => void;
}
```

**Features:**
- Glassmorphic background with gradient
- Avatar with upload capability
- Animated stats counters
- Tier badge with appropriate color

### QuickActionsGrid Component
```typescript
interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  badge?: number; // For notification counts
}
```

**Features:**
- 2x2 responsive grid
- Glassmorphic cards with hover/press effects
- Optional badge for notifications
- Smooth navigation transitions

### SettingsGroup Component
```typescript
interface SettingsGroup {
  title: string;
  items: SettingsItem[];
  icon?: string;
}

interface SettingsItem {
  id: string;
  label: string;
  icon: string;
  route?: string;
  value?: string; // Current value display
  badge?: number;
  onPress: () => void;
}
```

**Features:**
- Collapsible sections (optional)
- Glassmorphic card container
- Right chevron for navigation
- Current value preview (e.g., "English" for language)

### LoyaltyCard Component
```typescript
interface LoyaltyCardProps {
  currentTier: MembershipTier;
  points: number;
  nextTierPoints: number;
  benefits: string[];
  onRedeemPress: () => void;
}
```

**Features:**
- Premium glassmorphic design with gold accents
- Animated progress bar
- Tier benefits list
- Prominent CTA button

## Color Palette

### Membership Tiers
- **Bronze**: `#CD7F32` with warm glow
- **Silver**: `#C0C0C0` with cool glow
- **Gold**: `#FFD700` with golden glow
- **Platinum**: `#E5E4E2` with premium glow

### Glassmorphism Effects
```typescript
const glassEffect = {
  backgroundColor: 'rgba(255, 255, 255, 0.1)',
  borderWidth: 1,
  borderColor: 'rgba(255, 255, 255, 0.2)',
  backdropFilter: 'blur(10px)', // Note: Limited support on mobile
  shadowColor: '#2B4162',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 12,
};
```

## Interactions & Animations

### Micro-interactions
1. **Card Press**: Scale down to 0.98 with subtle shadow increase
2. **Stats Counter**: Animate numbers on mount
3. **Progress Bar**: Smooth fill animation
4. **Avatar Upload**: Fade transition with loading state
5. **Section Expand**: Smooth height animation

### Transitions
- **Navigation**: Slide from right (iOS style)
- **Modal**: Fade in with scale from 0.95
- **Toast**: Slide down from top

## Accessibility Features

### WCAG AA Compliance
- Minimum touch target: 44x44 points
- Color contrast ratio: 4.5:1 for text
- Focus indicators for keyboard navigation
- Screen reader labels for all interactive elements

### Semantic Structure
```typescript
accessibilityRole="button"
accessibilityLabel="Edit profile"
accessibilityHint="Opens profile editing screen"
accessibilityState={{ disabled: false }}
```

## Responsive Behavior

### Phone (< 768px)
- Single column layout
- 2x2 quick actions grid
- Full-width cards

### Tablet (≥ 768px)
- Two-column layout for settings
- 4x1 quick actions grid
- Max width: 600px centered

## Loading States

### Skeleton Screens
- Profile hero: Shimmer effect on avatar and text
- Stats: Animated placeholder bars
- Settings: Gray placeholder cards

### Progressive Loading
1. Load profile data first
2. Load stats and loyalty info
3. Load settings sections
4. Load social links last

## Error States

### Network Error
- Retry button with clear message
- Cached data display when available
- Offline indicator

### Empty States
- No orders: Illustration + CTA to explore services
- No addresses: Prompt to add first address
- No payment methods: Secure payment setup CTA

## Implementation Priority

### Phase 1 (MVP)
1. ProfileHeroCard with basic info
2. SettingsGroup for account management
3. Logout functionality
4. Basic navigation

### Phase 2 (Enhanced)
1. QuickActionsGrid
2. LoyaltyCard with tier system
3. Stats counters with animations
4. Social connect section

### Phase 3 (Premium)
1. Advanced glassmorphism effects
2. Achievements & badges
3. Referral program integration
4. In-app support chat

## Technical Considerations

### Performance
- Lazy load sections below fold
- Optimize avatar images (WebP, compression)
- Memoize expensive calculations
- Use FlatList for long settings lists

### State Management
- User profile: Global context
- Settings: Local state with persistence
- Loyalty data: API with cache
- Navigation state: React Navigation

### API Integration
```typescript
// Endpoints needed
GET /api/user/profile
GET /api/user/stats
GET /api/user/loyalty
PATCH /api/user/profile
POST /api/user/avatar
GET /api/user/orders
GET /api/user/addresses
```

## Design Assets Needed

### Icons
- Profile settings, addresses, payment, notifications
- Privacy, security, help, support
- Social media platforms
- Membership tier badges

### Illustrations
- Empty states (no orders, no addresses)
- Success states (profile updated, tier upgraded)
- Error states (network error, server error)

## Testing Checklist

- [ ] Profile loads correctly for authenticated users
- [ ] Login prompt shows for unauthenticated users
- [ ] All navigation links work
- [ ] Logout confirmation and execution
- [ ] Avatar upload and display
- [ ] Stats display correctly
- [ ] Loyalty progress bar accurate
- [ ] Settings persist across sessions
- [ ] Social links open correctly
- [ ] Accessibility labels present
- [ ] Touch targets meet 44x44 minimum
- [ ] Color contrast meets WCAG AA
- [ ] Loading states display properly
- [ ] Error states handle gracefully
- [ ] Responsive on different screen sizes

## Future Enhancements

1. **Gamification**: Achievements, streaks, challenges
2. **Personalization**: Custom themes, layout preferences
3. **Social Features**: Share achievements, invite friends
4. **Advanced Analytics**: Spending insights, service recommendations
5. **Premium Features**: Priority support, exclusive offers
6. **Biometric Auth**: Face ID, fingerprint for quick access
7. **Dark Mode**: Full dark theme support
8. **Widgets**: Home screen widgets for quick stats
