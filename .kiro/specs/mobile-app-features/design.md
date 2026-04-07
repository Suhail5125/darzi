# Design Document: Mobile App Features

## Overview

This design document specifies the technical architecture and implementation approach for porting the complete Darzi web application to a React Native mobile application using Expo. The mobile app will provide feature parity with the web app while leveraging mobile-native patterns, gestures, and navigation paradigms.

## Technology Stack

- **Framework**: React Native with Expo SDK
- **Navigation**: Expo Router (file-based routing)
- **Language**: TypeScript
- **UI Components**: @darzi/shared-ui (adapted for React Native)
- **Assets**: @darzi/shared-assets
- **Utilities**: @darzi/shared-utils
- **State Management**: React Context API + hooks
- **Styling**: StyleSheet API with design tokens

## Architecture

### Navigation Architecture

The app uses a hybrid navigation structure combining tab-based and stack-based navigation:

```
Root Layout (_layout.tsx)
├── (auth) - Authentication Stack
│   ├── login.tsx
│   └── signup.tsx
└── (tabs) - Main Tab Navigator
    ├── index.tsx (Home Tab)
    │   └── Stack: home → booking → service-details
    ├── explore.tsx (Explore Tab)
    │   └── Stack: explore → booking
    ├── cart.tsx (Cart Tab)
    │   └── Stack: cart → checkout → order-confirmation
    └── account.tsx (Account Tab)
        └── Stack: account → dashboard → order-details
                          → profile
                          → addresses
                          → settings
                          → about
                          → contact
                          → careers
                          → become-seller
                          → privacy
                          → terms
                          → faq
                          → our-craft
                          → sustainability
                          → products
```

### Directory Structure

```
apps/mobile/
├── app/
│   ├── _layout.tsx                 # Root layout with providers
│   ├── (auth)/
│   │   ├── _layout.tsx            # Auth stack layout
│   │   ├── login.tsx
│   │   └── signup.tsx
│   ├── (tabs)/
│   │   ├── _layout.tsx            # Tab navigator layout
│   │   ├── index.tsx              # Home screen
│   │   ├── explore.tsx            # Explore screen
│   │   ├── cart.tsx               # Cart screen
│   │   └── account.tsx            # Account screen
│   ├── booking.tsx                # Booking flow screen
│   ├── dashboard.tsx              # User dashboard
│   ├── services.tsx               # Services listing
│   ├── about.tsx                  # About screen
│   ├── contact.tsx                # Contact screen
│   ├── careers.tsx                # Careers screen
│   ├── become-seller.tsx          # Partnership screen
│   ├── privacy.tsx                # Privacy policy
│   ├── terms.tsx                  # Terms of service
│   ├── faq.tsx                    # FAQ screen
│   ├── our-craft.tsx              # Craftsmanship screen
│   ├── sustainability.tsx         # Sustainability screen
│   └── products.tsx               # Products screen
├── components/
│   ├── navigation/
│   │   ├── TabBar.tsx             # Custom tab bar
│   │   └── Header.tsx             # Custom header
│   ├── home/
│   │   ├── HeroSection.tsx
│   │   ├── ServiceGrid.tsx
│   │   ├── TestimonialCarousel.tsx
│   │   ├── ProcessSteps.tsx
│   │   └── TrustIndicators.tsx
│   ├── booking/
│   │   ├── BookingForm.tsx
│   │   └── DatePicker.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   ├── CartSummary.tsx
│   │   ├── TipSelector.tsx
│   │   └── DeliveryInstructions.tsx
│   ├── dashboard/
│   │   ├── SummaryCards.tsx
│   │   ├── OrderList.tsx
│   │   └── OrderCard.tsx
│   ├── explore/
│   │   ├── ServiceCard.tsx
│   │   └── CategoryFilters.tsx
│   ├── account/
│   │   ├── ProfileHeader.tsx
│   │   ├── SettingsSection.tsx
│   │   └── SocialLinks.tsx
│   ├── shared/
│   │   ├── Button.tsx             # Adapted from shared-ui
│   │   ├── Card.tsx               # Adapted from shared-ui
│   │   ├── Input.tsx              # Adapted from shared-ui
│   │   ├── Toast.tsx
│   │   ├── LoadingSpinner.tsx
│   │   ├── Skeleton.tsx
│   │   └── ErrorBoundary.tsx
│   └── faq/
│       └── AccordionItem.tsx
├── contexts/
│   ├── AuthContext.tsx            # Authentication state
│   ├── CartContext.tsx            # Cart state
│   └── ToastContext.tsx           # Toast notifications
├── hooks/
│   ├── useAuth.ts
│   ├── useCart.ts
│   ├── useToast.ts
│   └── useLocation.ts
├── services/
│   ├── api.ts                     # API client
│   ├── auth.ts                    # Auth service
│   └── storage.ts                 # AsyncStorage wrapper
├── constants/
│   ├── theme.ts                   # Design tokens
│   └── config.ts                  # App configuration
└── types/
    └── index.ts                   # TypeScript types
```

