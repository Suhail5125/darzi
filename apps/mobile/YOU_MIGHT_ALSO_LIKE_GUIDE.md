# You Might Also Like Component Guide

## Overview
A fresh, modern recommendation section with a different design approach from the existing PersonalizedRecommendations component. Features gradient overlays, glassmorphism effects, and interactive CTA buttons.

## Design Features

### Visual Style
- **Semi-transparent container**: Matches ServiceGrid's glassmorphism aesthetic with `rgba(255, 255, 255, 0.15)` background
- **Gradient overlays**: Each card has a customizable gradient for visual variety
- **Image-first layout**: Large hero images (140px height) with gradient darkening at bottom
- **Floating badges**: Tag badges with gradient backgrounds positioned at top-left
- **Price display**: Bold white text overlaid on image with shadow for readability
- **CTA buttons**: Gradient "Book Now" buttons for direct action

### Card Structure
1. **Image Section** (140px height)
   - Full-width cover image
   - Dark gradient overlay (transparent to rgba(0,0,0,0.7))
   - Tag badge (top-left) with gradient background
   - Price badge (bottom-left) with text shadow

2. **Content Section**
   - White background with slight transparency
   - Title (bold, 1 line max)
   - Description (2 lines max)
   - Gradient CTA button

### Differences from PersonalizedRecommendations
| Feature | PersonalizedRecommendations | YouMightAlsoLike |
|---------|---------------------------|------------------|
| Container | No wrapper | Glassmorphism box |
| Card width | 160px | 220px (larger) |
| Image height | 120px | 140px |
| Gradient | None | Custom per card |
| CTA | None | "Book Now" button |
| Price position | In content | On image |
| Tag style | Simple badge | Gradient badge |
| Header | Title only | Title + "See All" |

## Usage

```tsx
import { YouMightAlsoLike, SuggestedItem } from '../../components/home';

const items: SuggestedItem[] = [
  {
    id: '1',
    title: 'Premium Suit Care',
    description: 'Complete cleaning and pressing for your formal wear',
    price: '₹599',
    imageSource: require('../../../assets/service.png'),
    tag: 'Popular',
    gradient: ['#667eea', '#764ba2'], // Optional custom gradient
  },
];

<YouMightAlsoLike
  items={items}
  title="You Might Also Like"
  onItemPress={(id) => console.log('Item pressed:', id)}
/>
```

## Default Gradients
The component includes 5 default gradient combinations that cycle through items:
1. Purple-Violet: `['#667eea', '#764ba2']`
2. Pink-Red: `['#f093fb', '#f5576c']`
3. Blue-Cyan: `['#4facfe', '#00f2fe']`
4. Green-Teal: `['#43e97b', '#38f9d7']`
5. Pink-Yellow: `['#fa709a', '#fee140']`

## Props

### SuggestedItem
```typescript
interface SuggestedItem {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  imageSource?: any;
  tag?: string;
  gradient?: [string, string]; // Custom gradient colors
}
```

### YouMightAlsoLikeProps
```typescript
interface YouMightAlsoLikeProps {
  items: SuggestedItem[];
  title?: string; // Default: "You Might Also Like"
  onItemPress: (id: string) => void;
}
```

## Integration
The component is integrated into the home screen for authenticated users, replacing the old PersonalizedRecommendations component. It appears after the ExpressServiceCTA and before the TestimonialCarousel.

## Styling Notes
- Uses app's theme constants (colors, typography, spacing, borderRadius)
- Matches glassmorphism aesthetic of other home components
- Responsive to different screen sizes with horizontal scrolling
- Shadow effects for depth (shadowOpacity: 0.15, shadowRadius: 8)
- Smooth touch feedback (activeOpacity: 0.95)

## Future Enhancements
- Add "See All" functionality to navigate to full recommendations page
- Implement wishlist/favorite functionality
- Add loading skeleton states
- Support for video thumbnails
- Analytics tracking for item impressions and clicks
