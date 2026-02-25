import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';

interface DeliveryInstructionsProps {
  pickupInstructions: string;
  deliveryInstructions: string;
  onPickupInstructionsChange: (text: string) => void;
  onDeliveryInstructionsChange: (text: string) => void;
}

const PRESET_PICKUP = [
  'Ring doorbell',
  'Call on arrival',
  'Meet at lobby',
  'Leave at door',
  'Security gate code',
];

const PRESET_DELIVERY = [
  'Ring doorbell',
  'Call on arrival',
  'Leave at door',
  'Meet at lobby',
  'Contactless delivery',
];

const MAX_CHARACTERS = 200;

export function DeliveryInstructions({
  pickupInstructions,
  deliveryInstructions,
  onPickupInstructionsChange,
  onDeliveryInstructionsChange,
}: DeliveryInstructionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'pickup' | 'delivery'>('pickup');
  const [showPickupCustom, setShowPickupCustom] = useState(false);
  const [showDeliveryCustom, setShowDeliveryCustom] = useState(false);
  const [pickupCustomInput, setPickupCustomInput] = useState('');
  const [deliveryCustomInput, setDeliveryCustomInput] = useState('');

  // Parse instructions into array
  const pickupArray = pickupInstructions ? pickupInstructions.split(', ') : [];
  const deliveryArray = deliveryInstructions ? deliveryInstructions.split(', ') : [];

  const handlePickupPresetSelect = (preset: string) => {
    const currentArray = pickupArray.filter(item => PRESET_PICKUP.includes(item));
    if (currentArray.includes(preset)) {
      // Remove it
      const newArray = currentArray.filter(item => item !== preset);
      onPickupInstructionsChange(newArray.join(', '));
    } else {
      // Add it
      const newArray = [...currentArray, preset];
      onPickupInstructionsChange(newArray.join(', '));
    }
  };

  const handleDeliveryPresetSelect = (preset: string) => {
    const currentArray = deliveryArray.filter(item => PRESET_DELIVERY.includes(item));
    if (currentArray.includes(preset)) {
      // Remove it
      const newArray = currentArray.filter(item => item !== preset);
      onDeliveryInstructionsChange(newArray.join(', '));
    } else {
      // Add it
      const newArray = [...currentArray, preset];
      onDeliveryInstructionsChange(newArray.join(', '));
    }
  };

  const handleAddPickupCustom = () => {
    if (pickupCustomInput.trim()) {
      const currentArray = pickupArray.filter(item => PRESET_PICKUP.includes(item));
      const newArray = [...currentArray, pickupCustomInput.trim()];
      onPickupInstructionsChange(newArray.join(', '));
      setShowPickupCustom(false);
      setPickupCustomInput('');
    }
  };

  const handleAddDeliveryCustom = () => {
    if (deliveryCustomInput.trim()) {
      const currentArray = deliveryArray.filter(item => PRESET_DELIVERY.includes(item));
      const newArray = [...currentArray, deliveryCustomInput.trim()];
      onDeliveryInstructionsChange(newArray.join(', '));
      setShowDeliveryCustom(false);
      setDeliveryCustomInput('');
    }
  };

  const handleCancelPickupCustom = () => {
    setShowPickupCustom(false);
    setPickupCustomInput('');
  };

  const handleCancelDeliveryCustom = () => {
    setShowDeliveryCustom(false);
    setDeliveryCustomInput('');
  };

  const hasInstructions = pickupInstructions || deliveryInstructions;

  return (
    <View style={styles.container}>
      {/* Accordion Header */}
      <TouchableOpacity
        style={styles.header}
        onPress={() => setIsExpanded(!isExpanded)}
        activeOpacity={0.7}
      >
        <View style={styles.headerLeft}>
          <Ionicons name="document-text-outline" size={18} color={colors.primary} />
          <Text style={styles.headerText}>Add instructions</Text>
        </View>
        <View style={styles.headerRight}>
          {hasInstructions && !isExpanded && (
            <Ionicons name="checkmark-circle" size={18} color={colors.success} />
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
          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'pickup' && styles.tabActive]}
              onPress={() => setActiveTab('pickup')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'pickup' && styles.tabTextActive]}>
                Pickup
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'delivery' && styles.tabActive]}
              onPress={() => setActiveTab('delivery')}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabText, activeTab === 'delivery' && styles.tabTextActive]}>
                Delivery
              </Text>
            </TouchableOpacity>
          </View>

          {/* Pickup Tab Content */}
          {activeTab === 'pickup' && (
            <View>
              <View style={styles.presetScrollContainer}>
                <View style={styles.presetContainer}>
                  {PRESET_PICKUP.map((preset) => {
                    const isSelected = pickupArray.includes(preset);
                    return (
                      <TouchableOpacity
                        key={preset}
                        style={[styles.presetChip, isSelected && styles.presetChipSelected]}
                        onPress={() => handlePickupPresetSelect(preset)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.presetText, isSelected && styles.presetTextSelected]}>
                          {preset}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  
                  {/* Custom Button */}
                  <TouchableOpacity
                    style={styles.presetChip}
                    onPress={() => setShowPickupCustom(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.presetText}>Custom</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showPickupCustom && (
                <>
                  {/* Custom Input */}
                  <View style={styles.customInputContainer}>
                    <TextInput
                      style={styles.customInput}
                      value={pickupCustomInput}
                      onChangeText={(text) => {
                        if (text.length <= MAX_CHARACTERS) {
                          setPickupCustomInput(text);
                        }
                      }}
                      placeholder="Enter pickup instructions..."
                      placeholderTextColor={colors.text.disabled}
                      multiline
                      numberOfLines={2}
                      maxLength={MAX_CHARACTERS}
                      textAlignVertical="top"
                      autoFocus={true}
                    />
                    <Text style={styles.characterCount}>
                      {MAX_CHARACTERS - pickupCustomInput.length} characters
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelPickupCustom}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        !pickupCustomInput.trim() && styles.addButtonDisabled,
                      ]}
                      onPress={handleAddPickupCustom}
                      disabled={!pickupCustomInput.trim()}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          )}

          {/* Delivery Tab Content */}
          {activeTab === 'delivery' && (
            <View>
              <View style={styles.presetScrollContainer}>
                <View style={styles.presetContainer}>
                  {PRESET_DELIVERY.map((preset) => {
                    const isSelected = deliveryArray.includes(preset);
                    return (
                      <TouchableOpacity
                        key={preset}
                        style={[styles.presetChip, isSelected && styles.presetChipSelected]}
                        onPress={() => handleDeliveryPresetSelect(preset)}
                        activeOpacity={0.7}
                      >
                        <Text style={[styles.presetText, isSelected && styles.presetTextSelected]}>
                          {preset}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                  
                  {/* Custom Button */}
                  <TouchableOpacity
                    style={styles.presetChip}
                    onPress={() => setShowDeliveryCustom(true)}
                    activeOpacity={0.7}
                  >
                    <Text style={styles.presetText}>Custom</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {showDeliveryCustom && (
                <>
                  {/* Custom Input */}
                  <View style={styles.customInputContainer}>
                    <TextInput
                      style={styles.customInput}
                      value={deliveryCustomInput}
                      onChangeText={(text) => {
                        if (text.length <= MAX_CHARACTERS) {
                          setDeliveryCustomInput(text);
                        }
                      }}
                      placeholder="Enter delivery instructions..."
                      placeholderTextColor={colors.text.disabled}
                      multiline
                      numberOfLines={2}
                      maxLength={MAX_CHARACTERS}
                      textAlignVertical="top"
                      autoFocus={true}
                    />
                    <Text style={styles.characterCount}>
                      {MAX_CHARACTERS - deliveryCustomInput.length} characters
                    </Text>
                  </View>

                  {/* Action Buttons */}
                  <View style={styles.actionButtons}>
                    <TouchableOpacity
                      style={styles.cancelButton}
                      onPress={handleCancelDeliveryCustom}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[
                        styles.addButton,
                        !deliveryCustomInput.trim() && styles.addButtonDisabled,
                      ]}
                      onPress={handleAddDeliveryCustom}
                      disabled={!deliveryCustomInput.trim()}
                      activeOpacity={0.7}
                    >
                      <Text style={styles.addButtonText}>Add</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
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
  content: {
    padding: spacing.md,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: 'rgba(74, 111, 165, 0.1)',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(74, 111, 165, 0.05)',
    borderRadius: borderRadius.md,
    padding: 4,
    marginBottom: spacing.md,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.xs,
    alignItems: 'center',
    borderRadius: borderRadius.sm,
  },
  tabActive: {
    backgroundColor: '#FFFFFF',
  },
  tabText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.text.secondary,
  },
  tabTextActive: {
    color: colors.primary,
  },
  presetScrollContainer: {
    marginBottom: spacing.sm,
  },
  presetContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  presetChip: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.full,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderWidth: 1.5,
    borderColor: 'rgba(74, 111, 165, 0.2)',
  },
  presetChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  presetText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  presetTextSelected: {
    color: '#FFFFFF',
  },
  customInputContainer: {
    marginBottom: spacing.sm,
  },
  customInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    borderWidth: 2,
    borderColor: colors.primary,
    minHeight: 60,
  },
  characterCount: {
    fontSize: 10,
    fontFamily: typography.fontFamily.sans,
    color: colors.text.secondary,
    marginTop: spacing.xs,
    textAlign: 'right',
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
