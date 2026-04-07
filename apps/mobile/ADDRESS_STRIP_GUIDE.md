# Address Strip Component

## Overview
A clean, tappable address strip that displays the current delivery location between the header and content.

## Visual Design

```
┌─────────────────────────────────────────┐
│  📍  Deliver to                      ▼  │
│      41-A, Asif Agency, Shipai...       │
└─────────────────────────────────────────┘
```

## Features

### 1. Location Icon
- **Icon**: Location pin (Ionicons)
- **Size**: 18px
- **Color**: Primary navy
- **Container**: 32x32px circle
- **Background**: Secondary color (light blue)

### 2. Text Content
- **Label**: "Deliver to" (small, muted)
- **Address**: Current location (bold, truncated)
- **Max Lines**: 1 (with ellipsis)

### 3. Chevron
- **Icon**: Chevron down
- **Size**: 18px
- **Color**: Muted foreground
- **Indicates**: Tappable/expandable

### 4. Interaction
- **Touch**: Opens location selector
- **Feedback**: 70% opacity on press
- **Accessible**: Screen reader support

## Props

```typescript
interface AddressStripProps {
  address?: string;        // Display address
  onPress?: () => void;    // Tap handler
}
```

## Usage

### Basic
```tsx
import { AddressStrip } from '../components/shared';

<AddressStrip
  address="41-A, Asif Agency, Shipai Mohalla, Jaipur"
  onPress={() => {
    // Open location selector
    setShowLocationModal(true);
  }}
/>
```

### With Location Hook
```tsx
const { currentLocation } = useLocation();

<AddressStrip
  address={currentLocation?.displayName || 'Select delivery location'}
  onPress={handleLocationPress}
/>
```

### Default State
```tsx
// Shows default text if no address
<AddressStrip onPress={handleLocationPress} />
// Displays: "Select delivery location"
```

## Styling

### Container
```typescript
backgroundColor: colors.background
borderBottom: 1px colors.border
paddingHorizontal: 16px
paddingVertical: 8px
```

### Icon Container
```typescript
width: 32px
height: 32px
borderRadius: 16px
backgroundColor: colors.secondary
```

### Label
```typescript
fontSize: 10px
color: colors.mutedForeground
fontFamily: Outfit
```

### Address
```typescript
fontSize: 14px
fontWeight: 600
color: colors.foreground
fontFamily: Outfit
```

## Integration

### Home Screen Layout
```
┌─────────────────────────────────────────┐
│  Header (Fixed)                         │
├─────────────────────────────────────────┤
│  Address Strip (Logged in only)        │
├─────────────────────────────────────────┤
│  Coupon Carousel                        │
│  Services                               │
│  ...                                    │
└─────────────────────────────────────────┘
```

### Conditional Display
```tsx
{isAuthenticated && (
  <AddressStrip
    address={currentLocation?.displayName}
    onPress={handleLocationPress}
  />
)}
```

## Accessibility

### Labels
```typescript
accessibilityLabel="Delivery location: 41-A, Asif Agency"
accessibilityRole="button"
accessibilityHint="Double tap to change delivery location"
```

### Touch Target
- **Height**: 48px (with padding) ✅
- **Width**: Full screen width ✅
- **Tappable**: Entire strip ✅

## Behavior

### On Press
1. User taps address strip
2. Opens location selector modal
3. User selects new location
4. Address updates
5. Modal closes

### States
- **Default**: "Select delivery location"
- **With Address**: Shows full address
- **Truncated**: Long addresses with ellipsis
- **Loading**: Could show skeleton (future)

## Customization

### Change Icon
```tsx
// In AddressStrip.tsx
<Ionicons name="home" size={18} color={colors.primary} />
```

### Change Colors
```tsx
// Icon background
backgroundColor: colors.accent

// Text color
color: colors.primary
```

### Add Badge
```tsx
// Show "Home", "Work", etc.
<View style={styles.badge}>
  <Text style={styles.badgeText}>Home</Text>
</View>
```

## Future Enhancements

1. **Multiple Addresses**: Quick switch between saved addresses
2. **GPS Button**: Auto-detect current location
3. **Recent Locations**: Show recently used addresses
4. **Address Type Badge**: Home, Work, Other
5. **Delivery Time**: Show estimated delivery time
6. **Service Area**: Indicate if location is serviceable

## Example: With Location Modal

```tsx
export default function HomeScreen() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const { currentLocation, setLocation } = useLocation();

  return (
    <>
      <AddressStrip
        address={currentLocation?.displayName}
        onPress={() => setShowLocationModal(true)}
      />

      <LocationModal
        visible={showLocationModal}
        onClose={() => setShowLocationModal(false)}
        onSelect={(location) => {
          setLocation(location);
          setShowLocationModal(false);
        }}
      />
    </>
  );
}
```

## Testing Checklist

- [ ] Displays default text
- [ ] Shows address when provided
- [ ] Truncates long addresses
- [ ] Icon displays correctly
- [ ] Chevron visible
- [ ] Tap opens modal
- [ ] Touch feedback works
- [ ] Accessible to screen readers
- [ ] Works on small screens
- [ ] Works on tablets

## Summary

The Address Strip provides:
- ✅ Clear location display
- ✅ Easy to tap
- ✅ Clean, minimal design
- ✅ Accessible interface
- ✅ Conditional rendering
- ✅ Integrates with location system

Perfect for showing delivery location in e-commerce and service apps!
