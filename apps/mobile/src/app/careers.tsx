import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Position {
  id: string;
  title: string;
  department: string;
  type: string;
  description: string;
}

export default function CareersScreen() {
  const benefits: Benefit[] = [
    {
      icon: '💰',
      title: 'Competitive Salary',
      description: 'Industry-leading compensation packages',
    },
    {
      icon: '🏥',
      title: 'Health Benefits',
      description: 'Comprehensive health, dental, and vision coverage',
    },
    {
      icon: '🌴',
      title: 'Paid Time Off',
      description: 'Generous vacation and sick leave policy',
    },
    {
      icon: '📚',
      title: 'Learning & Development',
      description: 'Continuous training and skill development opportunities',
    },
    {
      icon: '⚖️',
      title: 'Work-Life Balance',
      description: 'Flexible schedules and remote work options',
    },
    {
      icon: '🎉',
      title: 'Team Events',
      description: 'Regular team building activities and celebrations',
    },
  ];

  const openPositions: Position[] = [
    {
      id: '1',
      title: 'Senior Tailor',
      department: 'Operations',
      type: 'Full-time',
      description: 'We are seeking an experienced tailor with expertise in alterations and custom garment creation. Must have 5+ years of experience.',
    },
    {
      id: '2',
      title: 'Customer Service Representative',
      department: 'Customer Support',
      type: 'Full-time',
      description: 'Join our customer service team to help clients with inquiries, bookings, and support. Excellent communication skills required.',
    },
    {
      id: '3',
      title: 'Delivery Driver',
      department: 'Logistics',
      type: 'Part-time',
      description: 'Responsible for picking up and delivering garments to customers. Valid driver\'s license and clean driving record required.',
    },
    {
      id: '4',
      title: 'Marketing Coordinator',
      department: 'Marketing',
      type: 'Full-time',
      description: 'Help grow our brand through digital marketing campaigns, social media management, and content creation.',
    },
  ];

  const handleApplyPress = async (position: Position) => {
    try {
      const subject = encodeURIComponent(`Application for ${position.title}`);
      const body = encodeURIComponent(`Dear Hiring Team,\n\nI am interested in applying for the ${position.title} position in the ${position.department} department.\n\n`);
      const url = `mailto:careers@darzi.com?subject=${subject}&body=${body}`;
      
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  const handleGeneralInquiry = async () => {
    try {
      const subject = encodeURIComponent('General Career Inquiry');
      const url = `mailto:careers@darzi.com?subject=${subject}`;
      
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open email client');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open email client');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Hero Section */}
      <View style={styles.heroSection}>
        <Text style={styles.heroTitle}>Join Our Team</Text>
        <Text style={styles.heroSubtitle}>
          Build your career with a company that values craftsmanship, innovation, and people.
        </Text>
      </View>

      {/* Why Join Us */}
      <View style={styles.whyJoinSection}>
        <Text style={styles.sectionTitle}>Why Join Darzi?</Text>
        <Text style={styles.sectionDescription}>
          At Darzi, we believe our people are our greatest asset. We foster a culture of excellence, 
          creativity, and collaboration where every team member can thrive and grow.
        </Text>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Benefits & Perks</Text>
        <View style={styles.benefitsGrid}>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitCard}>
              <Text style={styles.benefitIcon}>{benefit.icon}</Text>
              <Text style={styles.benefitTitle}>{benefit.title}</Text>
              <Text style={styles.benefitDescription}>{benefit.description}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Open Positions */}
      <View style={styles.positionsSection}>
        <Text style={styles.sectionTitle}>Open Positions</Text>
        {openPositions.map((position) => (
          <View key={position.id} style={styles.positionCard}>
            <View style={styles.positionHeader}>
              <Text style={styles.positionTitle}>{position.title}</Text>
              <View style={styles.positionMeta}>
                <View style={styles.metaBadge}>
                  <Text style={styles.metaBadgeText}>{position.department}</Text>
                </View>
                <View style={[styles.metaBadge, styles.metaBadgeSecondary]}>
                  <Text style={styles.metaBadgeText}>{position.type}</Text>
                </View>
              </View>
            </View>
            <Text style={styles.positionDescription}>{position.description}</Text>
            <TouchableOpacity
              style={styles.applyButton}
              onPress={() => handleApplyPress(position)}
              accessibilityLabel={`Apply for ${position.title}`}
              accessibilityRole="button"
            >
              <Text style={styles.applyButtonText}>Apply Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>

      {/* General Inquiries */}
      <View style={styles.inquiriesSection}>
        <Text style={styles.inquiriesTitle}>Don't see a position that fits?</Text>
        <Text style={styles.inquiriesDescription}>
          We're always looking for talented individuals to join our team. Send us your resume and 
          let us know how you can contribute to Darzi's success.
        </Text>
        <TouchableOpacity
          style={styles.inquiryButton}
          onPress={handleGeneralInquiry}
          accessibilityLabel="Send general career inquiry"
          accessibilityRole="button"
        >
          <Text style={styles.inquiryButtonText}>📧 Send General Inquiry</Text>
        </TouchableOpacity>
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
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  whyJoinSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  sectionDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  benefitsSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.sm,
  },
  benefitCard: {
    width: '50%',
    padding: spacing.sm,
  },
  benefitIcon: {
    fontSize: 40,
    marginBottom: spacing.sm,
  },
  benefitTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  benefitDescription: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
  },
  positionsSection: {
    padding: spacing.lg,
  },
  positionCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  positionHeader: {
    marginBottom: spacing.md,
  },
  positionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  positionMeta: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  metaBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
  },
  metaBadgeSecondary: {
    backgroundColor: colors.secondary,
  },
  metaBadgeText: {
    fontSize: typography.fontSize.xs,
    color: colors.background,
    fontWeight: '600',
  },
  positionDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  applyButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.background,
  },
  inquiriesSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    alignItems: 'center',
  },
  inquiriesTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  inquiriesDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.lg,
  },
  inquiryButton: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  inquiryButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.primary,
  },
});
