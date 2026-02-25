import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Animated } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface QuickAction {
  id: string;
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  onEmergencyPress?: () => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({ actions, onEmergencyPress }) => {
  const iconOpacity = useRef(new Animated.Value(1)).current;
  const textOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (onEmergencyPress) {
      // Alternating fade animation
      Animated.loop(
        Animated.sequence([
          // Show icon
          Animated.delay(1500),
          // Fade out icon
          Animated.timing(iconOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          // Fade in text
          Animated.timing(textOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
          // Show text
          Animated.delay(1500),
          // Fade out text
          Animated.timing(textOpacity, {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
          // Fade in icon
          Animated.timing(iconOpacity, {
            toValue: 1,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [onEmergencyPress]);

  const renderContent = () => (
    <View style={styles.contentRow}>
      {/* Left side: Regular actions */}
      <View style={styles.actionsRow}>
        {actions.map((action, index) => (
          <React.Fragment key={action.id}>
            <TouchableOpacity
              onPress={action.onPress}
              style={styles.actionButton}
              activeOpacity={0.7}
              accessibilityLabel={action.label}
              accessibilityRole="button"
            >
              <Ionicons name={action.icon} size={22} color={colors.primary} />
              <Text style={styles.label} numberOfLines={1}>
                {action.label}
              </Text>
            </TouchableOpacity>
            {index < actions.length - 1 && <View style={styles.divider} />}
          </React.Fragment>
        ))}
      </View>

      {/* Right side: Emergency circular button */}
      {onEmergencyPress && (
        <>
          <View style={styles.divider} />
          <View style={styles.emergencyWrapper}>
            <TouchableOpacity
              onPress={onEmergencyPress}
              style={styles.emergencyButtonWrapper}
              activeOpacity={0.9}
              accessibilityLabel="Emergency Service"
              accessibilityRole="button"
            >
              <LinearGradient
                colors={['#EF4444', '#DC2626']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.emergencyCircle}
              >
                <View style={styles.emergencyContent}>
                  <Animated.View style={[styles.emergencyItem, { opacity: iconOpacity }]}>
                    <Ionicons name="flash" size={24} color="#FFFFFF" />
                  </Animated.View>
                  <Animated.Text 
                    style={[styles.emergencyLabel, styles.emergencyItem, { opacity: textOpacity }]} 
                    numberOfLines={1}
                  >
                    Emergency
                  </Animated.Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {Platform.OS === 'ios' ? (
        <BlurView intensity={80} tint="light" style={styles.actionsBar}>
          {renderContent()}
        </BlurView>
      ) : (
        <View style={styles.actionsBar}>
          {renderContent()}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.md,
    marginTop: 4,
    marginBottom: 0,
  },
  actionsBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.full,
    paddingLeft: spacing.xs, // Reduced left padding
    paddingRight: 4,
    paddingVertical: spacing.sm,
    height: 64,
    borderWidth: 1,
    borderColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.9)',
    overflow: 'hidden',
    ...Platform.select({
      android: {
        elevation: 2,
      },
    }),
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs / 2,
    paddingVertical: spacing.xs,
  },
  divider: {
    width: 1,
    height: 32,
    backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.1)',
  },
  label: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    textAlign: 'center',
  },
  emergencyWrapper: {
    paddingLeft: spacing.xs, // Reduced gap for better distribution
  },
  emergencyButtonWrapper: {
    marginRight: 0,
  },
  emergencyCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
    shadowColor: '#EF4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  emergencyContent: {
    position: 'relative',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emergencyItem: {
    position: 'absolute',
  },
  emergencyLabel: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
