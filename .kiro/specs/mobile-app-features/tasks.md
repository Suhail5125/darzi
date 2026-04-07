# Implementation Plan: Mobile App Features

## Overview

This implementation plan breaks down the mobile app development into discrete, incremental tasks. Each task builds on previous work, starting with foundational setup, then implementing core features, and finally integrating all components. The plan follows the navigation architecture defined in the design document and ensures all 30 requirements are covered.

## Tasks

- [x] 1. Project setup and foundation
  - [x] 1.1 Initialize Expo project structure and install dependencies
    - Create Expo app with TypeScript template
    - Install required packages: expo-router, @darzi/shared-ui, @darzi/shared-utils, @darzi/shared-assets
    - Configure TypeScript and ESLint
    - Set up directory structure (app/, components/, contexts/, hooks/, services/, constants/, types/)
    - _Requirements: 20.1, 20.2, 21.1, 22.1_

  - [x] 1.2 Create design tokens and theme configuration
    - Create constants/theme.ts with colors, typography, spacing, shadows
    - Import design tokens from @darzi/shared-ui where applicable
    - Create constants/config.ts for app configuration
    - _Requirements: 20.6, 20.7_

  - [x] 1.3 Set up core contexts and providers
    - Create contexts/AuthContext.tsx with authentication state management
    - Create contexts/CartContext.tsx with cart state management
    - Create contexts/ToastContext.tsx with toast notification management
    - Create app/_layout.tsx root layout with context providers
    - _Requirements: 3.6, 6.1, 23.1_

  - [x] 1.4 Create shared UI components adapted for React Native
    - Create components/shared/Button.tsx (adapted from @darzi/shared-ui)
    - Create components/shared/Card.tsx (adapted from @darzi/shared-ui)
    - Create components/shared/Input.tsx (adapted from @darzi/shared-ui)
    - Create components/shared/Toast.tsx for notifications
    - Create components/shared/LoadingSpinner.tsx
    - Create components/shared/Skeleton.tsx for loading states
    - Create components/shared/ErrorBoundary.tsx
    - _Requirements: 20.1, 20.2, 20.3, 20.4, 20.5, 23.1, 24.1, 24.2_

  - [ ]* 1.5 Write property test for shared components
    - **Property 10: Touch Target Minimum Size**
    - **Validates: Requirements 26.4**
    - Test that all Button components meet 44x44 minimum size

- [x] 2. Navigation infrastructure
  - [x] 2.1 Create tab navigator layout
    - Create app/(tabs)/_layout.tsx with bottom tab navigator
    - Configure 4 tabs: Home, Explore, Cart, Account
    - Create components/navigation/TabBar.tsx custom tab bar
    - Add tab icons and labels
    - Implement badge support for cart count
    - Handle safe areas for devices with home indicators
    - _Requirements: 1.1, 1.2, 1.5_

  - [x] 2.2 Create authentication stack layout
    - Create app/(auth)/_layout.tsx for auth screens
    - Configure stack navigator for login and signup
    - _Requirements: 3.1, 3.2_

  - [x] 2.3 Create custom header component
    - Create components/navigation/Header.tsx
    - Support back button, search input, location display, custom right actions
    - Handle safe areas for notches
    - _Requirements: 1.4, 29.1, 30.1_

  - [ ]* 2.4 Write property test for navigation
    - **Property 1: Navigation State Consistency**
    - **Validates: Requirements 1.4, 1.5, 1.6**
    - Test that navigation actions maintain consistent state and allow back navigation

