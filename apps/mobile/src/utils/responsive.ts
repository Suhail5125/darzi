import { Dimensions, Platform, PixelRatio } from 'react-native';
import { breakpoints } from '../constants/theme';

/**
 * Get current screen dimensions
 */
export const getScreenDimensions = () => {
  return {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    screenWidth: Dimensions.get('screen').width,
    screenHeight: Dimensions.get('screen').height,
  };
};

/**
 * Check if device is a tablet
 */
export const isTablet = () => {
  const { width, height } = getScreenDimensions();
  const aspectRatio = height / width;
  return Math.min(width, height) >= breakpoints.tablet && aspectRatio < 1.6;
};

/**
 * Check if device is a small phone
 */
export const isSmallPhone = () => {
  const { width } = getScreenDimensions();
  return width <= breakpoints.smallPhone;
};

/**
 * Check if device is a large phone
 */
export const isLargePhone = () => {
  const { width } = getScreenDimensions();
  return width >= breakpoints.largePhone && width < breakpoints.tablet;
};

/**
 * Get responsive value based on screen size
 */
export const getResponsiveValue = <T,>(
  smallPhone: T,
  phone: T,
  largePhone: T,
  tablet: T
): T => {
  const { width } = getScreenDimensions();
  
  if (width >= breakpoints.tablet) return tablet;
  if (width >= breakpoints.largePhone) return largePhone;
  if (width >= breakpoints.phone) return phone;
  return smallPhone;
};

/**
 * Scale size based on screen width
 */
export const scaleSize = (size: number): number => {
  const { width } = getScreenDimensions();
  const baseWidth = 375; // iPhone X/11/12 base width
  return (width / baseWidth) * size;
};

/**
 * Scale font size based on screen width and pixel ratio
 */
export const scaleFontSize = (size: number): number => {
  const scale = scaleSize(size);
  return Math.round(PixelRatio.roundToNearestPixel(scale));
};

/**
 * Get responsive spacing
 */
export const getResponsiveSpacing = (base: number): number => {
  return getResponsiveValue(
    base * 0.8,  // Small phone
    base,        // Phone
    base * 1.1,  // Large phone
    base * 1.3   // Tablet
  );
};

/**
 * Get number of columns for grid layout
 */
export const getGridColumns = (minColumnWidth: number = 150): number => {
  const { width } = getScreenDimensions();
  return Math.floor(width / minColumnWidth);
};

/**
 * Check if device is in landscape orientation
 */
export const isLandscape = () => {
  const { width, height } = getScreenDimensions();
  return width > height;
};

/**
 * Get safe area insets (for notches, home indicators)
 */
export const getSafeAreaInsets = () => {
  // This is a simplified version. In production, use react-native-safe-area-context
  const { height } = getScreenDimensions();
  const isIPhoneX = Platform.OS === 'ios' && height >= 812;
  
  return {
    top: isIPhoneX ? 44 : Platform.OS === 'ios' ? 20 : 0,
    bottom: isIPhoneX ? 34 : 0,
    left: 0,
    right: 0,
  };
};

/**
 * Ensure minimum touch target size (44x44 for accessibility)
 */
export const ensureMinTouchTarget = (size: number, minSize: number = 44): number => {
  return Math.max(size, minSize);
};

/**
 * Get responsive font sizes
 */
export const getResponsiveFontSizes = () => {
  const multiplier = isTablet() ? 1.2 : isSmallPhone() ? 0.9 : 1;
  
  return {
    xs: scaleFontSize(12 * multiplier),
    sm: scaleFontSize(14 * multiplier),
    base: scaleFontSize(16 * multiplier),
    lg: scaleFontSize(18 * multiplier),
    xl: scaleFontSize(20 * multiplier),
    '2xl': scaleFontSize(24 * multiplier),
    '3xl': scaleFontSize(30 * multiplier),
    '4xl': scaleFontSize(36 * multiplier),
  };
};
