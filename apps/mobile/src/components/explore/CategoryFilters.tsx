import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, typography, spacing, borderRadius, touchTarget } from '../../constants/theme';
import { ServiceCategory } from '../../types';
import { createRadioA11yProps } from '../../utils/accessibility';

interface CategoryFiltersProps {
  categories: Array<'All' | ServiceCategory>;
  selectedCategory: 'All' | ServiceCategory;
  onCategoryChange: (category: 'All' | ServiceCategory) => void;
}

export const CategoryFilters: React.FC<CategoryFiltersProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isSelected = category === selectedCategory;
          const a11yProps = createRadioA11yProps(
            `${category} category`,
            isSelected,
            `Filter services by ${category}`
          );
          
          return (
            <TouchableOpacity
              key={category}
              style={[
                styles.chip,
                isSelected && styles.chipSelected,
              ]}
              onPress={() => onCategoryChange(category)}
              activeOpacity={0.7}
              {...a11yProps}
            >
              <Text
                style={[
                  styles.chipText,
                  isSelected && styles.chipTextSelected,
                ]}
                accessible={false}
              >
                {category}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    minHeight: touchTarget.minHeight,
    justifyContent: 'center',
  },
  chipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.medium,
    color: colors.text.primary,
  },
  chipTextSelected: {
    color: colors.background,
  },
});