- [x] 3. Authentication system
  - [x] 3.1 Create authentication service and storage
    - Create services/storage.ts AsyncStorage wrapper
    - Create services/auth.ts with login, signup, logout methods
    - Create services/api.ts API client with auth token management
    - _Requirements: 3.6, 22.1_

  - [x] 3.2 Implement login screen
    - Create app/(auth)/login.tsx
    - Create login form with email and password inputs
    - Add password visibility toggle
    - Implement form validation
    - Add loading state and error display
    - Add "Forgot password" and "Sign up" links
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 3.3 Implement signup screen
    - Create app/(auth)/signup.tsx
    - Create signup form with name, email, password, confirm password inputs
    - Implement form validation
    - Add terms acceptance checkbox
    - Add loading state and error display
    - Add "Login" link
    - _Requirements: 3.2, 3.3, 3.4_

  - [x] 3.4 Implement authentication flow logic
    - Implement login function in AuthContext
    - Implement signup function in AuthContext
    - Implement logout function in AuthContext
    - Add token persistence in AsyncStorage
    - Add automatic navigation after successful auth
    - _Requirements: 3.5, 3.6, 3.7_

  - [ ]* 3.5 Write property test for authentication
    - **Property 2: Authentication State Persistence**
    - **Validates: Requirements 3.6**
    - Test that auth state persists across app sessions

  - [ ]* 3.6 Write property test for form validation
    - **Property 4: Form Validation Completeness**
    - **Validates: Requirements 5.3, 11.6**
    - Test that all forms validate required fields before submission

- [x] 4. Home screen implementation
  - [x] 4.1 Create home screen components
    - Create components/home/HeroSection.tsx with background image and CTA
    - Create components/home/ServiceGrid.tsx with 2-column grid
    - Create components/home/TestimonialCarousel.tsx with horizontal scroll
    - Create components/home/ProcessSteps.tsx with numbered steps
    - Create components/home/TrustIndicators.tsx with trust badges
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6_

  - [x] 4.2 Implement home screen layout
    - Create app/(tabs)/index.tsx
    - Integrate all home components in scroll view
    - Add pull-to-refresh functionality
    - Implement navigation to booking on service tap
    - Handle authentication check before booking
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6_

  - [ ]* 4.3 Write property test for image optimization
    - **Property 9: Image Optimization**
    - **Validates: Requirements 2.7, 21.5**
    - Test that all images use appropriate resolutions for screen densities

- [x] 5. Services and booking flow
  - [x] 5.1 Create services screen
    - Create app/services.tsx
    - Display services in scrollable list/grid
    - Add category filter buttons (All, Cleaning, Finishing, Tailoring)
    - Implement filter logic
    - Show service cards with images, titles, descriptions, features, pricing
    - Add navigation to booking on service tap
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7_

  - [x] 5.2 Create booking form components
    - Create components/booking/BookingForm.tsx
    - Create components/booking/DatePicker.tsx with native date picker
    - Add form fields: name, service selection, date, special instructions
    - Implement form validation
    - _Requirements: 5.1, 5.2, 5.3, 5.6_

  - [x] 5.3 Implement booking screen
    - Create app/booking.tsx
    - Integrate BookingForm component
    - Handle pre-selected service from navigation params
    - Implement form submission
    - Show confirmation message on success
    - Navigate to dashboard after booking
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 5.7_

  - [ ]* 5.4 Write unit tests for booking validation
    - Test required field validation
    - Test date picker constraints
    - Test service pre-selection
    - _Requirements: 5.3, 5.5_

- [x] 6. Shopping cart implementation
  - [x] 6.1 Create cart components
    - Create components/cart/CartItem.tsx with quantity controls and remove button
    - Create components/cart/CartSummary.tsx with cost breakdown
    - Create components/cart/TipSelector.tsx with preset and custom options
    - Create components/cart/DeliveryInstructions.tsx with presets and custom input
    - _Requirements: 6.1, 6.2, 6.3, 6.5, 6.6, 6.7_

  - [x] 6.2 Implement cart context logic
    - Implement addItem, removeItem, updateQuantity, clearCart in CartContext
    - Add cart persistence in AsyncStorage
    - Calculate subtotal, tip, delivery fee, tax, total
    - _Requirements: 6.1, 6.2, 6.3, 6.8_

  - [x] 6.3 Implement cart screen
    - Create app/(tabs)/cart.tsx
    - Display cart items list
    - Add delivery address section with change option
    - Add coupon code input with apply button
    - Integrate TipSelector component
    - Integrate DeliveryInstructions component
    - Display CartSummary
    - Add checkout button
    - Show previous orders section
    - Display empty state for empty cart
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6, 6.7, 6.8, 6.9, 6.10_

  - [ ]* 6.4 Write property test for cart operations
    - **Property 3: Cart State Consistency**
    - **Validates: Requirements 6.1, 6.2, 6.3, 6.8**
    - Test that cart operations maintain correct totals and data consistency

