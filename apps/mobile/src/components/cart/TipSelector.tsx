import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface TipSelectorProps {
  selectedTip: number;
  onTipChange: (amount: number) => void;
  subtotal: number;
}

const PRESET_AMOUNTS = [10, 20, 50];

export function TipSelector({ selectedTip, onTipChange, subtotal }: TipSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customTipInput, setCustomTipInput] = useState('');
  const [isCustomSelected, setIsCustomSelected] = useState(false);

  const handlePresetTip = (amount: number) => {
    // Toggle: if already selected, deselect (set to 0)
    if (isPresetSelected(amount)) {
      onTipChange(0);
      setIsCustomSelected(false);
    } else {
      onTipChange(amount);
      setIsCustomSelected(false);
      setShowCustomInput(false);
    }
  };

  const handleCustomClick = () => {
    // If custom is already selected, deselect it
    if (isCustomSelected) {
      onTipChange(0);
      setIsCustomSelected(false);
    } else {
      setShowCustomInput(true);
      setCustomTipInput(selectedTip > 0 ? selectedTip.toString() : '');
    }
  };

  const handleAddCustomTip = () => {
    const amount = parseFloat(customTipInput);
    if (!isNaN(amount) && amount > 0) {
      onTipChange(amount);
      setIsCustomSelected(true);
      setShowCustomInput(false);
    }
  };

  const handleCancelCustomTip = () => {
    setShowCustomInput(false);
    setCustomTipInput('');
  };

  const isPresetSelected = (amount: number) => {
    return !isCustomSelected && selectedTip === amount;
  };

  return (
    <View style={styles.container}>
      {/* Accordion Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="cash-outline" size={18} color={colors.primary} />
          <Text style={styles.headerText}>Tip your delivery partner</Text>
        </View>
        <View style={styles.headerRight}>
          {selectedTip > 0 && !isExpanded && (
            <Text style={styles.selectedAmount}>₹{selectedTip}</Text>
          )}
          <Ionicons
            name={isExpanded ? 'chevron-up' : 'chevron-down'}
            size={20}
            color={colors.text.secondary}
          />
        </View>
      </TouchableOpacity>

      {/* Expanded Content */}
      {isExpanded && (
        <View style={styles.content}>
          {/* Helpful Message */}
          <Text style={styles.helpText}>
            Help them earn a little extra for their effort, 100% of this tip will go to them
          </Text>

          {!showCustomInput ? (
            <>
              {/* Preset Options */}
              <View style={styles.optionsContainer}>
                {PRESET_AMOUNTS.map((amount) => {
                  const isSelected = isPresetSelected(amount);
                  return (
                    <TouchableOpacity
                      key={amount}
                      style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                      onPress={() => handlePresetTip(amount)}
                      activeOpacity={0.7}
                    >
                      <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                        ₹{amount}
                      </Text>
                    </TouchableOpacity>
                  );
                })}

                {/* Custom Button */}
                <TouchableOpacity
                  style={[
                    styles.optionButton,
                    isCustomSelected && styles.optionButtonSelected,
                  ]}
                  onPress={handleCustomClick}
                  activeOpacity={0.7}
                >
                  <Text
                    style={[
                      styles.optionText,
                      isCustomSelected && styles.optionTextSelected,
                    ]}
                  >
                    {isCustomSelected ? `₹${selectedTip}` : 'Custom'}
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              {/* Custom Input Box */}
              <View style={styles.customInputContainer}>
                <View style={styles.inputWrapper}>
                  <Text style={styles.currencySymbol}>₹</Text>
                  <TextInput
                    style={styles.input}
                    value={customTipInput}
                    onChangeText={setCustomTipInput}
                    keyboardType="decimal-pad"
                    placeholder="Enter amount"
                    placeholderTextColor={colors.text.disabled}
                    autoFocus={true}
                  />
                </View>
              </View>

              {/* Action Buttons */}
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.cancelButton}
                  onPress={handleCancelCustomTip}
                  activeOpacity={0.7}
                >
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.addButton,
                    (!customTipInput || parseFloat(customTipInput) <= 0) &&
                      styles.addButtonDisabled,
                  ]}
                  onPress={handleAddCustomTip}
                  disabled={!customTipInput || parseFloat(customTipInput) <= 0}
                  activeOpacity={0.7}
                >
                  <Text style={styles.addButtonText}>Add Tip</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: borderRadius.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  headerText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  selectedAmount: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.primary,
  },
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 111, 165, 0.1)',
  },
  helpText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    marginBottom: spacing.md,
    lineHeight: 16,
  },
  optionsContainer: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  optionButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(74, 111, 165, 0.2)',
  },
  optionButtonSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  optionTextSelected: {
    color: '#FFFFFF',
  },
  customInputContainer: {
    marginBottom: spacing.sm,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderWidth: 2,
    borderColor: colors.primary,
  },
  currencySymbol: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  actionButtons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: 'rgba(74, 111, 165, 0.1)',
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  addButtonDisabled: {
    backgroundColor: colors.text.disabled,
  },
  addButtonText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});
