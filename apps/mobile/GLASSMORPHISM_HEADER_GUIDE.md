# Glassmorphism Header Implementation Guide

## Overview
The new header features iOS-style glassmorphism (frosted glass effect) with a clean, modern layout.

## Layout Structure

```
┌─────────────────────────────────────────────────┐
│  [Logo]    [    Search Bar    ]    [🔔]        │  ← Glassmorphism
└─────────────────────────────────────────────────┘
    Left          Center              Right
```

## Features

### 1. Glassmorphism Effect
- Uses `expo-blur` with `BlurView` component
- Intensity: 80 (adjustable)
- Tint: light (for light theme)
- Semi-transparent white background
- Subtle border at bottom

### 2. Left Section - Logo
- App icon (40x40)
- Circular container with glass effect
- White background with transparency
- Subtle border

### 3. Center Section - Search Bar
- Flexible width (takes available space)
- Rounded pill shape (full border radius)
- Glass effect background
- Search icon on left
- Clear button when text entered
- Placeholder: "Search services..."

### 4. Right Section - Notification Bell
- Bell icon (24x24)
- Circular container with glass effect
- Badge for unread count
- Red badge with white border
- Shows "9+" for counts > 9

## Installation

### Step 1: Install expo-blur
```bash
cd apps/mobile
npx expo install expo-blur
```

### Step 2: Verify Installation
The package.json has been updated with:
```json
"expo-blur": "~14.0.1"
```

## Usage

### Basic Usage
```tsx
import { Header } from '../components/navigation';

<Header
  showSearch={true}
  showNotification={true}
  onNotificationPress={() => console.log('Notification pressed')}
  onSearchChange={(text) => console.log('Search:', text)}
  notificationCount={3}
/>
```

### With Back Button
```tsx
<Header
  showBack={true}
  showSearch={true}
  showNotification={true}
/>
```

### Custom Search Placeholder
```tsx
<Header
  showSearch={true}
  searchPlaceholder="Find your service..."
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `showBack` | boolean | false | Show back arrow instead of logo |
| `showSearch` | boolean | true | Show center search bar |
| `showNotification` | boolean | true | Show notification bell |
| `onNotificationPress` | function | - | Callback when bell pressed |
| `onSearchChange` | function | - | Callback when search text changes |
| `searchPlaceholder` | string | "Search services..." | Search input placeholder |
| `notificationCount` | number | 0 | Unread notification count |

## Styling Details

### Glass Effect
```typescript
backgroundColor: 'rgba(255, 255, 255, 0.7)'  // 70% white
borderWidth: 1
borderColor: 'rgba(43, 65, 98, 0.1)'         // 10% navy
```

### Logo Container
```typescript
width: 40
height: 40
borderRadius: 20                              // Perfect circle
backgroundColor: 'rgba(255, 255, 255, 0.8)'  // 80% white
```

### Search Bar
```typescript
flex: 1                                       // Takes available space
height: 40
borderRadius: borderRadius.full               // Pill shape
backgroundColor: 'rgba(255, 255, 255, 0.7)'
```

### Notification Badge
```typescript
backgroundColor: colors.destructive           // Red
borderRadius: 10
minWidth: 18
height: 18
borderWidth: 2
borderColor: '#fff'                          // White border
```

## Integration with SafeAreaView

The header is positioned absolutely and handles safe area internally:

```tsx
<SafeAreaView edges={['left', 'right', 'bottom']}>
  <Header />
  <View style={{ height: 100 }} /> {/* Spacer for fixed header */}
  <ScrollView>
    {/* Content */}
  </ScrollView>
</SafeAreaView>
```

Note: Don't include 'top' edge in SafeAreaView - header handles it.

## Customization

### Change Blur Intensity
```tsx
// In Header.tsx
<BlurView intensity={80} tint="light">  // Adjust 0-100
```

### Change Glass Opacity
```tsx
// In styles
backgroundColor: 'rgba(255, 255, 255, 0.7)'  // Adjust 0.0-1.0
```

### Dark Mode Support
```tsx
<BlurView intensity={80} tint="dark">  // For dark theme
backgroundColor: 'rgba(0, 0, 0, 0.7)'
```

## Platform Differences

### iOS
- Full glassmorphism effect
- Smooth blur
- Native feel

### Android
- BlurView works but may have performance impact
- Consider reducing intensity on older devices
- Fallback to solid background if needed

### Web
- BlurView not supported
- Falls back to semi-transparent background
- Still looks good with opacity

## Performance Tips

1. **Fixed Position**: Header is absolutely positioned, doesn't re-render with scroll
2. **Blur Intensity**: Lower values (60-70) perform better
3. **Memoization**: Consider memoizing if parent re-renders frequently

```tsx
const Header = React.memo(function Header({ ... }) {
  // Component code
});
```

## Accessibility

- All interactive elements have `accessibilityLabel`
- All buttons have `accessibilityRole="button"`
- Notification count announced to screen readers
- Minimum touch target: 40x40 (exceeds 44x44 requirement)

## Testing Checklist

- [ ] Logo displays correctly
- [ ] Search bar is functional
- [ ] Clear button appears/disappears
- [ ] Notification bell is tappable
- [ ] Badge shows correct count
- [ ] Badge shows "9+" for counts > 9
- [ ] Back button works (when showBack=true)
- [ ] Glass effect visible on device
- [ ] Safe area handled correctly
- [ ] Works on iPhone with notch
- [ ] Works on Android
- [ ] Keyboard doesn't cover search
- [ ] Scroll doesn't affect header position

## Troubleshooting

### Blur not showing
- Ensure expo-blur is installed: `npx expo install expo-blur`
- Restart development server
- Clear cache: `npx expo start -c`

### Header overlaps content
- Add spacer view below header (100px height)
- Ensure SafeAreaView excludes 'top' edge

### Badge not visible
- Check notificationCount prop is > 0
- Verify badge z-index and positioning

### Performance issues
- Reduce blur intensity
- Consider solid background on Android
- Profile with React DevTools

## Example Screens

### Home Screen
```tsx
<SafeAreaView edges={['left', 'right', 'bottom']}>
  <Header
    showSearch={true}
    showNotification={true}
    notificationCount={3}
  />
  <View style={{ height: 100 }} />
  <ScrollView>
    {/* Home content */}
  </ScrollView>
</SafeAreaView>
```

### Detail Screen
```tsx
<SafeAreaView edges={['left', 'right', 'bottom']}>
  <Header
    showBack={true}
    showSearch={false}
    showNotification={true}
  />
  <View style={{ height: 100 }} />
  <ScrollView>
    {/* Detail content */}
  </ScrollView>
</SafeAreaView>
```

### Search Screen
```tsx
<SafeAreaView edges={['left', 'right', 'bottom']}>
  <Header
    showSearch={true}
    showNotification={false}
    searchPlaceholder="Search products..."
    onSearchChange={handleSearch}
  />
  <View style={{ height: 100 }} />
  <SearchResults />
</SafeAreaView>
```

## Next Steps

1. Install expo-blur: `cd apps/mobile && npx expo install expo-blur`
2. Test on device (simulator may not show blur correctly)
3. Adjust blur intensity to your preference
4. Add notification handling logic
5. Implement search functionality
6. Apply to other screens

## Resources

- [expo-blur documentation](https://docs.expo.dev/versions/latest/sdk/blur-view/)
- [iOS Human Interface Guidelines - Materials](https://developer.apple.com/design/human-interface-guidelines/materials)
- [Glassmorphism Design Trend](https://uxdesign.cc/glassmorphism-in-user-interfaces-1f39bb1308c9)