- [x] 7. Dashboard and order management
  - [x] 7.1 Create dashboard components
    - Create components/dashboard/SummaryCards.tsx with active, completed, total items
    - Create components/dashboard/OrderList.tsx with scrollable order list
    - Create components/dashboard/OrderCard.tsx with order details and status badge
    - _Requirements: 7.2, 7.3, 7.5_

  - [x] 7.2 Implement dashboard screen
    - Create app/dashboard.tsx
    - Display user greeting with name
    - Show SummaryCards component
    - Display OrderList component
    - Add "Start New Order" button navigating to booking
    - Show account information section
    - Add pull-to-refresh functionality
    - Display empty state for no orders
    - _Requirements: 7.1, 7.2, 7.3, 7.4, 7.5, 7.6, 7.7_

  - [ ]* 7.3 Write unit tests for order display
    - Test order status badge colors
    - Test order list rendering
    - Test empty state display
    - _Requirements: 7.3, 7.5_

- [x] 8. Explore screen implementation
  - [x] 8.1 Create explore components
    - Create components/explore/ServiceCard.tsx with image, title, category, features, pricing
    - Create components/explore/CategoryFilters.tsx with horizontal scrollable chips
    - _Requirements: 8.4, 8.2_

  - [x] 8.2 Implement explore screen
    - Create app/(tabs)/explore.tsx
    - Display CategoryFilters at top
    - Show services in grid layout optimized for mobile
    - Implement filter logic
    - Add navigation to booking on service tap
    - Display empty state when no services match filter
    - Add call-to-action section at bottom
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [ ]* 8.3 Write unit tests for filtering
    - Test category filter logic
    - Test empty state display
    - Test service card rendering
    - _Requirements: 8.3, 8.6_

- [x] 9. Account management
  - [x] 9.1 Create account components
    - Create components/account/ProfileHeader.tsx with avatar, name, email
    - Create components/account/SettingsSection.tsx with list of settings items
    - Create components/account/SocialLinks.tsx with social media icons
    - _Requirements: 9.1, 9.3, 9.5_

  - [x] 9.2 Implement account screen
    - Create app/(tabs)/account.tsx
    - Display ProfileHeader component
    - Add navigation sections: profile settings, addresses, payment methods, notifications, privacy, security, help
    - Display SocialLinks component
    - Add logout button at bottom
    - Implement logout functionality
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [ ]* 9.3 Write unit tests for account navigation
    - Test navigation to settings screens
    - Test logout functionality
    - Test social link interactions
    - _Requirements: 9.4, 9.7_

- [x] 10. Checkpoint - Core features complete
  - Ensure all tests pass, ask the user if questions arise.

- [x] 11. Content screens - About, Contact, Careers
  - [x] 11.1 Implement About screen
    - Create app/about.tsx
    - Display hero section with brand messaging
    - Show company story with text and images
    - Display statistics (garments perfected, turnaround time, eco-friendly %, master artisans)
    - Optimize images and layout for mobile
    - Support vertical scrolling
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5_

  - [x] 11.2 Implement Contact screen
    - Create app/contact.tsx
    - Display contact information (email, phone, address) with icons
    - Implement email link opening native email client
    - Implement phone link opening native phone dialer
    - Create contact form with name, email, message fields
    - Implement form validation and submission
    - Display confirmation on successful submission
    - _Requirements: 11.1, 11.2, 11.3, 11.4, 11.5, 11.6_

  - [x] 11.3 Implement Careers screen
    - Create app/careers.tsx
    - Display hero section describing career opportunities
    - Show company benefits in grid/list layout
    - List open positions with title, department, type, description
    - Add "Apply Now" buttons opening email client
    - Provide general inquiries section with email link
    - Optimize layout for mobile
    - _Requirements: 12.1, 12.2, 12.3, 12.4, 12.5, 12.6_

  - [ ]* 11.4 Write unit tests for contact form
    - Test form validation
    - Test email and phone link functionality
    - Test form submission
    - _Requirements: 11.6_

