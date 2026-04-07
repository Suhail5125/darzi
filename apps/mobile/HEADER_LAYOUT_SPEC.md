# Header Layout Specification

## Visual Layout

```
┌─────────────────────────────────────────────────────────────┐
│ Safe Area Top (Dynamic based on device)                     │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌────┐    ┌──────────────────────────────┐    ┌────┐     │
│  │    │    │  🔍  Search services...      │    │ 🔔 │     │
│  │ 📱 │    │                              │    │  3 │     │
│  └────┘    └──────────────────────────────┘    └────┘     │
│   Logo              Search Bar              Notification    │
│   40px                 Flex                     40px        │
│                                                              │
├─────────────────────────────────────────────────────────────┤
│ Subtle border (0.5px, rgba(0,0,0,0.1))                     │
└─────────────────────────────────────────────────────────────┘
```

## Dimensions

### Overall Header
- **Position**: Absolute, fixed at top
- **Width**: 100% of screen
- **Height**: Dynamic (Safe area top + 56px content)
- **Background**: BlurView with intensity 80
- **Border Bottom**: 0.5px rgba(0,0,0,0.1)

### Content Area
- **Padding Horizontal**: 16px (spacing.md)
- **Padding Vertical**: 8px (spacing.sm)
- **Layout**: Flexbox row
- **Gap**: 8px (spacing.sm)

### Left Section (Logo)
- **Width**: 44px (fixed)
- **Alignment**: flex-start

#### Logo Container
- **Size**: 40x40px
- **Border Radius**: 20px (perfect circle)
- **Background**: rgba(255, 255, 255, 0.8)
- **Border**: 1px rgba(43, 65, 98, 0.1)

#### Logo Image
- **Size**: 32x32px (8px padding inside container)
- **Source**: `assets/icon.png`
- **Resize Mode**: contain

### Center Section (Search)
- **Flex**: 1 (takes remaining space)
- **Min Width**: 200px

#### Search Container
- **Height**: 40px
- **Border Radius**: 20px (pill shape)
- **Background**: rgba(255, 255, 255, 0.7)
- **Border**: 1px rgba(43, 65, 98, 0.1)
- **Padding Horizontal**: 16px

#### Search Icon
- **Size**: 18x18px
- **Color**: colors.mutedForeground
- **Margin Right**: 4px

#### Search Input
- **Flex**: 1
- **Font Size**: 14px (typography.fontSize.sm)
- **Font Family**: Outfit (typography.fontFamily.sans)
- **Color**: colors.foreground
- **Placeholder Color**: colors.mutedForeground

#### Clear Button (when text entered)
- **Size**: 18x18px
- **Padding**: 2px
- **Icon**: close-circle

### Right Section (Notification)
- **Width**: 44px (fixed)
- **Alignment**: flex-end

#### Notification Button
- **Size**: 40x40px
- **Border Radius**: 20px (perfect circle)
- **Background**: rgba(255, 255, 255, 0.8)
- **Border**: 1px rgba(43, 65, 98, 0.1)

#### Bell Icon
- **Size**: 24x24px
- **Color**: colors.primary
- **Icon**: notifications-outline

#### Badge (when count > 0)
- **Position**: Absolute, top: -2px, right: -2px
- **Min Width**: 18px
- **Height**: 18px
- **Border Radius**: 10px (pill shape)
- **Background**: colors.destructive (red)
- **Border**: 2px white
- **Padding Horizontal**: 4px

#### Badge Text
- **Font Size**: 10px
- **Font Weight**: bold
- **Color**: white
- **Content**: Count (or "9+" if > 9)

## Spacing Breakdown

```
┌─────────────────────────────────────────────────────────────┐
│ ← 16px →                                        ← 16px →    │
│          ┌────┐ ← 8px → ┌─────────┐ ← 8px → ┌────┐        │
│          │Logo│          │ Search  │          │Bell│        │
│          └────┘          └─────────┘          └────┘        │
│           40px              Flex                40px         │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Color Specifications

### Glass Effect
```typescript
// BlurView
intensity: 80
tint: 'light'

// Container backgrounds
rgba(255, 255, 255, 0.8)  // Logo & Notification (80% opacity)
rgba(255, 255, 255, 0.7)  // Search bar (70% opacity)

