import { useState, useEffect } from 'react';
import { Dimensions, ScaledSize } from 'react-native';
import {
  getScreenDimensions,
  isTablet,
  isSmallPhone,
  isLargePhone,
  isLandscape,
  getResponsiveValue,
  getResponsiveSpacing,
  getGridColumns,
  getResponsiveFontSizes,
} from '../utils/responsive';

interface ResponsiveValues {
  width: number;
  height: number;
  isTablet: boolean;
  isSmallPhone: boolean;
  isLargePhone: boolean;
  isLandscape: boolean;
  fontSizes: ReturnType<typeof getResponsiveFontSizes>;
  getResponsiveValue: typeof getResponsiveValue;
  getResponsiveSpacing: typeof getResponsiveSpacing;
  getGridColumns: typeof getGridColumns;
}

/**
 * Hook to get responsive values and screen information
 * Automatically updates when screen dimensions change (orientation, etc.)
 */
export function useResponsive(): ResponsiveValues {
  const [dimensions, setDimensions] = useState(getScreenDimensions());

  useEffect(() => {
    const subscription = Dimensions.addEventListener(
      'change',
      ({ window }: { window: ScaledSize }) => {
        setDimensions({
          width: window.width,
          height: window.height,
          screenWidth: window.width,
          screenHeight: window.height,
        });
      }
    );

    return () => subscription?.remove();
  }, []);

  return {
    width: dimensions.width,
    height: dimensions.height,
    isTablet: isTablet(),
    isSmallPhone: isSmallPhone(),
    isLargePhone: isLargePhone(),
    isLandscape: isLandscape(),
    fontSizes: getResponsiveFontSizes(),
    getResponsiveValue,
    getResponsiveSpacing,
    getGridColumns,
  };
}