- [x] 12. Content screens - Partnership and Legal
  - [x] 12.1 Implement Become Seller screen
    - Create app/become-seller.tsx
    - Display partnership benefits in cards/sections
    - List partnership requirements
    - Provide contact section with email link
    - Implement email link opening native email client
    - Optimize content layout for mobile
    - _Requirements: 13.1, 13.2, 13.3, 13.4, 13.5_

  - [x] 12.2 Implement Privacy Policy screen
    - Create app/privacy.tsx
    - Display complete privacy policy with sections
    - Organize content into collapsible sections or scrollable content
    - Show section icons and titles (Information Collection, Usage, Sharing, Security, Rights)
    - Provide contact information for privacy inquiries
    - Display last updated date
    - Support vertical scrolling
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6_

  - [x] 12.3 Implement Terms of Service screen
    - Create app/terms.tsx
    - Display complete terms of service with sections
    - Organize content into readable sections (Acceptance, Service Description, Responsibilities, Liability, Pricing)
    - Highlight important notices with visual distinction
    - Provide contact information for legal inquiries
    - Display last updated date
    - Support vertical scrolling
    - _Requirements: 15.1, 15.2, 15.3, 15.4, 15.5, 15.6_

- [x] 13. Content screens - FAQ and Brand
  - [x] 13.1 Create FAQ components
    - Create components/faq/AccordionItem.tsx with expand/collapse animation
    - Add chevron indicator and touch feedback
    - _Requirements: 16.3, 16.4, 16.7_

  - [x] 13.2 Implement FAQ screen
    - Create app/faq.tsx
    - Organize FAQs into categories (Service & Timing, Pickup & Delivery, Garment Care, Sustainability)
    - Display category icons and titles
    - Use AccordionItem for FAQ items
    - Implement expand/collapse logic (collapse others when one opens)
    - Provide contact section for unanswered questions
    - _Requirements: 16.1, 16.2, 16.3, 16.4, 16.5, 16.6, 16.7_

  - [x] 13.3 Implement Our Craft screen
    - Create app/our-craft.tsx
    - Display content about craftsmanship philosophy
    - Show images and descriptions of techniques
    - Optimize images for mobile display
    - Support vertical scrolling
    - Maintain brand visual identity and typography
    - _Requirements: 17.1, 17.2, 17.3, 17.4, 17.5_

  - [x] 13.4 Implement Sustainability screen
    - Create app/sustainability.tsx
    - Display sustainability initiatives and practices
    - Show environmental impact statistics
    - Include images supporting sustainability messaging
    - Optimize layout for mobile viewing
    - Support vertical scrolling
    - _Requirements: 18.1, 18.2, 18.3, 18.4, 18.5_

  - [x] 13.5 Implement Products screen
    - Create app/products.tsx
    - Display products in grid layout
    - Show product images, names, descriptions, prices
    - Add navigation to product details on tap
    - Provide add to cart functionality
    - Optimize product images for mobile display
    - Support filtering or sorting if multiple products exist
    - _Requirements: 19.1, 19.2, 19.3, 19.4, 19.5, 19.6_

  - [ ]* 13.6 Write unit tests for accordion behavior
    - Test expand/collapse functionality
    - Test single-item expansion logic
    - Test touch interactions
    - _Requirements: 16.4, 16.5_

- [x] 14. Search and location features
  - [x] 14.1 Implement search functionality
    - Add search input to header component (shown when logged in)
    - Create hooks/useSearch.ts for search logic
    - Implement search filtering for services and content
    - Display search results in appropriate format
    - Provide search suggestions or autocomplete
    - Handle empty search results with messaging
    - _Requirements: 29.1, 29.2, 29.3, 29.4, 29.5_

  - [x] 14.2 Implement location display and selection
    - Add location display to header (shown when logged in)
    - Create hooks/useLocation.ts for location management
    - Implement location change functionality
    - Add location persistence in AsyncStorage
    - Use location to filter available services if applicable
    - _Requirements: 30.1, 30.2, 30.3, 30.4_

  - [ ]* 14.3 Write unit tests for search and location
    - Test search filtering logic
    - Test location persistence
    - Test empty search results
    - _Requirements: 29.2, 29.5, 30.3_

