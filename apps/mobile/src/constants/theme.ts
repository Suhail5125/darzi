// Aligned with web design system (HSL converted to hex)
// Web uses: --primary: 222 47% 31% (Navy Blue)
export const colors = {
  primary: '#2B4162',        // hsl(222, 47%, 31%) - Premium Navy Blue
  primaryForeground: '#F5F7FA', // hsl(210, 40%, 98%)
  secondary: '#D9E2EC',      // hsl(215, 25%, 90%) - Soft Lavender/Blue
  secondaryForeground: '#2B4162',
  accent: '#F4EDE4',         // hsl(38, 45%, 90%) - Subtle Gold/Cream
  accentForeground: '#2B4162',
  background: '#F5F7FA',     // hsl(210, 20%, 98%) - Clean White Background
  foreground: '#1A202C',     // hsl(220, 40%, 10%)
  card: '#FFFFFF',           // hsl(0, 0%, 100%) - Crisp White Cards
  cardForeground: '#1A202C',
  surface: '#FFFFFF',        // Same as card - for surface elements
  muted: '#F0F4F8',          // hsl(210, 20%, 96%)
  mutedForeground: '#64748B', // hsl(215, 20%, 45%)
  border: '#D9E2EC',         // hsl(215, 20%, 90%)
  input: '#D9E2EC',
  ring: '#2B4162',
  destructive: '#E53E3E',    // hsl(0, 84%, 60%)
  destructiveForeground: '#F5F7FA',
  // Legacy support
  text: {
    primary: '#1A202C',
    secondary: '#64748B',
    disabled: '#94A3B8',
  },
  error: '#E53E3E',
  success: '#38A169',
  warning: '#DD6B20',
  info: '#3182CE',
};

// Aligned with web typography
// Web uses: 'Outfit' (sans) and 'Playfair Display' (serif)
export const typography = {
  fontFamily: {
    sans: 'Outfit',           // Match web sans-serif
    serif: 'Playfair Display', // Match web serif for headings
    // Fallbacks for system fonts if custom fonts not loaded
    regular: 'System',
    medium: 'System',
    semibold: 'System',
    bold: 'System',
  },
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
};

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,    // Match web --radius: 0.75rem (12px)
  xl: 16,
  full: 9999,
};

// Minimum touch target size for accessibility (44x44 points)
export const touchTarget = {
  minWidth: 44,
  minHeight: 44,
};

// Breakpoints for responsive design
export const breakpoints = {
  smallPhone: 320,
  phone: 375,
  largePhone: 414,
  tablet: 768,
  largeTablet: 1024,
};

// Accessibility - Color contrast ratios meet WCAG AA standards
export const accessibility = {
  minTouchTarget: 44,
  minContrastRatio: 4.5, // WCAG AA for normal text
  minContrastRatioLarge: 3, // WCAG AA for large text (18pt+)
};
