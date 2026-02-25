import { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { verifyConfig, type ConfigVerification } from '@darzi/shared-utils';

/**
 * Configuration Test Component for Mobile
 * 
 * This component verifies that environment variables are being read correctly
 * by the config module from @darzi/shared-utils.
 * 
 * To test:
 * 1. Import this component in apps/mobile/src/app/(tabs)/index.tsx
 * 2. Run in development mode: npm run dev:mobile
 * 3. Verify that EXPO_PUBLIC_API_URL and EXPO_PUBLIC_ENV are displayed correctly
 * 4. Build for production and verify production values are used
 */
export function ConfigTest() {
  const [verification, setVerification] = useState<ConfigVerification | null>(null);

  useEffect(() => {
    const result = verifyConfig();
    setVerification(result);
    console.log('Config Verification:', result);
  }, []);

  if (!verification) {
    return (
      <View style={styles.container}>
        <Text>Loading configuration...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Environment Configuration Test</Text>
      
      <View style={[styles.statusBox, verification.success ? styles.successBox : styles.errorBox]}>
        <Text style={styles.statusTitle}>
          {verification.success ? '✅ Configuration Loaded Successfully' : '❌ Configuration Failed'}
        </Text>
        <Text style={styles.statusText}>Platform: {verification.platform}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Messages</Text>
        {verification.messages.map((msg: string, idx: number) => (
          <Text key={idx} style={styles.messageText}>• {msg}</Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Configuration Values</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{JSON.stringify(verification.config, null, 2)}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Environment Variables</Text>
        <View style={styles.codeBox}>
          <Text style={styles.codeText}>{JSON.stringify(verification.config, null, 2)}</Text>
        </View>
      </View>

      <View style={styles.instructionsBox}>
        <Text style={styles.instructionsTitle}>Testing Instructions:</Text>
        <Text style={styles.instructionsText}>1. Development mode should show values from .env.development</Text>
        <Text style={styles.instructionsText}>2. Production build should show values from .env.production</Text>
        <Text style={styles.instructionsText}>3. Verify API URL and environment match expected values</Text>
        <Text style={styles.instructionsText}>4. Check console for detailed verification output</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statusBox: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
  },
  successBox: {
    backgroundColor: '#d1fae5',
    borderColor: '#10b981',
  },
  errorBox: {
    backgroundColor: '#fee2e2',
    borderColor: '#ef4444',
  },
  statusTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
  messageText: {
    fontSize: 14,
    marginBottom: 4,
  },
  codeBox: {
    backgroundColor: '#f3f4f6',
    padding: 12,
    borderRadius: 8,
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'monospace',
  },
  instructionsBox: {
    backgroundColor: '#dbeafe',
    borderColor: '#3b82f6',
    borderWidth: 1,
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    marginBottom: 4,
  },
});
