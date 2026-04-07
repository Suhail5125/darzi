# Requirements Document

## Introduction

This document specifies the requirements for porting the complete Darzi web application functionality to the mobile application. The mobile app will provide feature parity with the web app while adapting the user experience for mobile-native patterns including bottom tab navigation, native gestures, and mobile-optimized layouts. The implementation will leverage Expo Router for navigation, shared components from @darzi/shared-ui, and maintain consistency with the established brand and design system.

## Glossary

- **Mobile_App**: The React Native mobile application built with Expo
- **Web_App**: The existing React web application
- **Expo_Router**: File-based routing system for React Native apps
- **Tab_Navigator**: Bottom tab navigation component for primary app sections
- **Stack_Navigator**: Stack-based navigation for hierarchical screens
- **Shared_UI**: Component library package (@darzi/shared-ui) used across platforms
- **Authentication_Flow**: Login and signup process adapted for mobile
- **Service_Screen**: Mobile screen displaying garment care service information
- **Booking_Flow**: Multi-step process for scheduling services
- **Cart_System**: Shopping cart functionality for service selection
- **Dashboard**: User account overview and order management screen
- **Modal_Sheet**: Bottom sheet or modal presentation for mobile interactions

## Requirements

### Requirement 1: Mobile Navigation System

**User Story:** As a mobile user, I want intuitive navigation that follows mobile platform conventions, so that I can easily access all app features.

#### Acceptance Criteria

1. THE Mobile_App SHALL implement bottom Tab_Navigator with primary sections (Home, Explore, Cart, Account)
2. WHEN a user taps a tab icon, THE Mobile_App SHALL navigate to the corresponding screen
3. THE Mobile_App SHALL use Stack_Navigator for hierarchical navigation within each tab
4. WHEN a user navigates deeper into a section, THE Mobile_App SHALL display a back button
5. THE Mobile_App SHALL maintain navigation state when switching between tabs
6. THE Mobile_App SHALL support native gestures for navigation (swipe back on iOS, hardware back button on Android)

### Requirement 2: Home Screen

**User Story:** As a mobile user, I want to see the home screen with hero section, services, testimonials, and process steps, so that I understand the value proposition.

#### Acceptance Criteria

1. THE Mobile_App SHALL display a hero section with brand messaging and call-to-action buttons
2. THE Mobile_App SHALL render a scrollable grid of service categories with images and descriptions
3. WHEN a user taps a service category, THE Mobile_App SHALL navigate to the booking flow or login prompt
4. THE Mobile_App SHALL display testimonials in a horizontally scrollable carousel
5. THE Mobile_App SHALL show the process steps section with icons and descriptions
6. THE Mobile_App SHALL display trust indicators (turnaround time, quality guarantee, master tailors)
7. THE Mobile_App SHALL optimize all images for mobile screen sizes and resolutions

### Requirement 3: Authentication System

**User Story:** As a mobile user, I want to log in or sign up using mobile-optimized forms, so that I can access personalized features.

#### Acceptance Criteria

1. WHEN an unauthenticated user attempts to access protected features, THE Mobile_App SHALL present the Authentication_Flow
2. THE Mobile_App SHALL display login and signup forms in a Modal_Sheet or dedicated screen
3. THE Mobile_App SHALL provide email and password input fields with appropriate keyboard types
4. THE Mobile_App SHALL include password visibility toggle functionality
5. WHEN a user successfully authenticates, THE Mobile_App SHALL navigate to the Dashboard
6. THE Mobile_App SHALL persist authentication state across app sessions
7. THE Mobile_App SHALL provide a logout function accessible from the Account screen

### Requirement 4: Services Listing Screen

**User Story:** As a mobile user, I want to browse all available services with filtering options, so that I can find the service I need.

#### Acceptance Criteria

1. THE Mobile_App SHALL display all services in a scrollable list or grid layout
2. THE Mobile_App SHALL provide category filter buttons (All, Cleaning, Finishing, Tailoring)
3. WHEN a user selects a category filter, THE Mobile_App SHALL display only services matching that category
4. THE Mobile_App SHALL show service images, titles, descriptions, features, and pricing
5. WHEN a user taps a service card, THE Mobile_App SHALL navigate to the booking flow with pre-selected service
6. THE Mobile_App SHALL display service features with checkmark icons
7. THE Mobile_App SHALL optimize layout for both portrait and landscape orientations