## Component Specifications

### 1. Navigation Components

#### TabBar Component
```typescript
interface TabBarProps {
  state: TabNavigationState;
  descriptors: TabDescriptorMap;
  navigation: NavigationHelpers;
}

// Features:
// - Bottom tab bar with 4 tabs: Home, Explore, Cart, Account
// - Active state indication with color and icon changes
// - Badge support for cart item count
// - Safe area handling for devices with home indicators
```

#### Header Component
```typescript
interface HeaderProps {
  title: string;
  showBack?: boolean;
  showSearch?: boolean;
  showLocation?: boolean;
  rightAction?: React.ReactNode;
}

// Features:
// - Conditional back button
// - Search input (when logged in)
// - Location display (when logged in)
// - Custom right actions (e.g., cart icon)
// - Safe area handling for notches
```

### 2. Home Screen Components

#### HeroSection
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaPress: () => void;
}

// Features:
// - Background image with overlay
// - Responsive text sizing
// - Call-to-action button
// - Optimized for mobile viewports
```

#### ServiceGrid
```typescript
interface ServiceGridProps {
  services: Service[];
  onServicePress: (serviceId: string) => void;
}

// Features:
// - 2-column grid layout
// - Service cards with images, titles, descriptions
// - Touch feedback
// - Lazy loading for images
```

#### TestimonialCarousel
```typescript
interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

// Features:
// - Horizontal scrollable carousel
// - Snap to item behavior
// - Pagination dots
// - Auto-play optional
```

#### ProcessSteps
```typescript
interface ProcessStepsProps {
  steps: ProcessStep[];
}

// Features:
// - Vertical list of steps
// - Icons with descriptions
// - Numbered indicators
```

#### TrustIndicators
```typescript
interface TrustIndicatorsProps {
  indicators: TrustIndicator[];
}

// Features:
// - Grid of trust badges
// - Icons with text
// - Responsive layout
```

### 3. Authentication Components

#### LoginForm
```typescript
interface LoginFormProps {
  onSuccess: () => void;
  onSignupPress: () => void;
}

// Features:
// - Email and password inputs
// - Password visibility toggle
// - Form validation
// - Loading state
// - Error display
// - "Forgot password" link
// - "Sign up" navigation
```

#### SignupForm
```typescript
interface SignupFormProps {
  onSuccess: () => void;
  onLoginPress: () => void;
}

// Features:
// - Name, email, password inputs
// - Password confirmation
// - Form validation
// - Loading state
// - Error display
// - Terms acceptance checkbox
// - "Login" navigation
```

### 4. Booking Components

#### BookingForm
```typescript
interface BookingFormProps {
  preselectedService?: string;
  onSubmit: (booking: BookingData) => void;
}

interface BookingData {
  name: string;
  service: string;
  date: Date;
  instructions?: string;
}