- [x] 15. Toast notifications and feedback
  - [x] 15.1 Implement toast notification system
    - Complete Toast component with animations
    - Implement ToastContext with queue support
    - Add auto-dismiss functionality
    - Support different toast types (success, error, info, warning)
    - Position toasts appropriately for mobile screens
    - Handle safe areas
    - _Requirements: 23.1, 23.2, 23.3, 23.4, 23.5, 23.6_

  - [x] 15.2 Integrate toasts throughout app
    - Add success toasts for successful actions (booking, cart operations, form submissions)
    - Add error toasts for failed operations
    - Add info toasts for informational messages
    - _Requirements: 23.1, 23.2_

  - [ ]* 15.3 Write unit tests for toast system
    - Test toast display and dismissal
    - Test toast queue functionality
    - Test different toast types
    - _Requirements: 23.1, 23.2, 23.3_

- [x] 16. Loading states and error handling
  - [x] 16.1 Implement loading states
    - Add loading indicators for data fetching operations
    - Implement skeleton screens for content loading (home, explore, dashboard)
    - Add spinners for action loading (button presses, form submissions)
    - Disable interactive elements during loading states
    - _Requirements: 24.1, 24.2, 24.3, 24.4, 24.5_

  - [x] 16.2 Implement error handling
    - Add user-friendly error messages for all error scenarios
    - Provide retry options for failed network requests
    - Display empty states when no data is available
    - Handle offline scenarios gracefully
    - Add error logging for debugging
    - Ensure ErrorBoundary prevents app crashes
    - _Requirements: 25.1, 25.2, 25.3, 25.4, 25.5, 25.6_

  - [ ]* 16.3 Write property test for loading states
    - **Property 7: Loading State Consistency**
    - **Validates: Requirements 24.1, 24.3, 24.4**
    - Test that async operations show loading indicators and disable interactions

  - [ ]* 16.4 Write property test for error handling
    - **Property 8: Error Handling Completeness**
    - **Validates: Requirements 25.1, 25.2, 25.5**
    - Test that all API calls handle errors and display messages

- [x] 17. Responsive layout and accessibility
  - [x] 17.1 Implement responsive layouts
    - Adapt layouts for different screen sizes (small phones, large phones, tablets)
    - Support both portrait and landscape orientations
    - Use responsive spacing and sizing throughout app
    - Ensure touch targets meet 44x44 minimum size
    - Optimize text sizes for readability
    - Handle safe areas (notches, home indicators) appropriately
    - _Requirements: 26.1, 26.2, 26.3, 26.4, 26.5, 26.6_

  - [x] 17.2 Implement accessibility features
    - Add accessibility labels to all interactive elements
    - Set appropriate accessibilityRole for all components
    - Ensure sufficient color contrast ratios
    - Support dynamic text sizing
    - Add keyboard navigation where applicable
    - Announce important state changes to screen readers
    - _Requirements: 28.1, 28.2, 28.3, 28.4, 28.5, 28.6_

  - [ ]* 17.3 Write property test for responsive layout
    - **Property 5: Responsive Layout Adaptation**
    - **Validates: Requirements 26.1, 26.2, 26.3**
    - Test that screens adapt correctly for different viewports

  - [ ]* 17.4 Write property test for accessibility
    - **Property 6: Accessibility Label Completeness**
    - **Validates: Requirements 28.1, 28.2**
    - Test that all interactive elements have accessibility labels