### Requirement 5: Booking Flow

**User Story:** As a mobile user, I want to book services through a mobile-optimized form, so that I can schedule garment care conveniently.

#### Acceptance Criteria

1. THE Mobile_App SHALL display a booking form with fields for name, service selection, date, and special instructions
2. THE Mobile_App SHALL provide a native date picker for selecting preferred service date
3. THE Mobile_App SHALL validate all required fields before submission
4. WHEN a user submits a valid booking, THE Mobile_App SHALL display a confirmation message
5. THE Mobile_App SHALL pre-populate the service field if navigated from a specific service
6. THE Mobile_App SHALL use mobile-appropriate input components (dropdowns, date pickers, text areas)
7. WHEN booking is confirmed, THE Mobile_App SHALL navigate to the Dashboard

### Requirement 6: Shopping Cart

**User Story:** As a mobile user, I want to manage my cart with services, quantities, and checkout options, so that I can review my order before payment.

#### Acceptance Criteria

1. THE Mobile_App SHALL display cart items with service name, description, quantity, and price
2. THE Mobile_App SHALL provide increment and decrement buttons for adjusting quantities
3. THE Mobile_App SHALL include a remove button for each cart item
4. THE Mobile_App SHALL display delivery address with change option
5. THE Mobile_App SHALL provide coupon code input field with apply button
6. THE Mobile_App SHALL include tip selection with preset amounts and custom input
7. THE Mobile_App SHALL show delivery instructions with preset options and custom text area
8. THE Mobile_App SHALL calculate and display subtotal, tip, delivery fee, tax, and total
9. THE Mobile_App SHALL provide a checkout button that initiates payment flow
10. THE Mobile_App SHALL display previous orders section below cart summary

### Requirement 7: Dashboard Screen

**User Story:** As a mobile user, I want to view my account overview, active orders, and order history, so that I can track my garment care services.

#### Acceptance Criteria

1. THE Mobile_App SHALL display user greeting with name
2. THE Mobile_App SHALL show summary cards for active orders, completed orders, and total items
3. THE Mobile_App SHALL list recent orders with order ID, service type, status, date, and total
4. WHEN a user taps an order, THE Mobile_App SHALL display order details
5. THE Mobile_App SHALL display order status badges with appropriate colors (In Progress, Delivered, Picked Up)
6. THE Mobile_App SHALL provide a "Start New Order" button that navigates to booking
7. THE Mobile_App SHALL show account information section with profile access

### Requirement 8: Explore Screen

**User Story:** As a mobile user, I want to explore all services with filtering and detailed information, so that I can discover services that meet my needs.

#### Acceptance Criteria

1. THE Mobile_App SHALL display all services in a grid layout optimized for mobile
2. THE Mobile_App SHALL provide category filter chips at the top of the screen
3. WHEN a user selects a filter, THE Mobile_App SHALL update the displayed services
4. THE Mobile_App SHALL show service cards with images, titles, categories, descriptions, features, and pricing
5. WHEN a user taps a service card, THE Mobile_App SHALL navigate to booking with pre-selected service
6. THE Mobile_App SHALL display an empty state when no services match the filter
7. THE Mobile_App SHALL include a call-to-action section at the bottom encouraging bookings

### Requirement 9: Account Management Screen

**User Story:** As a mobile user, I want to manage my account settings, profile, addresses, and preferences, so that I can customize my experience.

#### Acceptance Criteria

1. THE Mobile_App SHALL display user profile information (name, email, avatar)
2. THE Mobile_App SHALL provide navigation to profile settings
3. THE Mobile_App SHALL include sections for addresses, payment methods, notifications, privacy, security, and help
4. WHEN a user taps a section, THE Mobile_App SHALL navigate to the corresponding settings screen
5. THE Mobile_App SHALL display social media links (Facebook, Instagram, X, WhatsApp)
6. THE Mobile_App SHALL provide a logout button at the bottom of the screen
7. WHEN a user taps logout, THE Mobile_App SHALL clear authentication state and navigate to home

