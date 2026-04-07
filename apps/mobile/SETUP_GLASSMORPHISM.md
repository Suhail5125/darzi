# Quick Setup: Glassmorphism Header

## What's Been Done ✅

1. **Header Component Updated** (`src/components/navigation/Header.tsx`)
   - Added glassmorphism effect with BlurView
   - New layout: Logo (left) | Search (center) | Notification (right)
   - Notification badge with count
   - iOS-style frosted glass appearance

2. **Home Screen Updated** (`src/app/(tabs)/index.tsx`)
   - Integrated new header
   - Added proper spacing for fixed header
   - Updated SafeAreaView edges

3. **Package.json Updated**
   - Added `expo-blur: ~14.0.1`

## Installation Steps

### 1. Install Dependencies
```bash
cd apps/mobile
npx expo install expo-blur
```

### 2. Restart Development Server
```bash
npx expo start -c
```

### 3. Test on Device
The glassmorphism effect looks best on a real device. Simulator may not show the blur correctly.

```bash
# iOS
npx expo start --ios

# Android
npx expo start --android
```

## Visual Preview

```
┌─────────────────────────────────────────────────┐
│                                                 │
│  ◉     ┌─────────────────────┐      🔔³       │  ← Glass effect
│ Logo   │  🔍 Search...       │   Notification  │
│        └─────────────────────┘                 │
│                                                 │
└─────────────────────────────────────────────────┘
```

## Features

### Logo (Left)
- 40x40 circular container
- App icon from `assets/icon.png`
- Glass background with subtle border
- Switches to back arrow when `showBack={true}`

### Search Bar (Center)
- Flexible width, pill-shaped
- Glass background
- Search icon on left
- Clear button when typing
- Placeholder: "Search services..."

### Notification (Right)
- Bell icon with glass background
- Red badge for unread count
- Shows "9+" for counts > 9
- Tappable with callback

## Usage Example

```tsx
import { Header } from '../components/navigation';

<Header
  showSearch={true}
  showNotification={true}
  onNotificationPress={() => {
    // Navigate to notifications
    router.push('/notifications');
  }}
  onSearchChange={(text) => {
    // Handle search
    setSearchQuery(text);
  }}
  notificationCount={5}
/>
```

## Customization

### Adjust Blur Intensity
In `Header.tsx`, line with BlurView:
```tsx
<BlurView intensity={80} tint="light">  // Change 80 to 60-100
```

### Change Colors
In styles section:
```tsx
backgroundColor: 'rgba(255, 255, 255, 0.7)'  // Adjust opacity
borderColor: 'rgba(43, 65, 98, 0.1)'         // Adjust border
```

### Dark Mode
```tsx
<BlurView intensity={80} tint="dark">
// And update background colors to dark variants
```

## Integration Pattern

For all screens using the new header:

```tsx
import { SafeAreaView } from '../components/shared';
import { Header } from '../components/navigation';

export default function MyScreen() {
  return (
    <SafeAreaView edges={['left', 'right', 'bottom']}>
      <Header
        showSearch={true}
        showNotification={true}
        notificationCount={3}
      />
      
      {/* Spacer for fixed header */}
      <View style={{ height: 100 }} />
      
      <ScrollView>
        {/* Your content */}
      </ScrollView>
    </SafeAreaView>
  );
}
```

## Important Notes

1. **Don't include 'top' in SafeAreaView edges** - Header handles safe area internally
2. **Add 100px spacer** below header for content
3. **Test on real device** - Simulator may not show blur effect
4. **Performance** - Blur can impact performance on older devices

## Screens to Update

Apply this pattern to:
- [ ] Explore screen
- [ ] Cart screen
- [ ] Account screen
- [ ] Dashboard screen
- [ ] Products screen
- [ ] Services screen
- [ ] Booking screen

## Troubleshooting

### Blur not visible
```bash
# Clear cache and reinstall
npx expo start -c
```

### Header overlaps content
- Ensure spacer view is 100px
- Check SafeAreaView edges exclude 'top'

### Badge not showing
- Verify `notificationCount > 0`
- Check badge styling in Header.tsx

## Next Steps

1. Run `npx expo install expo-blur`
2. Test on device
3. Adjust blur intensity if needed
4. Implement notification logic
5. Implement search functionality
6. Apply to other screens

## Documentation

- Full guide: `GLASSMORPHISM_HEADER_GUIDE.md`
- Component migration: `COMPONENT_MIGRATION_GUIDE.md`
- Quick reference: `QUICK_REFERENCE.md`

## Preview on Device

The glassmorphism effect creates a beautiful iOS-style header that:
- Blurs content behind it
- Maintains readability
- Feels premium and modern
- Matches iOS design language
- Works with light/dark themes

Test it on a real device to see the full effect!
