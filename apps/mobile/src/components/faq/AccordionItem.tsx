import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { colors, spacing, typography, borderRadius, touchTarget } from '../../constants/theme';

interface AccordionItemProps {
  question: string;
  answer: string;
  isExpanded: boolean;
  onToggle: () => void;
}

export function AccordionItem({ question, answer, isExpanded, onToggle }: AccordionItemProps) {
  const animatedHeight = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(rotateAnim, {
        toValue: isExpanded ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [isExpanded]);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={onToggle}
        activeOpacity={0.7}
        accessible={true}
        accessibilityLabel={question}
        accessibilityHint={isExpanded ? 'Double tap to collapse answer' : 'Double tap to expand answer'}
        accessibilityRole="button"
        accessibilityState={{ expanded: isExpanded }}
      >
        <Text style={styles.question} accessible={false}>{question}</Text>
        <Animated.View style={{ transform: [{ rotate: rotation }] }} accessible={false}>
          <Text style={styles.chevron}>›</Text>
        </Animated.View>
      </TouchableOpacity>

      {isExpanded && (
        <Animated.View
          style={[
            styles.answerContainer,
            {
              opacity: animatedHeight,
            },
          ]}
          accessible={true}
          accessibilityRole="text"
          accessibilityLabel={`Answer: ${answer}`}
        >
          <Text style={styles.answer}>{answer}</Text>
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    minHeight: touchTarget.minHeight,
  },
  question: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: '600',
    color: colors.text.primary,
    marginRight: spacing.sm,
  },
  chevron: {
    fontSize: typography.fontSize['2xl'],
    color: colors.primary,
    fontWeight: 'bold',
    transform: [{ rotate: '90deg' }],
  },
  answerContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
  },
  answer: {
    fontSize: typography.fontSize.base,
    color: colors.text.secondary,
    lineHeight: typography.fontSize.base * typography.lineHeight.normal,
  },
});
