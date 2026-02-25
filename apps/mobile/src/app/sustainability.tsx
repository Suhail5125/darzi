import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

export default function SustainabilityScreen() {
  const statistics = [
    { icon: '♻️', value: '95%', label: 'Eco-Friendly Methods' },
    { icon: '💧', value: '60%', label: 'Water Saved' },
    { icon: '🌍', value: '80%', label: 'Carbon Reduction' },
    { icon: '🌱', value: '100%', label: 'Biodegradable Products' },
  ];

  const initiatives = [
    {
      id: 1,
      icon: '🌿',
      title: 'Green Cleaning Solutions',
      description: 'We use 95% eco-friendly cleaning methods and biodegradable products that are gentle on fabrics and the environment. Our cleaning solutions are free from harsh chemicals and toxins.',
    },
    {
      id: 2,
      icon: '💧',
      title: 'Water Conservation',
      description: 'Our advanced water recycling systems reduce water consumption by 60%. We treat and reuse water throughout our processes, minimizing waste and environmental impact.',
    },
    {
      id: 3,
      icon: '⚡',
      title: 'Energy Efficiency',
      description: 'We utilize energy-efficient equipment and renewable energy sources to power our facilities. Our modern machinery reduces energy consumption while maintaining superior results.',
    },
    {
      id: 4,
      icon: '📦',
      title: 'Sustainable Packaging',
      description: 'All our packaging materials are recyclable or biodegradable. We encourage customers to return hangers and bags for reuse, creating a circular economy.',
    },
    {
      id: 5,
      icon: '🚗',
      title: 'Carbon-Neutral Delivery',
      description: 'We optimize delivery routes and use fuel-efficient vehicles to minimize our carbon footprint. We are working towards a fully electric delivery fleet.',
    },
    {
      id: 6,
      icon: '🤝',
      title: 'Local Partnerships',
      description: 'We partner with local suppliers and businesses to reduce transportation emissions and support our community. Local sourcing is a key part of our sustainability strategy.',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Sustainability</Text>
        <Text style={styles.heroSubtitle}>
          Caring for Your Garments, Caring for Our Planet
        </Text>
      </View>

      {/* Mission Section */}
      <View style={styles.missionSection}>
        <Text style={styles.sectionTitle}>Our Mission</Text>
        <Text style={styles.missionText}>
          At Darzi, we believe that exceptional garment care and environmental responsibility go hand in hand. 
          We are committed to minimizing our ecological footprint while delivering the highest quality service. 
          Every decision we make considers its impact on the planet and future generations.
        </Text>
        
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🌍</Text>
          </View>
        </View>
      </View>

      {/* Statistics Section */}
      <View style={styles.statisticsSection}>
        <Text style={styles.sectionTitle}>Our Impact</Text>
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

      {/* Initiatives Section */}
      <View style={styles.initiativesSection}>
        <Text style={styles.sectionTitle}>Our Initiatives</Text>
        
        {initiatives.map((initiative) => (
          <View key={initiative.id} style={styles.initiativeCard}>
            <View style={styles.initiativeHeader}>
              <Text style={styles.initiativeIcon}>{initiative.icon}</Text>
              <Text style={styles.initiativeTitle}>{initiative.title}</Text>
            </View>
            <Text style={styles.initiativeDescription}>{initiative.description}</Text>
          </View>
        ))}
      </View>

      {/* Commitment Section */}
      <View style={styles.commitmentSection}>
        <Text style={styles.sectionTitle}>Our Commitment</Text>
        <Text style={styles.commitmentText}>
          We continuously evaluate and improve our practices to reduce environmental impact. 
          Our sustainability journey is ongoing, and we are committed to transparency in our efforts. 
          We regularly audit our processes, invest in green technologies, and educate our team on 
          sustainable practices.
        </Text>
        
        <View style={styles.imageContainer}>
          <View style={styles.placeholderImage}>
            <Text style={styles.placeholderText}>🌱</Text>
          </View>
        </View>

        <Text style={styles.commitmentText}>
          By choosing Darzi, you're not just getting exceptional garment care—you're supporting a 
          business that prioritizes the health of our planet. Together, we can make a difference, 
          one garment at a time.
        </Text>
      </View>

      {/* Call to Action */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaTitle}>Join Our Green Journey</Text>
        <Text style={styles.ctaText}>
          Every garment you entrust to us is cared for with sustainable practices. 
          Thank you for being part of our commitment to a greener future.
        </Text>
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
  missionSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  missionText: {
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
    alignItems: 'center',
  },
  statisticIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  statisticValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.xs,
  },
  statisticLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    textAlign: 'center',
  },
  initiativesSection: {
    padding: spacing.lg,
  },
  initiativeCard: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  initiativeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  initiativeIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  initiativeTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.text.primary,
    flex: 1,
  },
  initiativeDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginLeft: 48,
  },
  commitmentSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  commitmentText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  ctaSection: {
    padding: spacing.lg,
    backgroundColor: colors.primary,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.background,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  ctaText: {
    fontSize: typography.fontSize.base,
    color: colors.background,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    opacity: 0.9,
  },
});
