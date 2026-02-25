import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface PolicySection {
  id: string;
  icon: string;
  title: string;
  content: string[];
}

export default function PrivacyScreen() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['information-collection']);

  const policySections: PolicySection[] = [
    {
      id: 'information-collection',
      icon: '📋',
      title: 'Information Collection',
      content: [
        'We collect information you provide directly to us when you create an account, place an order, or contact us for support.',
        'This includes your name, email address, phone number, delivery address, and payment information.',
        'We also automatically collect certain information about your device and how you interact with our services, including IP address, browser type, and usage data.',
      ],
    },
    {
      id: 'usage',
      icon: '🔍',
      title: 'How We Use Your Information',
      content: [
        'To provide, maintain, and improve our services',
        'To process your orders and manage your account',
        'To send you order confirmations, updates, and customer service communications',
        'To personalize your experience and provide relevant recommendations',
        'To detect, prevent, and address technical issues and fraudulent activity',
        'To comply with legal obligations and enforce our terms of service',
      ],
    },
    {
      id: 'sharing',
      icon: '🤝',
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share your information with service providers who help us operate our business, such as payment processors and delivery partners.',
        'We may share information when required by law or to protect our rights and the safety of our users.',
        'In the event of a merger or acquisition, your information may be transferred to the new entity.',
      ],
    },
    {
      id: 'security',
      icon: '🔒',
      title: 'Data Security',
      content: [
        'We implement appropriate technical and organizational measures to protect your personal information.',
        'We use encryption for sensitive data transmission and storage.',
        'Access to personal information is restricted to authorized personnel only.',
        'While we strive to protect your information, no method of transmission over the internet is 100% secure.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
      ],
    },
    {
      id: 'rights',
      icon: '⚖️',
      title: 'Your Rights',
      content: [
        'You have the right to access, update, or delete your personal information.',
        'You can opt out of marketing communications at any time.',
        'You may request a copy of the personal information we hold about you.',
        'You can object to certain processing of your personal information.',
        'You have the right to lodge a complaint with a data protection authority.',
        'To exercise these rights, please contact us at privacy@darzi.com.',
      ],
    },
    {
      id: 'cookies',
      icon: '🍪',
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar tracking technologies to enhance your experience.',
        'Cookies help us remember your preferences and understand how you use our services.',
        'You can control cookie settings through your browser preferences.',
        'Some features may not function properly if you disable cookies.',
      ],
    },
    {
      id: 'children',
      icon: '👶',
      title: 'Children\'s Privacy',
      content: [
        'Our services are not intended for children under 13 years of age.',
        'We do not knowingly collect personal information from children under 13.',
        'If we become aware that we have collected information from a child under 13, we will take steps to delete it.',
      ],
    },
    {
      id: 'changes',
      icon: '📝',
      title: 'Policy Changes',
      content: [
        'We may update this privacy policy from time to time.',
        'We will notify you of significant changes by email or through our app.',
        'Your continued use of our services after changes constitutes acceptance of the updated policy.',
        'We encourage you to review this policy periodically.',
      ],
    },
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <Text style={styles.lastUpdated}>Last Updated: January 15, 2024</Text>
        <Text style={styles.headerDescription}>
          At Darzi, we take your privacy seriously. This policy explains how we collect, use, 
          and protect your personal information.
        </Text>
      </View>

      {/* Policy Sections */}
      <View style={styles.sectionsContainer}>
        {policySections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <View key={section.id} style={styles.sectionCard}>
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                accessibilityLabel={`${section.title} section`}
                accessibilityRole="button"
                accessibilityState={{ expanded: isExpanded }}
              >
                <View style={styles.sectionHeaderLeft}>
                  <Text style={styles.sectionIcon}>{section.icon}</Text>
                  <Text style={styles.sectionTitle}>{section.title}</Text>
                </View>
                <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
                  ›
                </Text>
              </TouchableOpacity>
              
              {isExpanded && (
                <View style={styles.sectionContent}>
                  {section.content.map((paragraph, index) => (
                    <Text key={index} style={styles.contentText}>
                      {paragraph}
                    </Text>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About Privacy?</Text>
        <Text style={styles.contactDescription}>
          If you have any questions or concerns about our privacy practices, please contact us:
        </Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoText}>📧 Email: privacy@darzi.com</Text>
          <Text style={styles.contactInfoText}>📍 Address: 123 Fashion Street, Downtown, NY 10001</Text>
          <Text style={styles.contactInfoText}>📞 Phone: +1 (555) 123-4567</Text>
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
  header: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
  },
  headerTitle: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  lastUpdated: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  headerDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  sectionsContainer: {
    padding: spacing.lg,
  },
  sectionCard: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sectionIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
    flex: 1,
  },
  chevron: {
    fontSize: typography.fontSize['2xl'],
    color: colors.text.disabled,
    transform: [{ rotate: '90deg' }],
  },
  chevronExpanded: {
    transform: [{ rotate: '270deg' }],
  },
  sectionContent: {
    padding: spacing.md,
    paddingTop: 0,
  },
  contentText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
    marginBottom: spacing.md,
  },
  contactSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  contactTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  contactDescription: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
    marginBottom: spacing.md,
  },
  contactInfo: {
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
  },
  contactInfoText: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
});