// Features:
// - Text input for name
// - Service dropdown/picker
// - Native date picker
// - Text area for instructions
// - Form validation
// - Submit button with loading state
```

### 5. Cart Components

#### CartItem
```typescript
interface CartItemProps {
  item: CartItem;
  onQuantityChange: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

// Features:
// - Service name and description
// - Quantity controls (-, +)
// - Remove button
// - Price display
// - Touch feedback
```

#### CartSummary
```typescript
interface CartSummaryProps {
  subtotal: number;
  tip: number;
  deliveryFee: number;
  tax: number;
  total: number;
}

// Features:
// - Line items for each cost component
// - Bold total
// - Currency formatting
```

#### TipSelector
```typescript
interface TipSelectorProps {
  selectedTip: number;
  onTipChange: (amount: number) => void;
}

// Features:
// - Preset tip buttons (10%, 15%, 20%)
// - Custom tip input
// - Active state indication
```

#### DeliveryInstructions
```typescript
interface DeliveryInstructionsProps {
  instructions: string;
  onInstructionsChange: (text: string) => void;
}

// Features:
// - Preset instruction chips
// - Custom text area
// - Character limit display
```

### 6. Dashboard Components

#### SummaryCards
```typescript
interface SummaryCardsProps {
  activeOrders: number;
  completedOrders: number;
  totalItems: number;
}

// Features:
// - 3 cards in horizontal scroll or grid
// - Icons with numbers
// - Labels
// - Touch feedback for navigation
```

#### OrderList
```typescript
interface OrderListProps {
  orders: Order[];
  onOrderPress: (orderId: string) => void;
}

// Features:
// - Scrollable list of orders
// - Order cards with details
// - Status badges
// - Empty state
```

#### OrderCard
```typescript
interface OrderCardProps {
  order: Order;
  onPress: () => void;
}

// Features:
// - Order ID, service type, date
// - Status badge with color coding
// - Total amount
// - Touch feedback
```

### 7. Explore Components

#### ServiceCard
```typescript
interface ServiceCardProps {
  service: Service;
  onPress: () => void;
}

// Features:
// - Service image
// - Title and category badge
// - Description (truncated)
// - Features list with checkmarks
// - Pricing
// - Touch feedback
```

#### CategoryFilters
```typescript
interface CategoryFiltersProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

// Features:
// - Horizontal scrollable chips
// - Active state indication
// - "All" option
// - Touch feedback
```

### 8. Account Components

#### ProfileHeader
```typescript
interface ProfileHeaderProps {
  user: User;
  onEditPress: () => void;
}

// Features:
// - Avatar image
// - Name and email
// - Edit button
// - Responsive layout
```

#### SettingsSection
```typescript
interface SettingsSectionProps {
  title: string;
  items: SettingsItem[];
  onItemPress: (itemId: string) => void;
}

// Features:
// - Section title
// - List of settings items
// - Icons and labels
// - Chevron indicators
// - Touch feedback
```

#### SocialLinks
```typescript
interface SocialLinksProps {
  links: SocialLink[];
}

// Features:
// - Horizontal row of social icons
// - Touch feedback
// - Opens external links
```

### 9. Shared Components

#### Button (Adapted from shared-ui)
```typescript
interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

// Adaptations for React Native:
// - Use TouchableOpacity or Pressable
// - Native loading spinner
// - Platform-specific touch feedback
```

#### Card (Adapted from shared-ui)
```typescript
interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  style?: ViewStyle;
}

// Adaptations for React Native:
// - Use View with shadow props
// - Platform-specific shadows (iOS vs Android)
// - Optional Pressable wrapper
```

#### Input (Adapted from shared-ui)
```typescript
interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

// Adaptations for React Native:
// - Use TextInput
// - Native keyboard types
// - Platform-specific styling
```

#### Toast
```typescript
interface ToastProps {
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onDismiss: () => void;
}

// Features:
// - Animated entrance/exit
// - Auto-dismiss timer
// - Type-based styling
// - Safe area positioning
```

#### LoadingSpinner
```typescript
interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  color?: string;
}

// Features:
// - Native ActivityIndicator
// - Platform-specific styling
```

#### Skeleton
```typescript
interface SkeletonProps {
  width: number | string;
  height: number;
  borderRadius?: number;
}

// Features:
// - Animated shimmer effect
// - Configurable dimensions
// - Used for loading states
```

### 10. FAQ Components

#### AccordionItem
```typescript
interface AccordionItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

// Features:
// - Expandable/collapsible
// - Animated height transition
// - Chevron indicator
// - Touch feedback
```

## State Management

### AuthContext
```typescript
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

