import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function OurCraftScreen() {
  const techniques = [
    {
      id: 1,
      icon: '✂️',
      title: 'Precision Tailoring',
      description: 'Our master tailors bring decades of experience to every stitch. Using traditional techniques passed down through generations, we ensure perfect fits and flawless alterations.',
    },
    {
      id: 2,
      icon: '🧵',
      title: 'Hand Finishing',
      description: 'We believe in the art of hand finishing. From buttonholes to hems, our artisans add the final touches that distinguish exceptional craftsmanship from ordinary work.',
    },
    {
      id: 3,
      icon: '🎨',
      title: 'Fabric Care Expertise',
      description: 'Each fabric requires unique care. Our specialists are trained to identify and treat different materials, from delicate silks to robust wools, ensuring optimal results.',
    },
    {
      id: 4,
      icon: '🔍',
      title: 'Quality Inspection',
      description: 'Every garment undergoes rigorous quality checks at multiple stages. We inspect for color consistency, stitch integrity, and overall finish before returning to you.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Our Craft</Text>
        <Text style={styles.heroSubtitle}>
          Where Traditional Artistry Meets Modern Excellence
        </Text>
      </View>

      {/* Philosophy Section */}
      <View style={styles.philosophySection}>
        <Text style={styles.sectionTitle}>Our Philosophy</Text>
        <Text style={styles.philosophyText}>
          At Darzi, we believe that garment care is an art form. Every piece that comes through our doors 
          receives the same meticulous attention, whether it's a simple hem or a complex restoration. 
          Our commitment to excellence is rooted in respect for the craft and the stories each garment carries.
        </Text>
        
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🏛️</Text>
          </View>
        </View>

        <Text style={styles.philosophyText}>
          We combine time-honored techniques with modern technology to deliver results that exceed expectations. 
          Our artisans are not just workers; they are craftspeople who take pride in their work and understand 
          the value of preserving quality and tradition.
        </Text>
      </View>

      {/* Techniques Section */}
      <View style={styles.techniquesSection}>
        <Text style={styles.sectionTitle}>Our Techniques</Text>
        
        {techniques.map((technique, index) => (
          <View key={technique.id} style={styles.techniqueCard}>
            <View style={styles.techniqueHeader}>
              <Text style={styles.techniqueIcon}>{technique.icon}</Text>
              <Text style={styles.techniqueTitle}>{technique.title}</Text>
            </View>
            <Text style={styles.techniqueDescription}>{technique.description}</Text>
            
            {index < techniques.length - 1 && (
              <View style={styles.imageContainer}>
                <View style={styles.placeholderImage}>
                  <Text style={styles.placeholderText}>{technique.icon}</Text>
                </View>
              </View>
            )}
          </View>
        ))}
      </View>

      {/* Commitment Section */}
      <View style={styles.commitmentSection}>
        <Text style={styles.sectionTitle}>Our Commitment</Text>
        
        <View style={styles.commitmentCard}>
          <Text style={styles.commitmentIcon}>🎯</Text>
          <Text style={styles.commitmentTitle}>Excellence in Every Detail</Text>
          <Text style={styles.commitmentText}>
            We don't cut corners. Every garment receives the time and attention it deserves, 
            ensuring results that meet our exacting standards.
          </Text>
        </View>

        <View style={styles.commitmentCard}>
          <Text style={styles.commitmentIcon}>🤝</Text>
          <Text style={styles.commitmentTitle}>Continuous Learning</Text>
          <Text style={styles.commitmentText}>
            Our artisans regularly train in new techniques and technologies, staying at the 
            forefront of garment care innovation while honoring traditional methods.
          </Text>
        </View>

        <View style={styles.commitmentCard}>
          <Text style={styles.commitmentIcon}>💚</Text>
          <Text style={styles.commitmentTitle}>Sustainable Practices</Text>
          <Text style={styles.commitmentText}>
            We integrate eco-friendly methods into our craft, using sustainable materials and 
            processes that protect both your garments and the environment.
          </Text>
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
  philosophySection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  philosophyText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  imageContainer: {
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
  techniquesSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  techniqueCard: {
    marginBottom: spacing.lg,
  },
  techniqueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  techniqueIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  techniqueTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
  },
  techniqueDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginLeft: 48,
  },
  commitmentSection: {
    padding: spacing.lg,
  },
  commitmentCard: {
    backgroundColor: colors.background,
    padding: spacing.lg,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
  },
  commitmentIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  commitmentTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  commitmentText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    textAlign: 'center',
  },
});
