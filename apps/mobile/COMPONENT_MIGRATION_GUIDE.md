# Mobile Component Migration Guide

## Overview
This guide helps migrate mobile components to match the web design system while maintaining proper safe area handling.

## Design System Alignment

### Color Usage
Replace old colors with new aligned colors:

```typescript
// OLD
import { colors } from '../../constants/theme';
backgroundColor: colors.primary // #2C5F2D (green)

// NEW
import { colors } from '../../constants/theme';
backgroundColor: colors.primary // #2B4162 (navy blue - matches web)
```

### Typography
```typescript
// OLD
fontFamily: typography.fontFamily.regular // 'Inter-Regular'

// NEW - For body text
fontFamily: typography.fontFamily.sans // 'Outfit'

// NEW - For headings
fontFamily: typography.fontFamily.serif // 'Playfair Display'
```

## Safe Area Implementation

### Pattern 1: Full Screen with Safe Areas
Use `SafeAreaView` for screens that need safe area on all edges:

```typescript
import { SafeAreaView } from '../components/shared';

export default function MyScreen() {
  return (
    <SafeAreaView scrollable>
      {/* Your content */}
    </SafeAreaView>
  );
}
```

### Pattern 2: Custom Safe Area Edges
For screens with custom navigation (e.g., tabs at bottom):

```typescript
<SafeAreaView edges={['top', 'left', 'right']}>
  {/* Content - bottom handled by tab bar */}
</SafeAreaView>
```

### Pattern 3: Scrollable Content
```typescript
<SafeAreaView scrollable edges={['top', 'bottom']}>
  {/* Scrollable content */}
</SafeAreaView>
```

### Pattern 4: Using ResponsiveContainer (Enhanced)
For responsive layouts with safe areas:

```typescript
import { ResponsiveContainer } from '../components/shared';

<ResponsiveContainer
  scrollable
  safeArea={true}
  horizontalPadding={true}
  maxWidth={1024}
>
  {/* Your content */}
</ResponsiveContainer>
```

## Component Style Updates

### Button Component
Update to match web button styles:

```typescript
// apps/mobile/src/components/shared/Button.tsx
import { colors, borderRadius, shadows } from '../../constants/theme';

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minHeight: 44, // Accessibility
    ...shadows.sm,
  },
  buttonText: {
    color: colors.primaryForeground,
    fontFamily: typography.fontFamily.sans,
    fontSize: typography.fontSize.sm,
    fontWeight: '500',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondary: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: 'transparent',
  },
});
```

### Card Component
```typescript
const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
});
```

### Input Component
```typescript
const styles = StyleSheet.create({
  input: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    minHeight: 44, // Accessibility
  },
  inputFocused: {
    borderColor: colors.ring,
    borderWidth: 2,
  },
});
```

## Screen Migration Checklist

For each screen file:

- [ ] Import `SafeAreaView` or `ResponsiveContainer`
- [ ] Wrap content with appropriate safe area component
- [ ] Update color references to new theme
- [ ] Update font families (sans for body, serif for headings)
- [ ] Ensure minimum touch targets (44x44)
- [ ] Test on devices with notches/dynamic island
- [ ] Test landscape orientation
- [ ] Verify keyboard avoidance

## Priority Order

### High Priority (User-Facing Screens)
1. `apps/mobile/src/app/(tabs)/index.tsx` - Home
2. `apps/mobile/src/app/(tabs)/explore.tsx` - Explore
3. `apps/mobile/src/app/(tabs)/cart.tsx` - Cart
4. `apps/mobile/src/app/(tabs)/account.tsx` - Account
5. `apps/mobile/src/app/(auth)/login.tsx` - Login
6. `apps/mobile/src/app/(auth)/signup.tsx` - Signup

### Medium Priority
7. `apps/mobile/src/app/dashboard.tsx`
8. `apps/mobile/src/app/products.tsx`
9. `apps/mobile/src/app/services.tsx`
10. `apps/mobile/src/app/booking.tsx`

### Low Priority (Info Pages)
11. `apps/mobile/src/app/about.tsx`
12. `apps/mobile/src/app/faq.tsx`
13. `apps/mobile/src/app/privacy.tsx`
14. `apps/mobile/src/app/terms.tsx`

## Testing Checklist

After migration:

- [ ] Test on iPhone with notch (iPhone 12+)
- [ ] Test on iPhone with Dynamic Island (iPhone 14 Pro+)
- [ ] Test on Android with gesture navigation
- [ ] Test landscape orientation
- [ ] Test with system font scaling (accessibility)
- [ ] Compare side-by-side with web version
- [ ] Verify color consistency
- [ ] Check spacing and padding
- [ ] Test keyboard interactions
- [ ] Verify tab bar doesn't overlap content

## Common Issues & Solutions

### Issue: Content hidden behind notch
**Solution**: Ensure `SafeAreaProvider` is at root and `SafeAreaView` wraps content

### Issue: Colors don't match web
**Solution**: Use new theme colors, not hardcoded hex values

### Issue: Tab bar overlaps content
**Solution**: Use `edges={['top', 'left', 'right']}` to exclude bottom

### Issue: Keyboard covers input
**Solution**: Use `KeyboardAvoidingView` with `SafeAreaView`

```typescript
<SafeAreaView>
  <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={{ flex: 1 }}
  >
    {/* Your form */}
  </KeyboardAvoidingView>
</SafeAreaView>
```

## Next Steps

1. Start with high-priority screens
2. Update one screen at a time
3. Test thoroughly on physical devices
4. Compare with web version for consistency
5. Document any platform-specific differences
