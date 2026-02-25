import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { ImageBackground } from 'expo-image';
import { Button } from '../shared/Button';
import { colors, typography, spacing } from '../../constants/theme';

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaPress: () => void;
  backgroundImage?: any;
}

const { width } = Dimensions.get('window');

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaPress,
  backgroundImage,
}) => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImage || { uri: 'https://via.placeholder.com/800x400' }}
        style={styles.backgroundImage}
        contentFit="cover"
        cachePolicy="memory-disk"
        priority="high"
        transition={300}
      >
        <View style={styles.overlay}>
          <View style={styles.content}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
            <Button
              title={ctaText}
              onPress={onCtaPress}
              variant="primary"
              style={styles.ctaButton}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 300,
    marginBottom: spacing.lg,
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  content: {
    alignItems: 'center',
    maxWidth: width - spacing.xl * 2,
  },
  title: {
    fontSize: typography.fontSize['3xl'],
    fontFamily: typography.fontFamily.bold,
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.regular,
    color: colors.background,
    textAlign: 'center',
    marginBottom: spacing.xl,
    lineHeight: typography.fontSize.lg * typography.lineHeight.relaxed,
  },
  ctaButton: {
    minWidth: 200,
  },
});