### Requirement 10: About Screen

**User Story:** As a mobile user, I want to learn about Darzi's story, philosophy, and statistics, so that I understand the brand values.

#### Acceptance Criteria

1. THE Mobile_App SHALL display a hero section with brand messaging
2. THE Mobile_App SHALL show the company story with text and images
3. THE Mobile_App SHALL display statistics (garments perfected, turnaround time, eco-friendly percentage, master artisans)
4. THE Mobile_App SHALL optimize images and layout for mobile viewing
5. THE Mobile_App SHALL support vertical scrolling through all content sections

### Requirement 11: Contact Screen

**User Story:** As a mobile user, I want to contact Darzi through email, phone, or form submission, so that I can get assistance.

#### Acceptance Criteria

1. THE Mobile_App SHALL display contact information (email, phone, address) with icons
2. WHEN a user taps email, THE Mobile_App SHALL open the native email client
3. WHEN a user taps phone, THE Mobile_App SHALL open the native phone dialer
4. THE Mobile_App SHALL provide a contact form with name, email, and message fields
5. WHEN a user submits the form, THE Mobile_App SHALL send the inquiry and display confirmation
6. THE Mobile_App SHALL validate form fields before submission

### Requirement 12: Careers Screen

**User Story:** As a mobile user, I want to view open positions and company benefits, so that I can explore employment opportunities.

#### Acceptance Criteria

1. THE Mobile_App SHALL display a hero section describing career opportunities
2. THE Mobile_App SHALL show company benefits in a grid or list layout
3. THE Mobile_App SHALL list open positions with title, department, type, and description
4. WHEN a user taps "Apply Now", THE Mobile_App SHALL open email client with careers email
5. THE Mobile_App SHALL provide a section for general inquiries with email link
6. THE Mobile_App SHALL optimize layout for mobile screen sizes

### Requirement 13: Become Seller Screen

**User Story:** As a mobile user, I want to learn about partnership opportunities, so that I can join the Darzi network.

#### Acceptance Criteria

1. THE Mobile_App SHALL display partnership benefits in cards or sections
2. THE Mobile_App SHALL list partnership requirements
3. THE Mobile_App SHALL provide a contact section with email link for partnership inquiries
4. WHEN a user taps the email link, THE Mobile_App SHALL open native email client
5. THE Mobile_App SHALL optimize content layout for mobile viewing

### Requirement 14: Privacy Policy Screen

**User Story:** As a mobile user, I want to read the privacy policy, so that I understand how my data is handled.

#### Acceptance Criteria

1. THE Mobile_App SHALL display the complete privacy policy with sections
2. THE Mobile_App SHALL organize content into collapsible sections or scrollable content
3. THE Mobile_App SHALL show section icons and titles (Information Collection, Usage, Sharing, Security, Rights)
4. THE Mobile_App SHALL provide contact information for privacy inquiries
5. THE Mobile_App SHALL display last updated date
6. THE Mobile_App SHALL support vertical scrolling through all policy content

### Requirement 15: Terms of Service Screen

**User Story:** As a mobile user, I want to read the terms of service, so that I understand the service agreement.

#### Acceptance Criteria

1. THE Mobile_App SHALL display the complete terms of service with sections
2. THE Mobile_App SHALL organize content into readable sections (Acceptance, Service Description, Responsibilities, Liability, Pricing)
3. THE Mobile_App SHALL highlight important notices with visual distinction
4. THE Mobile_App SHALL provide contact information for legal inquiries
5. THE Mobile_App SHALL display last updated date
6. THE Mobile_App SHALL support vertical scrolling through all terms content

### Requirement 16: FAQ Screen

**User Story:** As a mobile user, I want to find answers to common questions, so that I can resolve issues without contacting support.

#### Acceptance Criteria

1. THE Mobile_App SHALL organize FAQs into categories (Service & Timing, Pickup & Delivery, Garment Care, Sustainability)
2. THE Mobile_App SHALL display category icons and titles
3. THE Mobile_App SHALL use accordion or expandable components for FAQ items
4. WHEN a user taps a question, THE Mobile_App SHALL expand to show the answer
5. THE Mobile_App SHALL collapse other expanded items when a new one is opened
6. THE Mobile_App SHALL provide a contact section for unanswered questions
7. THE Mobile_App SHALL optimize accordion interaction for touch interfaces