// Features:
// - Manages authentication state
// - Persists auth token in AsyncStorage
// - Provides auth methods to components
// - Handles token refresh
```

### CartContext
```typescript
interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (service: Service, quantity: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

// Features:
// - Manages cart state
// - Persists cart in AsyncStorage
// - Calculates totals
// - Provides cart methods to components
```

### ToastContext
```typescript
interface ToastContextValue {
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
}

// Features:
// - Manages toast notifications
// - Queue support for multiple toasts
// - Auto-dismiss functionality
```

## API Integration

### API Client
```typescript
class ApiClient {
  private baseURL: string;
  private authToken: string | null;

  async get<T>(endpoint: string): Promise<T>;
  async post<T>(endpoint: string, data: any): Promise<T>;
  async put<T>(endpoint: string, data: any): Promise<T>;
  async delete<T>(endpoint: string): Promise<T>;
  
  setAuthToken(token: string): void;
  clearAuthToken(): void;
}

// Features:
// - Centralized API calls
// - Auth token management
// - Error handling
// - Request/response interceptors
```

### Auth Service
```typescript
interface AuthService {
  login(email: string, password: string): Promise<AuthResponse>;
  signup(name: string, email: string, password: string): Promise<AuthResponse>;
  logout(): Promise<void>;
  refreshToken(): Promise<string>;
  getCurrentUser(): Promise<User>;
}

// Features:
// - Authentication API calls
// - Token management
// - User data fetching
```

### Storage Service
```typescript
interface StorageService {
  setItem(key: string, value: string): Promise<void>;
  getItem(key: string): Promise<string | null>;
  removeItem(key: string): Promise<void>;
  clear(): Promise<void>;
}

// Features:
// - AsyncStorage wrapper
// - Type-safe storage operations
// - Error handling
```

## Design Tokens

### Colors
```typescript
const colors = {
  primary: '#2C5F2D',      // Brand green
  secondary: '#97BC62',    // Light green
  accent: '#FF6B35',       // Orange accent
  background: '#FFFFFF',
  surface: '#F5F5F5',
  text: {
    primary: '#1A1A1A',
    secondary: '#666666',
    disabled: '#999999',
  },
  border: '#E0E0E0',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
};
```

### Typography
```typescript
const typography = {
  fontFamily: {
    regular: 'Inter-Regular',
    medium: 'Inter-Medium',
    semibold: 'Inter-SemiBold',
    bold: 'Inter-Bold',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};
```

### Spacing
```typescript
const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};
```

### Shadows
```typescript
const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};
```

## Screen Specifications

### Home Screen (index.tsx)
- Hero section with background image
- Service grid (2 columns)
- Testimonial carousel
- Process steps section
- Trust indicators
- Scroll view with pull-to-refresh

### Explore Screen (explore.tsx)
- Category filter chips
- Service grid (2 columns)
- Search functionality (when logged in)
- Empty state for no results
- Scroll view with virtualization

### Cart Screen (cart.tsx)
- Cart items list
- Delivery address section
- Coupon code input
- Tip selector
- Delivery instructions
- Cart summary
- Checkout button
- Previous orders section
- Empty state for empty cart

### Account Screen (account.tsx)
- Profile header
- Settings sections:
  - Profile & Settings
  - Addresses
  - Payment Methods
  - Notifications
  - Privacy & Security
  - Help & Support
- Social media links
- Logout button
- Scroll view

### Dashboard Screen (dashboard.tsx)
- User greeting
- Summary cards (active, completed, total items)
- Recent orders list
- "Start New Order" button
- Empty state for no orders
- Scroll view with pull-to-refresh

### Booking Screen (booking.tsx)
- Booking form
- Service selector
- Date picker
- Special instructions
- Submit button
- Form validation
- Loading state

### Services Screen (services.tsx)
- Category filters
- Services list/grid
- Service cards
- Scroll view with virtualization

### About Screen (about.tsx)
- Hero section
- Company story
- Statistics section
- Scroll view

### Contact Screen (contact.tsx)
- Contact information (email, phone, address)
- Contact form
- Submit button
- Scroll view

### Careers Screen (careers.tsx)
- Hero section
- Benefits section
- Open positions list
- Apply buttons
- Scroll view

### Become Seller Screen (become-seller.tsx)
- Partnership benefits
- Requirements section
- Contact section
- Scroll view

### Privacy Policy Screen (privacy.tsx)
- Policy sections
- Collapsible sections or scroll view
- Last updated date

### Terms of Service Screen (terms.tsx)
- Terms sections
- Scroll view
- Last updated date

### FAQ Screen (faq.tsx)
- Category sections
- Accordion items
- Contact section
- Scroll view

### Our Craft Screen (our-craft.tsx)
- Craftsmanship content
- Images and descriptions
- Scroll view

### Sustainability Screen (sustainability.tsx)
- Sustainability initiatives
- Impact statistics
- Images
- Scroll view

### Products Screen (products.tsx)
- Product grid
- Product cards
- Add to cart functionality
- Scroll view with virtualization

## Performance Optimizations

1. **Image Optimization**
   - Use Expo Image component with caching
   - Lazy load images below the fold
   - Use appropriate image resolutions for screen densities
   - Implement progressive loading with placeholders

2. **List Virtualization**
   - Use FlatList for long lists (orders, services, products)
   - Implement getItemLayout for fixed-height items
   - Use keyExtractor for stable keys
   - Implement windowSize optimization

3. **Code Splitting**
   - Lazy load screens not in initial route
   - Split large components into smaller chunks
   - Use React.lazy and Suspense where appropriate

4. **State Management**
   - Minimize re-renders with React.memo
   - Use useCallback and useMemo appropriately
   - Implement proper dependency arrays
   - Avoid unnecessary context updates

5. **Bundle Size**
   - Tree-shake unused code
   - Use Expo's built-in optimizations
   - Analyze bundle with expo-bundle-analyzer
   - Remove unused dependencies

## Accessibility

1. **Screen Reader Support**
   - Add accessibilityLabel to all interactive elements
   - Use accessibilityHint for complex interactions
   - Set accessibilityRole appropriately
   - Announce state changes with accessibilityLiveRegion

2. **Touch Targets**
   - Minimum 44x44 points for all touchable elements
   - Add padding to small touch targets
   - Ensure adequate spacing between interactive elements

3. **Color Contrast**
   - Maintain WCAG AA contrast ratios (4.5:1 for text)
   - Don't rely solely on color for information
   - Provide alternative indicators (icons, text)

4. **Dynamic Text**
   - Support iOS Dynamic Type
   - Support Android font scaling
   - Test with large text sizes
   - Ensure layouts adapt to text size changes

5. **Keyboard Navigation**
   - Support tab navigation where applicable
   - Ensure focus indicators are visible
   - Implement logical tab order

## Error Handling

1. **Network Errors**
   - Display user-friendly error messages
   - Provide retry functionality
   - Show offline indicator
   - Cache data for offline access

2. **Form Validation**
   - Real-time validation feedback
   - Clear error messages
   - Highlight invalid fields
   - Prevent submission with errors

3. **Error Boundaries**
   - Wrap screens in error boundaries
   - Display fallback UI on crashes
   - Log errors for debugging
   - Provide recovery options

4. **Loading States**
   - Show loading indicators for async operations
   - Disable interactive elements during loading
   - Provide progress feedback for long operations
   - Use skeleton screens for content loading

## Testing Strategy

1. **Unit Tests**
   - Test utility functions
   - Test custom hooks
   - Test context providers
   - Test component logic

2. **Component Tests**
   - Test component rendering
   - Test user interactions
   - Test prop variations
   - Test accessibility

3. **Integration Tests**
   - Test navigation flows
   - Test form submissions
   - Test API integrations
   - Test state management

4. **E2E Tests**
   - Test critical user journeys
   - Test authentication flow
   - Test booking flow
   - Test checkout flow

## Deployment

1. **Build Configuration**
   - Configure app.json for iOS and Android
   - Set up environment variables
   - Configure app icons and splash screens
   - Set up deep linking

2. **Release Process**
   - Use EAS Build for production builds
   - Configure OTA updates with EAS Update
   - Set up staging and production environments
   - Implement version management

3. **Monitoring**
   - Set up crash reporting (Sentry)
   - Implement analytics (Amplitude, Mixpanel)
   - Monitor performance metrics
   - Track user engagement

## Correctness Properties

### Property 1: Navigation State Consistency
**For all navigation actions, the navigation state must remain consistent and allow users to return to previous screens.**

Formal: ∀ navigation_action ∈ NavigationActions, ∃ back_action that returns to previous_state

Validates: Requirements 1.4, 1.5, 1.6

### Property 2: Authentication State Persistence
**Authentication state must persist across app sessions and be correctly restored on app launch.**

Formal: ∀ session ∈ AppSessions, auth_state(session_end) = auth_state(session_start + 1)

Validates: Requirements 3.6

### Property 3: Cart State Consistency
**Cart operations (add, remove, update) must maintain data consistency and correct totals.**

Formal: ∀ cart_operation, sum(item.price * item.quantity) = cart.subtotal

Validates: Requirements 6.1, 6.2, 6.3, 6.8

### Property 4: Form Validation Completeness
**All forms must validate required fields and prevent submission with invalid data.**

Formal: ∀ form ∈ Forms, ∀ required_field ∈ form.fields, form.canSubmit() ⟹ required_field.isValid()

Validates: Requirements 5.3, 11.6

### Property 5: Responsive Layout Adaptation
**All screens must adapt layouts correctly for different screen sizes and orientations.**

Formal: ∀ screen ∈ Screens, ∀ viewport ∈ Viewports, screen.layout(viewport).isAccessible()

Validates: Requirements 26.1, 26.2, 26.3

### Property 6: Accessibility Label Completeness
**All interactive elements must have accessibility labels for screen reader support.**

Formal: ∀ element ∈ InteractiveElements, element.accessibilityLabel ≠ null

Validates: Requirements 28.1, 28.2

### Property 7: Loading State Consistency
**All async operations must display loading indicators and disable interactions during loading.**

Formal: ∀ async_operation, operation.isLoading ⟹ (ui.showsLoadingIndicator ∧ ui.interactionsDisabled)

Validates: Requirements 24.1, 24.3, 24.4

### Property 8: Error Handling Completeness
**All API calls must handle errors gracefully and display user-friendly messages.**

Formal: ∀ api_call, api_call.catch(error) ⟹ ui.showsErrorMessage(error)

Validates: Requirements 25.1, 25.2, 25.5

### Property 9: Image Optimization
**All images must be optimized for mobile display with appropriate resolutions.**

Formal: ∀ image ∈ Images, image.resolution ≤ maxResolution(device.screenDensity)

Validates: Requirements 2.7, 21.5

### Property 10: Touch Target Minimum Size
**All interactive elements must meet minimum touch target size requirements.**

Formal: ∀ element ∈ InteractiveElements, element.width ≥ 44 ∧ element.height ≥ 44

Validates: Requirements 26.4

## Implementation Notes

1. **Shared Component Adaptation**
   - Not all web components from @darzi/shared-ui will work directly in React Native
   - Create React Native equivalents that maintain visual consistency
   - Use shared design tokens for colors, typography, spacing
   - Document any deviations from web components

2. **Platform-Specific Code**
   - Use Platform.select() for platform-specific styling
   - Implement platform-specific behaviors (iOS swipe back, Android hardware back)
   - Test on both iOS and Android devices
   - Handle platform-specific edge cases (safe areas, status bars)

3. **Performance Considerations**
   - Profile app performance regularly
   - Monitor bundle size and optimize as needed
   - Use React DevTools Profiler to identify bottlenecks
   - Implement lazy loading for heavy screens

4. **Development Workflow**
   - Use Expo Go for rapid development
   - Use EAS Build for production builds
   - Implement hot reloading for faster iteration
   - Use TypeScript for type safety

5. **Asset Management**
   - Import assets from @darzi/shared-assets
   - Optimize images for mobile (WebP format, appropriate sizes)
   - Use vector icons where possible (Expo Icons)
   - Implement image caching strategy

## Conclusion

This design provides a comprehensive blueprint for implementing the mobile app features. The architecture leverages Expo Router for navigation, React Context for state management, and adapts shared components for React Native. The implementation will maintain feature parity with the web app while providing a native mobile experience.
