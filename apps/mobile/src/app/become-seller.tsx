import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface Benefit {
  icon: string;
  title: string;
  description: string;
}

interface Requirement {
  icon: string;
  title: string;
  description: string;
}

export default function BecomeSellerScreen() {
  const benefits: Benefit[] = [
    {
      icon: '💼',
      title: 'Expand Your Business',
      description: 'Reach thousands of customers through our platform',
    },
    {
      icon: '📈',
      title: 'Increase Revenue',
      description: 'Grow your income with our established customer base',
    },
    {
      icon: '🛠️',
      title: 'Marketing Support',
      description: 'Benefit from our marketing and promotional efforts',
    },
    {
      icon: '📱',
      title: 'Easy Management',
      description: 'Manage orders and customers through our intuitive platform',
    },
    {
      icon: '🤝',
      title: 'Partnership Support',
      description: 'Dedicated support team to help you succeed',
    },
    {
      icon: '⭐',
      title: 'Build Your Brand',
      description: 'Showcase your expertise and build customer trust',
    },
  ];

  const requirements: Requirement[] = [
    {
      icon: '✅',
      title: 'Professional Experience',
      description: 'Minimum 3 years of experience in garment care, tailoring, or alterations',
    },
    {
      icon: '🏢',
      title: 'Business License',
      description: 'Valid business license and insurance coverage',
    },
    {
      icon: '🎯',
      title: 'Quality Standards',
      description: 'Commitment to maintaining high-quality service standards',
    },
    {
      icon: '📍',
      title: 'Service Area',
      description: 'Ability to serve customers in your designated area',
    },
    {
      icon: '💻',
      title: 'Technology Ready',
      description: 'Access to smartphone or computer for order management',
    },
  ];

  const handleContactPress = async () => {
    try {
      const subject = encodeURIComponent('Partnership Inquiry - Become a Seller');
      const body = encodeURIComponent('Dear Darzi Team,\n\nI am interested in becoming a seller partner on your platform.\n\n');
      const url = `mailto:partnerships@darzi.com?subject=${subject}&body=${body}`;
      
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
        <Text style={styles.heroTitle}>Become a Seller</Text>
        <Text style={styles.heroSubtitle}>
          Join our network of trusted artisans and grow your business with Darzi
        </Text>
      </View>

      {/* Introduction */}
      <View style={styles.introSection}>
        <Text style={styles.introText}>
          Are you a skilled tailor, dry cleaner, or garment care professional? Partner with Darzi 
          to expand your reach, increase your revenue, and connect with customers who value quality 
          craftsmanship.
        </Text>
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Partnership Benefits</Text>
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

      {/* Requirements Section */}
      <View style={styles.requirementsSection}>
        <Text style={styles.sectionTitle}>Requirements</Text>
        <Text style={styles.sectionDescription}>
          To ensure the best experience for our customers, we look for partners who meet the 
          following criteria:
        </Text>
        {requirements.map((requirement, index) => (
          <View key={index} style={styles.requirementItem}>
            <Text style={styles.requirementIcon}>{requirement.icon}</Text>
            <View style={styles.requirementContent}>
              <Text style={styles.requirementTitle}>{requirement.title}</Text>
              <Text style={styles.requirementDescription}>{requirement.description}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        
        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>1</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Apply</Text>
            <Text style={styles.stepDescription}>
              Submit your application and tell us about your business
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>2</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Review</Text>
            <Text style={styles.stepDescription}>
              Our team will review your application and credentials
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>3</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Onboard</Text>
            <Text style={styles.stepDescription}>
              Complete onboarding and training on our platform
            </Text>
          </View>
        </View>

        <View style={styles.stepItem}>
          <View style={styles.stepNumber}>
            <Text style={styles.stepNumberText}>4</Text>
          </View>
          <View style={styles.stepContent}>
            <Text style={styles.stepTitle}>Start Earning</Text>
            <Text style={styles.stepDescription}>
              Begin receiving orders and growing your business
            </Text>
          </View>
        </View>
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Ready to Join?</Text>
        <Text style={styles.contactDescription}>
          Get in touch with our partnerships team to learn more and start your application.
        </Text>
        
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleContactPress}
          accessibilityLabel="Contact partnerships team"
          accessibilityRole="button"
        >
          <Text style={styles.contactButtonText}>📧 Contact Partnerships Team</Text>
        </TouchableOpacity>

        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoText}>Email: partnerships@darzi.com</Text>
          <Text style={styles.contactInfoText}>Response time: Within 2 business days</Text>
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
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  introSection: {
    padding: spacing.lg,
  },
  introText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
  },
  benefitsSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
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
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.lg,
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
  requirementsSection: {
    padding: spacing.lg,
  },
  requirementItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  requirementIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  requirementContent: {
    flex: 1,
  },
  requirementTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  requirementDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  howItWorksSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  stepItem: {
    flexDirection: 'row',
    marginBottom: spacing.lg,
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  stepNumberText: {
    fontSize: typography.fontSize.lg,
    fontWeight: 'bold',
    color: colors.background,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  stepDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  contactSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  contactDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.lg,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
    marginBottom: spacing.lg,
  },
  contactButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.background,
  },
  contactInfo: {
    alignItems: 'center',
  },
  contactInfoText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
});
