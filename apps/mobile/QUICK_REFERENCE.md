# Mobile Development Quick Reference

## ✅ What's Been Fixed

1. **SafeAreaProvider** added to root layout
2. **Color system** aligned with web (Navy Blue theme)
3. **Typography** updated to match web (Outfit + Playfair Display)
4. **SafeAreaView** component created for consistent safe area handling
5. **Home screen** updated as reference implementation

## 🎨 New Color Palette (Aligned with Web)

```typescript
colors.primary           // #2B4162 (Navy Blue) - was green
colors.secondary         // #D9E2EC (Soft Lavender)
colors.accent            // #F4EDE4 (Gold/Cream)
colors.background        // #F5F7FA (Clean White)
colors.card              // #FFFFFF (White Cards)
colors.muted             // #F0F4F8 (Muted backgrounds)
colors.border            // #D9E2EC (Borders)
```

## 📝 Typography

```typescript
// Body text
fontFamily: typography.fontFamily.sans // 'Outfit'

// Headings
fontFamily: typography.fontFamily.serif // 'Playfair Display'
```

## 🛡️ Safe Area Patterns

### Pattern 1: Full Screen
```tsx
<SafeAreaView scrollable>
  {/* Content */}
</SafeAreaView>
```

### Pattern 2: Exclude Bottom (for tabs)
```tsx
<SafeAreaView edges={['top', 'left', 'right']}>
  {/* Content */}
</SafeAreaView>
```

### Pattern 3: Custom Background
```tsx
<SafeAreaView backgroundColor={colors.card}>
  {/* Content */}
</SafeAreaView>
```

## 🔧 Common Imports

```typescript
// Safe area
import { SafeAreaView } from '../components/shared';

// Theme
import { colors, typography, spacing, borderRadius, shadows } from '../../constants/theme';

// Responsive
import { ResponsiveContainer, ResponsiveText } from '../components/shared';
```

## 📱 Component Styling

### Button
```typescript
{
  backgroundColor: colors.primary,
  borderRadius: borderRadius.md,
  paddingVertical: 12,
  paddingHorizontal: 16,
  minHeight: 44, // Accessibility
}
```

### Card
```typescript
{
  backgroundColor: colors.card,
  borderRadius: borderRadius.lg,
  padding: spacing.md,
  borderWidth: 1,
  borderColor: colors.border,
  ...shadows.sm,
}
```

### Input
```typescript
{
  backgroundColor: colors.background,
  borderWidth: 1,
  borderColor: colors.input,
  borderRadius: borderRadius.md,
  paddingHorizontal: spacing.md,
  paddingVertical: spacing.sm,
  minHeight: 44,
}
```

### Text (Heading)
```typescript
{
  fontFamily: typography.fontFamily.serif,
  fontSize: typography.fontSize['2xl'],
  color: colors.primary,
  fontWeight: 'bold',
}
```

### Text (Body)
```typescript
{
  fontFamily: typography.fontFamily.sans,
  fontSize: typography.fontSize.base,
  color: colors.foreground,
}
```

## 🚀 Migration Steps (Per Screen)

1. Import `SafeAreaView`
2. Wrap content with `SafeAreaView`
3. Update colors to new theme
4. Update fonts (sans/serif)
5. Test on device with notch
6. Compare with web version

## 📋 Testing Checklist

- [ ] iPhone with notch (12+)
- [ ] iPhone with Dynamic Island (14 Pro+)
- [ ] Android gesture navigation
- [ ] Landscape orientation
- [ ] Keyboard interactions
- [ ] Side-by-side with web

## 🎯 Priority Screens

1. Home (`(tabs)/index.tsx`) ✅ DONE
2. Explore (`(tabs)/explore.tsx`)
3. Cart (`(tabs)/cart.tsx`)
4. Account (`(tabs)/account.tsx`)
5. Login (`(auth)/login.tsx`)
6. Signup (`(auth)/signup.tsx`)

## 📚 Documentation

- Full plan: `MOBILE_UI_ALIGNMENT_PLAN.md`
- Migration guide: `COMPONENT_MIGRATION_GUIDE.md`
- This reference: `QUICK_REFERENCE.md`

## 💡 Tips

- Always use theme colors, never hardcode
- Use `SafeAreaView` for all screens
- Match web spacing and sizing
- Test on real devices, not just simulator
- Use `ResponsiveText` for dynamic font scaling
- Minimum touch target: 44x44 points
