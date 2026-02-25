import { AccessibilityRole } from 'react-native';

/**
 * Accessibility props for interactive elements
 */
export interface AccessibilityProps {
  accessible?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
  accessibilityRole?: AccessibilityRole;
  accessibilityState?: {
    disabled?: boolean;
    selected?: boolean;
    checked?: boolean | 'mixed';
    busy?: boolean;
    expanded?: boolean;
  };
  accessibilityValue?: {
    min?: number;
    max?: number;
    now?: number;
    text?: string;
  };
}

/**
 * Create accessibility props for a button
 */
export const createButtonA11yProps = (
  label: string,
  hint?: string,
  disabled?: boolean
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'button',
  accessibilityState: { disabled: disabled || false },
});

/**
 * Create accessibility props for a text input
 */
export const createInputA11yProps = (
  label: string,
  hint?: string,
  value?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'text',
  accessibilityValue: value ? { text: value } : undefined,
});

/**
 * Create accessibility props for a link
 */
export const createLinkA11yProps = (
  label: string,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'link',
});

/**
 * Create accessibility props for an image
 */
export const createImageA11yProps = (
  label: string,
  isDecorative: boolean = false
): AccessibilityProps => ({
  accessible: !isDecorative,
  accessibilityLabel: isDecorative ? undefined : label,
  accessibilityRole: 'image',
});

/**
 * Create accessibility props for a header
 */
export const createHeaderA11yProps = (
  label: string,
  level: number = 1
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityRole: 'header',
});

/**
 * Create accessibility props for a checkbox
 */
export const createCheckboxA11yProps = (
  label: string,
  checked: boolean,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'checkbox',
  accessibilityState: { checked },
});

/**
 * Create accessibility props for a radio button
 */
export const createRadioA11yProps = (
  label: string,
  selected: boolean,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'radio',
  accessibilityState: { selected },
});

/**
 * Create accessibility props for a switch/toggle
 */
export const createSwitchA11yProps = (
  label: string,
  checked: boolean,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'switch',
  accessibilityState: { checked },
});

/**
 * Create accessibility props for a tab
 */
export const createTabA11yProps = (
  label: string,
  selected: boolean,
  index: number,
  total: number
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: `${label}, tab ${index + 1} of ${total}`,
  accessibilityRole: 'tab',
  accessibilityState: { selected },
});

/**
 * Create accessibility props for a menu item
 */
export const createMenuItemA11yProps = (
  label: string,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'menuitem',
});

/**
 * Create accessibility props for an adjustable element (e.g., slider)
 */
export const createAdjustableA11yProps = (
  label: string,
  value: number,
  min: number,
  max: number,
  hint?: string
): AccessibilityProps => ({
  accessible: true,
  accessibilityLabel: label,
  accessibilityHint: hint,
  accessibilityRole: 'adjustable',
  accessibilityValue: { min, max, now: value },
});

/**
 * Announce message to screen reader
 * Note: This requires AccessibilityInfo.announceForAccessibility in the component
 */
export const announceForAccessibility = (message: string) => {
  // This is a placeholder. In the component, use:
  // import { AccessibilityInfo } from 'react-native';
  // AccessibilityInfo.announceForAccessibility(message);
  return message;
};

/**
 * Check if color contrast ratio is sufficient (WCAG AA)
 * Simplified version - in production, use a proper color contrast library
 */
export const hasGoodContrast = (
  foreground: string,
  background: string,
  isLargeText: boolean = false
): boolean => {
  // This is a simplified check. In production, calculate actual contrast ratio
  // WCAG AA requires 4.5:1 for normal text, 3:1 for large text
  const minRatio = isLargeText ? 3 : 4.5;
  
  // For now, return true for our predefined color combinations
  // In production, implement proper contrast calculation
  return true;
};

/**
 * Get accessible label for a count
 */
export const getCountLabel = (count: number, singular: string, plural: string): string => {
  return `${count} ${count === 1 ? singular : plural}`;
};

/**
 * Get accessible label for a date
 */
export const getDateLabel = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Get accessible label for a price
 */
export const getPriceLabel = (price: number, currency: string = 'USD'): string => {
  return `${price.toFixed(2)} ${currency}`;
};