### Requirement 17: Our Craft Screen

**User Story:** As a mobile user, I want to learn about Darzi's craftsmanship and techniques, so that I appreciate the service quality.

#### Acceptance Criteria

1. THE Mobile_App SHALL display content about craftsmanship philosophy
2. THE Mobile_App SHALL show images and descriptions of techniques
3. THE Mobile_App SHALL optimize images for mobile display
4. THE Mobile_App SHALL support vertical scrolling through content
5. THE Mobile_App SHALL maintain brand visual identity and typography

### Requirement 18: Sustainability Screen

**User Story:** As a mobile user, I want to learn about Darzi's environmental practices, so that I can make informed choices.

#### Acceptance Criteria

1. THE Mobile_App SHALL display sustainability initiatives and practices
2. THE Mobile_App SHALL show environmental impact statistics
3. THE Mobile_App SHALL include images supporting sustainability messaging
4. THE Mobile_App SHALL optimize layout for mobile viewing
5. THE Mobile_App SHALL support vertical scrolling through content

### Requirement 19: Products Screen

**User Story:** As a mobile user, I want to browse available products, so that I can purchase garment care items.

#### Acceptance Criteria

1. THE Mobile_App SHALL display products in a grid layout
2. THE Mobile_App SHALL show product images, names, descriptions, and prices
3. WHEN a user taps a product, THE Mobile_App SHALL display product details
4. THE Mobile_App SHALL provide add to cart functionality
5. THE Mobile_App SHALL optimize product images for mobile display
6. THE Mobile_App SHALL support filtering or sorting if multiple products exist

### Requirement 20: Shared Component Integration

**User Story:** As a developer, I want to use shared components from @darzi/shared-ui, so that the mobile app maintains consistency with the web app.

#### Acceptance Criteria

1. THE Mobile_App SHALL import and use Button components from Shared_UI
2. THE Mobile_App SHALL import and use Card components from Shared_UI
3. THE Mobile_App SHALL import and use Form components from Shared_UI where compatible
4. THE Mobile_App SHALL import and use Input components from Shared_UI where compatible
5. THE Mobile_App SHALL adapt web-specific components for React Native when necessary
6. THE Mobile_App SHALL maintain visual consistency with web app design system
7. THE Mobile_App SHALL use shared typography and color tokens

### Requirement 21: Asset Management

**User Story:** As a developer, I want to use shared assets from @darzi/shared-assets, so that branding is consistent across platforms.

#### Acceptance Criteria

1. THE Mobile_App SHALL import images from @darzi/shared-assets
2. THE Mobile_App SHALL import icons from @darzi/shared-assets
3. THE Mobile_App SHALL import fonts from @darzi/shared-assets
4. THE Mobile_App SHALL optimize asset loading for mobile performance
5. THE Mobile_App SHALL use appropriate image resolutions for different screen densities

### Requirement 22: Utility Functions

**User Story:** As a developer, I want to use shared utilities from @darzi/shared-utils, so that business logic is consistent across platforms.

#### Acceptance Criteria

1. THE Mobile_App SHALL import and use utility functions from @darzi/shared-utils
2. THE Mobile_App SHALL use shared validation logic for forms
3. THE Mobile_App SHALL use shared formatting functions for dates, currency, and text
4. THE Mobile_App SHALL use shared constants and configuration values
5. THE Mobile_App SHALL maintain functional parity with web app utilities

### Requirement 23: Toast Notifications

**User Story:** As a mobile user, I want to receive feedback through toast notifications, so that I know when actions succeed or fail.

#### Acceptance Criteria

1. THE Mobile_App SHALL display toast notifications for successful actions
2. THE Mobile_App SHALL display toast notifications for errors
3. THE Mobile_App SHALL auto-dismiss toasts after appropriate duration
4. THE Mobile_App SHALL position toasts appropriately for mobile screens
5. THE Mobile_App SHALL support different toast types (success, error, info, warning)
6. THE Mobile_App SHALL use native-feeling toast animations

