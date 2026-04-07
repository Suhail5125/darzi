# Implementation Plan: Cross-Platform App Structure

## Overview

This plan implements a cross-platform monorepo structure supporting React Native/Expo (mobile) and React/Vite (web) applications with shared packages for UI components, utilities, and assets. The implementation follows a bottom-up approach: first establishing the workspace foundation, then creating shared packages, and finally setting up the mobile app to integrate with existing web app.

## Tasks

- [x] 1. Set up root workspace configuration and TypeScript
  - [x] 1.1 Configure root package.json with workspaces
    - Add workspaces array for apps/* and packages/*
    - Add scripts for dev:mobile, dev:web, build:mobile, build:web, type-check
    - Add TypeScript as dev dependency
    - _Requirements: 5.1, 5.6, 6.1, 6.2, 6.3, 6.4_
  
  - [x] 1.2 Create root tsconfig.json
    - Set up base TypeScript configuration with strict mode
    - Configure module resolution for monorepo
    - Set jsx to react-jsx
    - _Requirements: 7.1_
  
  - [x] 1.3 Create base Tailwind configuration
    - Create tailwind.config.base.js with shared theme
    - Define color palette and font families
    - _Requirements: 8.3_

- [x] 2. Create shared-utils package
  - [x] 2.1 Initialize shared-utils package structure
    - Create packages/shared-utils directory
    - Create package.json with name @shared-utils
    - Create tsconfig.json extending root config
    - Create src directory with index.ts
    - _Requirements: 4.1, 4.3, 7.5_
  
  - [x] 2.2 Implement validation utilities
    - Create src/validation/index.ts
    - Implement validateEmail and validatePhone functions
    - Export from main index.ts
    - _Requirements: 4.1, 4.2, 12.4_
  
  - [x] 2.3 Implement formatting utilities
    - Create src/formatting/index.ts
    - Implement formatCurrency and formatDate functions
    - Export from main index.ts
    - _Requirements: 4.1, 4.2, 12.4_
  
  - [x] 2.4 Implement cross-platform configuration module
    - Create src/config/index.ts
    - Implement platform detection for Expo vs Vite environment variables
    - Export config object with apiUrl and environment
    - _Requirements: 4.4, 11.3, 11.4_

- [x] 3. Create shared-assets package
  - [x] 3.1 Initialize shared-assets package structure
    - Create packages/shared-assets directory
    - Create package.json with name @shared-assets
    - Create tsconfig.json extending root config
    - Create directories: images/, fonts/, icons/, src/
    - _Requirements: 3.1, 3.2, 7.6, 12.5_
  
  - [x] 3.2 Create asset type declarations
    - Create src/types.d.ts with module declarations for .png, .jpg, .svg, .ttf
    - _Requirements: 3.7_
  
  - [x] 3.3 Implement asset exports with platform detection
    - Create src/index.ts with Platform detection
    - Export images, icons, and fonts objects
    - Implement conditional exports for SVG (web) vs PNG (mobile) icons
    - _Requirements: 3.3, 3.6, 10.5, 10.6_
  
  - [x] 3.4 Add placeholder assets
    - Add sample logo.png and placeholder.png to images/
    - Add sample icon files (both SVG and PNG versions)
    - Add sample font files
    - _Requirements: 3.4, 3.5, 10.3, 10.4_

- [x] 4. Create shared-ui package
  - [x] 4.1 Initialize shared-ui package structure
    - Create packages/shared-ui directory
    - Create package.json with @shared-ui name and peer dependencies
    - Create tsconfig.json extending root config
    - Create src directory with index.ts
    - _Requirements: 2.3, 7.4_
  
  - [x] 4.2 Implement platform adapter utility
    - Create src/platform-adapter.ts
    - Implement Platform object with isNative, isWeb, and select methods
    - _Requirements: 2.2, 4.4_
  
  - [x] 4.3 Implement cross-platform Button component
    - Create src/components/Button.tsx
    - Use platform adapter to render TouchableOpacity (mobile) or button (web)
    - Support Tailwind classes compatible with NativeWind
    - Export from main index.ts
    - _Requirements: 2.1, 2.2, 2.4, 8.3, 12.3_
  
  - [x] 4.4 Implement cross-platform Card component
    - Create src/components/Card.tsx
    - Use platform adapter for View (mobile) or div (web)
    - Support Tailwind classes for styling
    - Export from main index.ts
    - _Requirements: 2.1, 2.2, 8.3, 12.3_
  
  - [x] 4.5 Implement cross-platform Input component
    - Create src/components/Input.tsx
    - Use platform adapter for TextInput (mobile) or input (web)
    - Support Tailwind classes for styling
    - Export from main index.ts
    - _Requirements: 2.1, 2.2, 8.3, 12.3_

- [x] 5. Checkpoint - Verify shared packages
  - Ensure all shared packages have correct package.json configurations
  - Verify TypeScript compilation works for all packages
  - Ask the user if questions arise

- [x] 6. Update web app for monorepo integration
  - [x] 6.1 Update web app package.json
    - Add workspace dependencies: @shared-ui, @shared-utils, @shared-assets
    - Ensure scripts for dev and build are present
    - _Requirements: 2.6, 5.2, 5.4_
  
  - [x] 6.2 Update web app tsconfig.json
    - Extend root tsconfig.json
    - Add path mappings for shared packages
    - Include DOM lib
    - _Requirements: 7.3, 7.7_
  
  - [x] 6.3 Update web app Tailwind configuration
    - Extend base Tailwind config
    - Include shared-ui components in content paths
    - _Requirements: 8.2, 8.6_
  
  - [x] 6.4 Create web routing structure
    - Create src/routes directory if not exists
    - Set up Wouter or React Router configuration
    - Create example HomePage and ProfilePage
    - _Requirements: 9.2, 9.5, 12.2_
  
  - [x] 6.5 Update web app to import from shared packages
    - Import and use components from @shared-ui
    - Import utilities from @shared-utils
    - Import assets from @shared-assets
    - _Requirements: 2.6, 4.5, 3.5_

- [x] 7. Initialize mobile app with Expo
  - [x] 7.1 Create mobile app directory and initialize Expo
    - Create apps/mobile directory
    - Initialize with Expo SDK using npx create-expo-app with TypeScript template
    - Use --template expo-template-blank-typescript flag
    - _Requirements: 1.1, 1.2_
  
  - [x] 7.2 Configure mobile app package.json
    - Add workspace dependencies: @shared-ui, @shared-utils, @shared-assets
    - Add NativeWind and Tailwind CSS dependencies
    - Add scripts for start, android, ios, build
    - _Requirements: 1.3, 1.5, 5.2, 5.4_
  
  - [x] 7.3 Create mobile app.json configuration
    - Configure app name, slug, version
    - Set up iOS and Android platform configurations
    - Add expo-router plugin
    - _Requirements: 1.4, 1.6_
  
  - [x] 7.4 Configure mobile app tsconfig.json
    - Extend root tsconfig.json
    - Set jsx to react-native
    - Add path mappings for shared packages
    - _Requirements: 7.2, 7.7_
  
  - [x] 7.5 Configure mobile app Tailwind and NativeWind
    - Create tailwind.config.js extending base config
    - Include shared-ui components in content paths
    - Configure NativeWind in babel.config.js
    - _Requirements: 1.3, 8.1, 8.5_

- [x] 8. Implement mobile app structure
  - [x] 8.1 Create mobile app directory structure
    - Create src/app directory for Expo Router routes
    - Create src/components and src/hooks directories
    - Create assets directory for Expo assets (icon, splash, adaptive-icon)
    - _Requirements: 1.7, 12.1_
  
  - [x] 8.2 Implement mobile root layout
    - Create src/app/_layout.tsx with Stack navigator
    - Configure root navigation structure
    - _Requirements: 9.1, 9.4_
  
  - [x] 8.3 Implement mobile tab navigation
    - Create src/app/(tabs) directory
    - Create src/app/(tabs)/_layout.tsx with Tabs navigator
    - Set up tab screens for index (Home) and profile
    - _Requirements: 9.1, 9.4_
  
  - [x] 8.4 Create mobile screens using shared components
    - Create src/app/(tabs)/index.tsx (Home screen)
    - Create src/app/(tabs)/profile.tsx (Profile screen)
    - Create src/app/+not-found.tsx (404 screen)
    - Import and use components from @shared-ui
    - Import utilities from @shared-utils
    - Import assets from @shared-assets
    - _Requirements: 2.5, 4.5, 3.4_

- [x] 9. Set up environment configuration
  - [x] 9.1 Create environment files for mobile
    - Create .env.development and .env.production in apps/mobile
    - Add EXPO_PUBLIC_API_URL and EXPO_PUBLIC_ENV variables
    - _Requirements: 11.1, 11.5_
  
  - [x] 9.2 Create environment files for web
    - Create .env.development and .env.production in apps/web
    - Add VITE_API_URL and VITE_ENV variables
    - _Requirements: 11.2, 11.6_
  
  - [x] 9.3 Verify environment configuration works
    - Test that config module from @shared-utils correctly reads environment variables
    - Verify different values for development and production
    - _Requirements: 11.3, 11.4_

- [x] 10. Final integration and verification
  - [x] 10.1 Install all dependencies
    - Run npm install at root to set up workspace
    - Verify hoisting of common dependencies
    - Verify workspace links are created
    - _Requirements: 5.3_
  
  - [x] 10.2 Verify development workflow
    - Test npm run dev:mobile starts Expo dev server
    - Test npm run dev:web starts Vite dev server
    - Verify hot module replacement works for both
    - _Requirements: 6.1, 6.2, 6.5_
  
  - [x] 10.3 Verify build workflow
    - Test npm run build:mobile creates mobile builds
    - Test npm run build:web creates web build
    - _Requirements: 6.3, 6.4_
  
  - [x] 10.4 Verify type checking across workspace
    - Run npm run type-check at root
    - Ensure TypeScript resolves workspace references correctly
    - Verify no type errors in any workspace
    - _Requirements: 6.6, 7.7_

- [x] 11. Final checkpoint
  - Ensure all tests pass and both apps run successfully
  - Verify shared components render correctly on both platforms
  - Verify assets load correctly on both platforms
  - Ask the user if questions arise

## Notes

- This implementation creates a complete monorepo structure from scratch
- The web app is assumed to exist and will be updated for monorepo integration
- Each task builds incrementally on previous tasks
- Checkpoints ensure validation at key milestones
- All tasks reference specific requirements for traceability
- Focus is on creating the minimal viable structure that satisfies all requirements
