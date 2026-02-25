import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';

interface TermsSection {
  id: string;
  icon: string;
  title: string;
  content: string[];
  important?: boolean;
}

export default function TermsScreen() {
  const [expandedSections, setExpandedSections] = useState<string[]>(['acceptance']);

  const termsSections: TermsSection[] = [
    {
      id: 'acceptance',
      icon: '✅',
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using Darzi\'s services, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, you may not use our services.',
        'We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of modified terms.',
      ],
    },
    {
      id: 'service-description',
      icon: '🧵',
      title: 'Service Description',
      content: [
        'Darzi provides garment care services including dry cleaning, alterations, tailoring, and finishing.',
        'Services are provided by our network of professional artisans and service providers.',
        'We offer pickup and delivery services in designated service areas.',
        'Service availability may vary by location and is subject to change.',
      ],
    },
    {
      id: 'user-responsibilities',
      icon: '👤',
      title: 'User Responsibilities',
      content: [
        'You must provide accurate and complete information when creating an account.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You must notify us immediately of any unauthorized use of your account.',
        'You agree to use our services only for lawful purposes.',
        'You are responsible for ensuring garments are suitable for the requested services.',
        'You must disclose any special care requirements or damage to garments.',
      ],
    },
    {
      id: 'pricing-payment',
      icon: '💳',
      title: 'Pricing and Payment',
      content: [
        'Prices for services are displayed in the app and may vary by location and service type.',
        'All prices are in USD unless otherwise specified.',
        'Payment is due at the time of order placement or upon delivery, as specified.',
        'We accept major credit cards, debit cards, and other payment methods as indicated.',
        'You authorize us to charge your payment method for all services ordered.',
        'Prices are subject to change without notice, but changes will not affect orders already placed.',
      ],
      important: true,
    },
    {
      id: 'liability',
      icon: '⚠️',
      title: 'Limitation of Liability',
      content: [
        'We take utmost care in handling your garments, but we cannot guarantee against all damage.',
        'Our liability for lost or damaged items is limited to 10 times the service charge or $500, whichever is less.',
        'We are not liable for damage to garments with pre-existing conditions not disclosed to us.',
        'We are not responsible for items left in pockets or attached to garments.',
        'Claims for lost or damaged items must be made within 7 days of delivery.',
        'We are not liable for indirect, incidental, or consequential damages.',
      ],
      important: true,
    },
    {
      id: 'garment-care',
      icon: '👔',
      title: 'Garment Care and Claims',
      content: [
        'We follow industry-standard care procedures for all garments.',
        'Some garments may not be suitable for certain cleaning methods. We will notify you if this is the case.',
        'Garments with delicate embellishments, sequins, or special materials may require additional care and cost.',
        'We reserve the right to refuse service for garments we deem unsuitable for cleaning.',
        'All claims must be made before the garment is worn or cleaned again.',
        'Proof of purchase and value may be required for claims.',
      ],
    },
    {
      id: 'pickup-delivery',
      icon: '🚚',
      title: 'Pickup and Delivery',
      content: [
        'Pickup and delivery services are available in designated service areas.',
        'You must be available at the scheduled pickup and delivery times.',
        'If you are not available, we may leave items in a secure location or reschedule delivery.',
        'Additional fees may apply for failed delivery attempts.',
        'You are responsible for inspecting items upon delivery and reporting any issues immediately.',
      ],
    },
    {
      id: 'unclaimed-items',
      icon: '📦',
      title: 'Unclaimed Items',
      content: [
        'Items not claimed within 90 days of completion may be donated or disposed of.',
        'We will make reasonable efforts to contact you before disposing of unclaimed items.',
        'Storage fees may apply for items held beyond 30 days.',
      ],
    },
    {
      id: 'intellectual-property',
      icon: '©️',
      title: 'Intellectual Property',
      content: [
        'All content on our platform, including text, graphics, logos, and software, is owned by Darzi or our licensors.',
        'You may not copy, modify, distribute, or reproduce any content without our written permission.',
        'The Darzi name and logo are trademarks and may not be used without permission.',
      ],
    },
    {
      id: 'termination',
      icon: '🚫',
      title: 'Account Termination',
      content: [
        'We reserve the right to suspend or terminate your account for violation of these terms.',
        'You may close your account at any time by contacting customer support.',
        'Upon termination, you remain responsible for any outstanding charges.',
        'Certain provisions of these terms survive termination, including liability limitations and dispute resolution.',
      ],
    },
    {
      id: 'dispute-resolution',
      icon: '⚖️',
      title: 'Dispute Resolution',
      content: [
        'Any disputes arising from these terms or our services shall be resolved through binding arbitration.',
        'You agree to waive your right to a jury trial or to participate in a class action lawsuit.',
        'Arbitration shall be conducted in accordance with the rules of the American Arbitration Association.',
        'These terms are governed by the laws of the State of New York.',
      ],
    },
    {
      id: 'contact',
      icon: '📞',
      title: 'Contact Information',
      content: [
        'For questions about these terms, please contact us at legal@darzi.com.',
        'For customer service inquiries, contact hello@darzi.com or call +1 (555) 123-4567.',
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
        <Text style={styles.headerTitle}>Terms of Service</Text>
        <Text style={styles.lastUpdated}>Last Updated: January 15, 2024</Text>
        <Text style={styles.headerDescription}>
          Please read these terms carefully before using Darzi's services. By using our services, 
          you agree to be bound by these terms.
        </Text>
      </View>

      {/* Important Notice */}
      <View style={styles.importantNotice}>
        <Text style={styles.importantIcon}>⚠️</Text>
        <View style={styles.importantContent}>
          <Text style={styles.importantTitle}>Important Notice</Text>
          <Text style={styles.importantText}>
            These terms contain important information about your legal rights, including limitations 
            on liability and dispute resolution through arbitration.
          </Text>
        </View>
      </View>

      {/* Terms Sections */}
      <View style={styles.sectionsContainer}>
        {termsSections.map((section) => {
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <View 
              key={section.id} 
              style={[
                styles.sectionCard,
                section.important && styles.sectionCardImportant,
              ]}
            >
              <TouchableOpacity
                style={styles.sectionHeader}
                onPress={() => toggleSection(section.id)}
                accessibilityLabel={`${section.title} section`}
                accessibilityRole="button"
                accessibilityState={{ expanded: isExpanded }}
              >
                <View style={styles.sectionHeaderLeft}>
                  <Text style={styles.sectionIcon}>{section.icon}</Text>
                  <View style={styles.sectionTitleContainer}>
                    <Text style={styles.sectionTitle}>{section.title}</Text>
                    {section.important && (
                      <Text style={styles.importantBadge}>Important</Text>
                    )}
                  </View>
                </View>
                <Text style={[styles.chevron, isExpanded && styles.chevronExpanded]}>
                  ›
                </Text>
              </TouchableOpacity>
              
              {isExpanded && (
                <View style={styles.sectionContent}>
                  {section.content.map((paragraph, index) => (
                    <View key={index} style={styles.contentItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.contentText}>{paragraph}</Text>
                    </View>
                  ))}
                </View>
              )}
            </View>
          );
        })}
      </View>

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Questions About These Terms?</Text>
        <Text style={styles.contactDescription}>
          If you have any questions or concerns about our Terms of Service, please contact us:
        </Text>
        <View style={styles.contactInfo}>
          <Text style={styles.contactInfoText}>📧 Legal: legal@darzi.com</Text>
          <Text style={styles.contactInfoText}>📧 Support: hello@darzi.com</Text>
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
  importantNotice: {
    flexDirection: 'row',
    backgroundColor: '#FFF3CD',
    padding: spacing.md,
    margin: spacing.lg,
    borderRadius: borderRadius.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
  },
  importantIcon: {
    fontSize: 24,
    marginRight: spacing.sm,
  },
  importantContent: {
    flex: 1,
  },
  importantTitle: {
    fontSize: typography.fontSize.base,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  importantText: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
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
  sectionCardImportant: {
    borderLeftWidth: 4,
    borderLeftColor: colors.warning,
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
  sectionTitleContainer: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: '600',
    color: colors.text.primary,
  },
  importantBadge: {
    fontSize: typography.fontSize.xs,
    color: colors.warning,
    fontWeight: '600',
    marginTop: spacing.xs,
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
  contentItem: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  bullet: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    marginRight: spacing.sm,
    marginTop: 2,
  },
  contentText: {
    flex: 1,
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.relaxed,
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