### Requirement 24: Loading States

**User Story:** As a mobile user, I want to see loading indicators during data fetching, so that I know the app is working.

#### Acceptance Criteria

1. WHEN data is being fetched, THE Mobile_App SHALL display loading indicators
2. THE Mobile_App SHALL use skeleton screens for content loading where appropriate
3. THE Mobile_App SHALL use spinners for action loading (button presses, form submissions)
4. THE Mobile_App SHALL disable interactive elements during loading states
5. THE Mobile_App SHALL provide appropriate loading feedback for all async operations

### Requirement 25: Error Handling

**User Story:** As a mobile user, I want clear error messages when something goes wrong, so that I can take corrective action.

#### Acceptance Criteria

1. WHEN an error occurs, THE Mobile_App SHALL display a user-friendly error message
2. THE Mobile_App SHALL provide retry options for failed network requests
3. THE Mobile_App SHALL display empty states when no data is available
4. THE Mobile_App SHALL handle offline scenarios gracefully
5. THE Mobile_App SHALL log errors for debugging purposes
6. THE Mobile_App SHALL prevent app crashes from unhandled errors

### Requirement 26: Responsive Layout

**User Story:** As a mobile user, I want the app to work well on different screen sizes, so that I have a good experience on any device.

#### Acceptance Criteria

1. THE Mobile_App SHALL adapt layouts for different screen sizes (small phones, large phones, tablets)
2. THE Mobile_App SHALL support both portrait and landscape orientations
3. THE Mobile_App SHALL use responsive spacing and sizing
4. THE Mobile_App SHALL ensure touch targets meet minimum size requirements (44x44 points)
5. THE Mobile_App SHALL optimize text sizes for readability on mobile screens
6. THE Mobile_App SHALL handle safe areas (notches, home indicators) appropriately

### Requirement 27: Performance Optimization

**User Story:** As a mobile user, I want the app to load quickly and run smoothly, so that I have a responsive experience.

#### Acceptance Criteria

1. THE Mobile_App SHALL lazy load images to improve initial load time
2. THE Mobile_App SHALL implement list virtualization for long scrollable lists
3. THE Mobile_App SHALL optimize bundle size by code splitting where appropriate
4. THE Mobile_App SHALL cache frequently accessed data
5. THE Mobile_App SHALL minimize re-renders through proper state management
6. THE Mobile_App SHALL achieve smooth 60fps scrolling and animations

### Requirement 28: Accessibility

**User Story:** As a mobile user with accessibility needs, I want the app to support assistive technologies, so that I can use all features.

#### Acceptance Criteria

1. THE Mobile_App SHALL provide accessibility labels for all interactive elements
2. THE Mobile_App SHALL support screen readers (VoiceOver on iOS, TalkBack on Android)
3. THE Mobile_App SHALL maintain sufficient color contrast ratios
4. THE Mobile_App SHALL support dynamic text sizing
5. THE Mobile_App SHALL provide keyboard navigation where applicable
6. THE Mobile_App SHALL announce important state changes to screen readers

### Requirement 29: Search Functionality

**User Story:** As a logged-in mobile user, I want to search for services and content, so that I can quickly find what I need.

#### Acceptance Criteria

1. WHEN a user is logged in, THE Mobile_App SHALL display a search input in the header or dedicated search screen
2. WHEN a user types in the search field, THE Mobile_App SHALL filter or search content
3. THE Mobile_App SHALL display search results in an appropriate format
4. THE Mobile_App SHALL provide search suggestions or autocomplete where applicable
5. THE Mobile_App SHALL handle empty search results with appropriate messaging

### Requirement 30: Location Display

**User Story:** As a logged-in mobile user, I want to see my selected location, so that I know which service area I'm using.

#### Acceptance Criteria

1. WHEN a user is logged in, THE Mobile_App SHALL display the current location (e.g., "Downtown")
2. THE Mobile_App SHALL provide a way to change the location
3. THE Mobile_App SHALL persist location selection across sessions
4. THE Mobile_App SHALL use location to filter available services if applicable