// Borders
rgba(43, 65, 98, 0.1)     // Navy blue at 10% opacity
```

### Icons
```typescript
// Primary icons (logo, bell)
color: colors.primary      // #2B4162 (Navy)

// Secondary icons (search, clear)
color: colors.mutedForeground  // #64748B (Gray)
```

### Badge
```typescript
background: colors.destructive  // #E53E3E (Red)
text: #FFFFFF                   // White
border: #FFFFFF                 // White
```

## States

### Default State
- Logo visible
- Search bar empty with placeholder
- Notification bell visible
- Badge hidden (if count = 0)

### Search Active State
- Search bar focused
- Keyboard visible
- Clear button appears when text entered

### Back Button State (showBack=true)
- Logo replaced with back arrow
- Same circular container
- Arrow icon: 24x24px
- Color: colors.primary

### Notification Badge States
```typescript
count = 0   → Badge hidden
count = 1-9 → Badge shows number
count > 9   → Badge shows "9+"
```

## Responsive Behavior

### Small Phones (< 375px width)
- Logo: 36x36px (reduced)
- Search: Maintains flex
- Notification: 36x36px (reduced)
- Gap: 6px (reduced)

### Tablets (> 768px width)
- Logo: 44x44px
- Search: Max width 600px, centered
- Notification: 44x44px
- Gap: 12px (increased)

### Landscape Orientation
- Same layout
- May need to reduce vertical padding
- Consider hiding search on very short screens

## Accessibility

### Touch Targets
- Logo: 40x40px ✅ (exceeds 44x44 minimum)
- Search: Full width, 40px height ✅
- Notification: 40x40px ✅
- Clear button: 18x18px + 2px padding = 22x22px ⚠️ (consider increasing)

### Labels
```typescript
Logo: "Darzi logo"
Back: "Go back"
Search: "Search input"
Clear: "Clear search"
Notification: "Notifications, 3 unread" (dynamic)
```

### Screen Reader
- All interactive elements have accessibilityLabel
- All buttons have accessibilityRole="button"
- Badge count announced with notification button

## Platform Differences

### iOS
- Full blur effect visible
- Smooth transitions
- Native feel
- Safe area handled automatically

### Android
- Blur effect may vary by device
- Consider reducing intensity on older devices
- Test on multiple Android versions
- May need fallback for devices without blur support

### Web
- BlurView not supported
- Falls back to semi-transparent background
- Still functional and attractive
- Consider CSS backdrop-filter as alternative

## Animation Opportunities

### Search Focus
```typescript
// Expand search bar slightly
scale: 1.02
duration: 200ms
```

### Notification Badge
```typescript
// Pulse animation when count increases
scale: 1.2 → 1.0
duration: 300ms
```

### Scroll Behavior
```typescript
// Reduce blur intensity when scrolling
intensity: 80 → 60
duration: 150ms
```

## Implementation Checklist

- [x] BlurView component
- [x] Logo container with image
- [x] Search bar with icon
- [x] Clear button functionality
- [x] Notification button
- [x] Badge with count
- [x] Back button variant
- [x] Safe area handling
- [x] Accessibility labels
- [x] Touch target sizes
- [ ] Search functionality
- [ ] Notification handling
- [ ] Animation polish
- [ ] Dark mode support
- [ ] Tablet optimization

## Testing Matrix

| Device | iOS | Android | Web |
|--------|-----|---------|-----|
| iPhone 12+ (notch) | ✅ | - | - |
| iPhone 14 Pro+ (island) | ✅ | - | - |
| Android (gesture nav) | - | ⏳ | - |
| Tablet | ⏳ | ⏳ | - |
| Web browser | - | - | ⏳ |

## Performance Metrics

### Target
- Render time: < 16ms (60fps)
- Blur processing: < 8ms
- Touch response: < 100ms

### Optimization
- Memoize header component
- Avoid re-renders on scroll
- Use absolute positioning
- Optimize blur intensity

## Future Enhancements

1. **Search Suggestions**: Dropdown with recent/popular searches
2. **Voice Search**: Microphone icon in search bar
3. **Profile Avatar**: Replace notification with user avatar
4. **Quick Actions**: Long press logo for menu
5. **Animated Transitions**: Smooth state changes
6. **Haptic Feedback**: On button presses (iOS)
7. **Dark Mode**: Automatic theme switching
8. **Customization**: User-configurable layout
