import React, { useState } from 'react';
import { View, StyleSheet, ViewStyle, ImageStyle } from 'react-native';
// @ts-ignore - expo-image types may not be available yet
import { Image, ImageContentFit } from 'expo-image';
import { colors } from '../../constants/theme';

interface OptimizedImageProps {
  source: { uri: string } | number;
  style?: ImageStyle | ViewStyle;
  contentFit?: ImageContentFit;
  placeholder?: string;
  priority?: 'low' | 'normal' | 'high';
  cachePolicy?: 'none' | 'disk' | 'memory' | 'memory-disk';
  transition?: number;
  accessibilityLabel?: string;
  accessibilityIgnoresInvertColors?: boolean;
  accessible?: boolean;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * OptimizedImage component using Expo Image with caching and lazy loading
 * Features:
 * - Automatic caching (memory and disk)
 * - Progressive loading with placeholder
 * - Lazy loading support
 * - Appropriate image resolutions for screen densities
 * - Smooth transitions
 */
export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  source,
  style,
  contentFit = 'cover',
  placeholder,
  priority = 'normal',
  cachePolicy = 'memory-disk',
  transition = 300,
  accessibilityLabel,
  accessibilityIgnoresInvertColors = true,
  accessible = true,
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoad = () => {
    setIsLoading(false);
    onLoad?.();
  };

  const handleError = () => {
    setIsLoading(false);
    onError?.();
  };

  // Default placeholder - a subtle gray background
  const defaultPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88h8AAtUB6QGVJjsAAAAASUVORK5CYII=';

  return (
    <View style={[styles.container, style]}>
      <Image
        source={source}
        style={[StyleSheet.absoluteFill, style]}
        contentFit={contentFit}
        placeholder={placeholder || defaultPlaceholder}
        priority={priority}
        cachePolicy={cachePolicy}
        transition={transition}
        onLoad={handleLoad}
        onError={handleError}
        accessibilityLabel={accessibilityLabel}
        accessibilityIgnoresInvertColors={accessibilityIgnoresInvertColors}
        accessible={accessible}
      />
      {isLoading && <View style={styles.loadingOverlay} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.surface,
  },
});
