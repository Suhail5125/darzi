import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { AccordionItem } from '../components/faq/AccordionItem';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQCategory {
  id: string;
  title: string;
  icon: string;
  faqs: FAQ[];
}

export default function FAQScreen() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const categories: FAQCategory[] = [
    {
      id: 'service-timing',
      title: 'Service & Timing',
      icon: '⏱️',
      faqs: [
        {
          id: 'st-1',
          question: 'What is your typical turnaround time?',
          answer: 'Our standard turnaround time is 24-48 hours for most services. Express service is available for urgent requests with same-day or next-day delivery options.',
        },
        {
          id: 'st-2',
          question: 'Do you offer same-day service?',
          answer: 'Yes, we offer same-day service for orders placed before 10 AM. Additional charges may apply for express service.',
        },
        {
          id: 'st-3',
          question: 'What are your operating hours?',
          answer: 'We operate Monday to Friday from 9 AM to 6 PM, and Saturday from 10 AM to 4 PM. We are closed on Sundays.',
        },
      ],
    },
    {
      id: 'pickup-delivery',
      title: 'Pickup & Delivery',
      icon: '🚚',
      faqs: [
        {
          id: 'pd-1',
          question: 'Do you offer pickup and delivery services?',
          answer: 'Yes, we provide convenient pickup and delivery services within our service area. You can schedule a pickup through our app or website.',
        },
        {
          id: 'pd-2',
          question: 'Is there a minimum order for free delivery?',
          answer: 'Free delivery is available for orders over $50. Orders below this amount incur a small delivery fee.',
        },
        {
          id: 'pd-3',
          question: 'How do I track my order?',
          answer: 'You can track your order status in real-time through the app. You will receive notifications at each stage: pickup, processing, and delivery.',
        },
      ],
    },
    {
      id: 'garment-care',
      title: 'Garment Care',
      icon: '👔',
      faqs: [
        {
          id: 'gc-1',
          question: 'What types of garments do you service?',
          answer: 'We service all types of garments including suits, dresses, shirts, pants, coats, and delicate fabrics. We also handle specialty items like wedding dresses and leather goods.',
        },
        {
          id: 'gc-2',
          question: 'Do you handle delicate or designer fabrics?',
          answer: 'Absolutely! Our master artisans are trained in handling delicate and luxury fabrics. We use specialized techniques and eco-friendly products to ensure the best care.',
        },
        {
          id: 'gc-3',
          question: 'What if my garment gets damaged?',
          answer: 'We take utmost care with every garment. In the rare event of damage, we have comprehensive insurance coverage and will work with you to resolve the issue fairly.',
        },
      ],
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: '🌱',
      faqs: [
        {
          id: 's-1',
          question: 'Are your cleaning methods eco-friendly?',
          answer: 'Yes, we use 95% eco-friendly cleaning methods and biodegradable products. We are committed to minimizing our environmental impact while delivering excellent results.',
        },
        {
          id: 's-2',
          question: 'What sustainable practices do you follow?',
          answer: 'We use energy-efficient equipment, biodegradable packaging, water recycling systems, and partner with local suppliers to reduce our carbon footprint.',
        },
        {
          id: 's-3',
          question: 'Do you recycle hangers and packaging?',
          answer: 'Yes, we have a hanger recycling program and use recyclable packaging materials. We encourage customers to return hangers for reuse.',
        },
      ],
    },
  ];

  const handleToggle = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const handleEmailPress = async () => {
    try {
      const url = 'mailto:support@darzi.com';
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
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Frequently Asked Questions</Text>
        <Text style={styles.headerSubtitle}>
          Find answers to common questions about our services
        </Text>
      </View>

      {/* FAQ Categories */}
      {categories.map((category) => (
        <View key={category.id} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Text style={styles.categoryIcon}>{category.icon}</Text>
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>

          {category.faqs.map((faq) => (
            <AccordionItem
              key={faq.id}
              question={faq.question}
              answer={faq.answer}
              isExpanded={expandedId === faq.id}
              onToggle={() => handleToggle(faq.id)}
            />
          ))}
        </View>
      ))}

      {/* Contact Section */}
      <View style={styles.contactSection}>
        <Text style={styles.contactTitle}>Still have questions?</Text>
        <Text style={styles.contactText}>
          Can't find the answer you're looking for? Our support team is here to help.
        </Text>
        <TouchableOpacity
          style={styles.contactButton}
          onPress={handleEmailPress}
          activeOpacity={0.7}
          accessibilityLabel="Contact support via email"
          accessibilityRole="button"
        >
          <Text style={styles.contactButtonText}>Contact Support</Text>
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
  header: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
  },
  headerSubtitle: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  categorySection: {
    padding: spacing.lg,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  categoryIcon: {
    fontSize: 28,
    marginRight: spacing.sm,
  },
  categoryTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  contactSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
    margin: spacing.lg,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  contactText: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xl,
    borderRadius: borderRadius.md,
  },
  contactButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.background,
  },
});
