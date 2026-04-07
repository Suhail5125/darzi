# Mobile UI Alignment & Safe Area Implementation Plan

## Current Issues Identified

### 1. Design System Mismatch
- **Web**: Uses HSL-based color system with CSS variables (--primary, --secondary, etc.)
- **Mobile**: Uses hardcoded hex colors in theme.ts (#2C5F2D, #97BC62, etc.)
- **Result**: Completely different visual appearance between platforms

### 2. Safe Area Handling
- Mobile uses `useSafeAreaInsets` from `react-native-safe-area-context`
- Not consistently applied across all screens
- No SafeAreaProvider wrapper in root layout

### 3. Component Library Gap
- Web uses `@darzi/shared-ui` components (Button, Sheet, Dialog, etc.)
- Mobile has custom implementations that don't match web styling
- Shared-ui has platform adapter but mobile isn't using it

### 4. Typography Mismatch
- **Web**: Uses 'Outfit' (sans) and 'Playfair Display' (serif)
- **Mobile**: Uses 'Inter' family
- Font sizes and spacing differ

## Solution Strategy

### Phase 1: Unified Design Tokens
Create a shared design token system that works for both platforms

### Phase 2: Safe Area Implementation
Properly implement safe area handling across all mobile screens

### Phase 3: Component Alignment
Align mobile components with web design system

### Phase 4: Cross-Platform Component Library
Enhance shared-ui to support React Native properly

## Implementation Details

### 1. Unified Color System
```typescript
// packages/shared-ui/src/tokens/colors.ts
export const colors = {
  // HSL values that can be converted to RGB for React Native
  primary: { h: 222, s: 47, l: 31 },      // Navy Blue
  secondary: { h: 215, s: 25, l: 90 },    // Soft Lavender
  accent: { h: 38, s: 45, l: 90 },        // Gold/Cream
  background: { h: 210, s: 20, l: 98 },   // Clean White
  // ... etc
};

// Helper to convert HSL to hex for React Native
export const hslToHex = (h: number, s: number, l: number) => { ... };
```

### 2. Safe Area Provider Setup
```typescript
// apps/mobile/src/app/_layout.tsx
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ErrorBoundary>
        {/* ... rest of providers */}
      </ErrorBoundary>
    </SafeAreaProvider>
  );
}
```

### 3. Typography Alignment
```typescript
// Update mobile theme to match web fonts
export const typography = {
  fontFamily: {
    sans: 'Outfit',        // Match web
    serif: 'Playfair Display', // Match web
    // Fallbacks for React Native
  },
  // ... rest
};
```

### 4. Component Wrapper Pattern
```typescript
// packages/shared-ui/src/components/Button.tsx
import { Platform } from '../platform-adapter';

export const Button = Platform.select({
  web: () => require('./Button.web').Button,
  native: () => require('./Button.native').Button,
})();
```

## Quick Wins (Immediate Actions)

1. **Add SafeAreaProvider** to mobile root layout
2. **Update mobile theme colors** to match web HSL values
3. **Fix ResponsiveContainer** to use safe areas consistently
4. **Update typography** to match web fonts
5. **Create SafeAreaView wrapper** for all screens

## Files to Modify

### High Priority
- `apps/mobile/src/app/_layout.tsx` - Add SafeAreaProvider
- `apps/mobile/src/constants/theme.ts` - Update colors to match web
- `apps/mobile/src/components/shared/ResponsiveContainer.tsx` - Enhance safe area handling
- All screen files in `apps/mobile/src/app/` - Wrap with SafeAreaView

### Medium Priority
- `packages/shared-ui/src/platform-adapter.ts` - Enhance platform detection
- Create `packages/shared-ui/src/tokens/` - Shared design tokens
- Mobile component files - Align styling with web

### Low Priority
- Font loading setup for mobile
- Advanced cross-platform components
- Shared animation system
