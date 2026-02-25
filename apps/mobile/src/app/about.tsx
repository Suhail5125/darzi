import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function AboutScreen() {
  const statistics = [
    { label: 'Garments Perfected', value: '50,000+', icon: '👔' },
    { label: 'Turnaround Time', value: '24-48h', icon: '⏱️' },
    { label: 'Eco-Friendly', value: '95%', icon: '🌱' },
    { label: 'Master Artisans', value: '50+', icon: '✨' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>About Darzi</Text>
        <Text style={styles.heroSubtitle}>
          Crafting Excellence in Garment Care Since 2010
        </Text>
      </View>

      {/* Company Story */}
      <View style={styles.storySection}>
        <Text style={styles.sectionTitle}>Our Story</Text>
        <Text style={styles.storyText}>
          Darzi was founded with a simple mission: to bring traditional craftsmanship into the modern age. 
          We believe that every garment tells a story, and our master artisans are dedicated to preserving 
          and enhancing that narrative through expert care and attention to detail.
        </Text>
        
        <View style={styles.storyImageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🏢</Text>
          </View>
        </View>

        <Text style={styles.storyText}>
          What started as a small workshop has grown into a trusted name in garment care, serving thousands 
          of satisfied customers. Our commitment to quality, sustainability, and customer satisfaction remains 
          at the heart of everything we do.
        </Text>
      </View>

      {/* Statistics Section */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>By the Numbers</Text>
        <View style={styles.statisticsGrid}>
          {statistics.map((stat, index) => (
            <View key={index} style={styles.statisticCard}>
              <Text style={styles.statisticIcon}>{stat.icon}</Text>
              <Text style={styles.statisticValue}>{stat.value}</Text>
              <Text style={styles.statisticLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Values Section */}
      <View style={styles.valuesSection}>
        <Text style={styles.sectionTitle}>Our Values</Text>
        
        <View style={styles.valueItem}>
          <Text style={styles.valueIcon}>🎯</Text>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Quality First</Text>
            <Text style={styles.valueDescription}>
              We never compromise on quality. Every garment receives the same meticulous attention, 
              whether it's a simple hem or a complex alteration.
            </Text>
          </View>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueIcon}>🌍</Text>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Sustainability</Text>
            <Text style={styles.valueDescription}>
              We're committed to eco-friendly practices, using sustainable materials and processes 
              that minimize our environmental impact.
            </Text>
          </View>
        </View>

        <View style={styles.valueItem}>
          <Text style={styles.valueIcon}>🤝</Text>
          <View style={styles.valueContent}>
            <Text style={styles.valueTitle}>Customer Trust</Text>
            <Text style={styles.valueDescription}>
              Your satisfaction is our priority. We build lasting relationships through transparent 
              communication and reliable service.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  contentContainer: {
    paddingBottom: spacing.xl,
  },
  heroSection: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: typography.fontSize.lg,
    color: colors.background,
    textAlign: 'center',
    opacity: 0.9,
  },
  storySection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  storyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  storyImageContainer: {
    marginVertical: spacing.lg,
    alignItems: 'center',
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    fontSize: 64,
  },
  statisticsSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  statisticsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  statisticCard: {
    width: '50%',
    padding: spacing.sm,
  },
  statisticIcon: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  statisticValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  statisticLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  valuesSection: {
    padding: spacing.lg,
  },
  valueItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  valueIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  valueDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
});