- [x] 18. Performance optimization
  - [x] 18.1 Implement image optimization
    - Use Expo Image component with caching
    - Implement lazy loading for images below the fold
    - Use appropriate image resolutions for screen densities
    - Add progressive loading with placeholders
    - _Requirements: 27.1, 21.4_

  - [x] 18.2 Implement list virtualization
    - Use FlatList for long lists (orders, services, products)
    - Implement getItemLayout for fixed-height items
    - Use keyExtractor for stable keys
    - Optimize windowSize
    - _Requirements: 27.2_

  - [x] 18.3 Optimize state management and rendering
    - Add React.memo to components that don't need frequent re-renders
    - Use useCallback and useMemo appropriately
    - Ensure proper dependency arrays
    - Minimize context updates
    - _Requirements: 27.5_

  - [x] 18.4 Implement caching strategy
    - Cache frequently accessed data in AsyncStorage
    - Implement cache invalidation logic
    - Add offline data access
    - _Requirements: 27.4_

  - [ ]* 18.5 Write performance tests
    - Test list scrolling performance
    - Test image loading performance
    - Test app bundle size
    - _Requirements: 27.1, 27.2, 27.3_

- [x] 19. Checkpoint - All features implemented
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 20. Integration and polish
  - [ ] 20.1 Wire all navigation flows
    - Ensure all screens are properly connected
    - Test navigation from home to all screens
    - Test deep linking if configured
    - Verify back navigation works correctly
    - Test tab switching maintains state
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 1.6_

  - [ ] 20.2 Configure app metadata
    - Update app.json with app name, version, icons, splash screen
    - Configure iOS and Android specific settings
    - Set up deep linking configuration
    - Configure environment variables
    - _Requirements: All_

  - [ ] 20.3 Test authentication flows end-to-end
    - Test login flow
    - Test signup flow
    - Test logout flow
    - Test protected route access
    - Test token persistence and refresh
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_

  - [ ] 20.4 Test booking and cart flows end-to-end
    - Test booking from home screen
    - Test booking from explore screen
    - Test cart operations (add, remove, update)
    - Test checkout flow
    - Test order confirmation
    - _Requirements: 5.1-5.7, 6.1-6.10_

  - [ ] 20.5 Test all content screens
    - Navigate to and verify all content screens render correctly
    - Test all external links (email, phone, social media)
    - Test all forms submit correctly
    - Verify all images load properly
    - _Requirements: 10.1-19.6_

  - [ ]* 20.6 Write integration tests for critical flows
    - Test authentication flow
    - Test booking flow
    - Test cart and checkout flow
    - Test navigation flows
    - _Requirements: 3.1-3.7, 5.1-5.7, 6.1-6.10_

- [ ] 21. Final testing and optimization
  - [ ] 21.1 Test on multiple devices and screen sizes
    - Test on small phones (iPhone SE, small Android)
    - Test on large phones (iPhone Pro Max, large Android)
    - Test on tablets (iPad, Android tablet)
    - Test in portrait and landscape orientations
    - _Requirements: 26.1, 26.2_

  - [ ] 21.2 Test accessibility with screen readers
    - Test with VoiceOver on iOS
    - Test with TalkBack on Android
    - Verify all interactive elements are accessible
    - Test with large text sizes
    - _Requirements: 28.1, 28.2, 28.4_

  - [ ] 21.3 Performance profiling and optimization
    - Profile app with React DevTools Profiler
    - Identify and fix performance bottlenecks
    - Optimize bundle size
    - Test app performance on low-end devices
    - Verify 60fps scrolling and animations
    - _Requirements: 27.1, 27.2, 27.3, 27.5, 27.6_

  - [ ] 21.4 Final polish and bug fixes
    - Fix any remaining bugs
    - Polish animations and transitions
    - Ensure consistent styling across all screens
    - Verify all error messages are user-friendly
    - Test offline functionality
    - _Requirements: All_

- [ ] 22. Final checkpoint - Production ready
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- Integration tests validate end-to-end user flows
- The implementation uses TypeScript with React Native and Expo
- All shared packages (@darzi/shared-ui, @darzi/shared-utils, @darzi/shared-assets) are integrated throughout
- The navigation architecture uses Expo Router with tab and stack navigators
- State management uses React Context API with hooks
- All 30 requirements are covered across the implementation tasks
