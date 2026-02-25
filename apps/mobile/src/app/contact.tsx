import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Alert } from 'react-native';
import { useToast } from '../contexts/ToastContext';
import { colors, spacing, typography, borderRadius } from '../constants/theme';
import { Input } from '../components/shared/Input';

export default function ContactScreen() {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: '📧',
      label: 'Email',
      value: 'hello@darzi.com',
      action: () => handleEmailPress('hello@darzi.com'),
    },
    {
      icon: '📞',
      label: 'Phone',
      value: '+1 (555) 123-4567',
      action: () => handlePhonePress('+15551234567'),
    },
    {
      icon: '📍',
      label: 'Address',
      value: '123 Fashion Street, Downtown, NY 10001',
      action: null,
    },
  ];

  const handleEmailPress = async (email: string) => {
    try {
      const url = `mailto:${email}`;
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

  const handlePhonePress = async (phoneNumber: string) => {
    try {
      const url = `tel:${phoneNumber}`;
      const canOpen = await Linking.canOpenURL(url);
      if (canOpen) {
        await Linking.openURL(url);
      } else {
        Alert.alert('Error', 'Unable to open phone dialer');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to open phone dialer');
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      showToast('Thank you for contacting us! We will get back to you soon.', 'success');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
    } catch (error) {
      showToast('Failed to send message. Please try again.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Get in Touch</Text>
        <Text style={styles.headerSubtitle}>
          We'd love to hear from you. Reach out to us through any of the following channels.
        </Text>
      </View>

      {/* Contact Information */}
      <View style={styles.contactInfoSection}>
        {contactInfo.map((info, index) => (
          <TouchableOpacity
            key={index}
            style={styles.contactInfoCard}
            onPress={info.action || undefined}
            disabled={!info.action}
            activeOpacity={info.action ? 0.7 : 1}
            accessibilityLabel={`${info.label}: ${info.value}`}
            accessibilityRole={info.action ? 'button' : 'text'}
          >
            <Text style={styles.contactIcon}>{info.icon}</Text>
            <View style={styles.contactInfoContent}>
              <Text style={styles.contactLabel}>{info.label}</Text>
              <Text style={[styles.contactValue, info.action && styles.contactValueLink]}>
                {info.value}
              </Text>
            </View>
            {info.action && <Text style={styles.chevron}>›</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Contact Form */}
      <View style={styles.formSection}>
        <Text style={styles.formTitle}>Send us a Message</Text>
        
        <Input
          label="Name"
          value={formData.name}
          onChangeText={(text: string) => {
            setFormData({ ...formData, name: text });
            if (errors.name) setErrors({ ...errors, name: '' });
          }}
          placeholder="Enter your name"
          error={errors.name}
          autoCapitalize="words"
        />

        <Input
          label="Email"
          value={formData.email}
          onChangeText={(text: string) => {
            setFormData({ ...formData, email: text });
            if (errors.email) setErrors({ ...errors, email: '' });
          }}
          placeholder="Enter your email"
          error={errors.email}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Input
          label="Message"
          value={formData.message}
          onChangeText={(text: string) => {
            setFormData({ ...formData, message: text });
            if (errors.message) setErrors({ ...errors, message: '' });
          }}
          placeholder="How can we help you?"
          error={errors.message}
          multiline
          numberOfLines={5}
          style={styles.messageInput}
        />

        <TouchableOpacity
          style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
          accessibilityLabel="Submit contact form"
          accessibilityRole="button"
        >
          <Text style={styles.submitButtonText}>
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Business Hours */}
      <View style={styles.hoursSection}>
        <Text style={styles.hoursTitle}>Business Hours</Text>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Monday - Friday</Text>
          <Text style={styles.hoursTime}>9:00 AM - 6:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Saturday</Text>
          <Text style={styles.hoursTime}>10:00 AM - 4:00 PM</Text>
        </View>
        <View style={styles.hoursRow}>
          <Text style={styles.hoursDay}>Sunday</Text>
          <Text style={styles.hoursTime}>Closed</Text>
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
  contactInfoSection: {
    padding: spacing.lg,
  },
  contactInfoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.md,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
  },
  contactIcon: {
    fontSize: 32,
    marginRight: spacing.md,
  },
  contactInfoContent: {
    flex: 1,
  },
  contactLabel: {
    fontSize: typography.fontSize.sm,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  contactValue: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  contactValueLink: {
    color: colors.primary,
  },
  chevron: {
    fontSize: typography.fontSize['2xl'],
    color: colors.text.disabled,
  },
  formSection: {
    padding: spacing.lg,
    backgroundColor: colors.surface,
  },
  formTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.lg,
  },
  messageInput: {
    minHeight: 120,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  submitButtonDisabled: {
    opacity: 0.6,
  },
  submitButtonText: {
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.background,
  },
  hoursSection: {
    padding: spacing.lg,
  },
  hoursTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
    marginBottom: spacing.md,
  },
  hoursRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  hoursDay: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
  },
  hoursTime: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
  },
});
