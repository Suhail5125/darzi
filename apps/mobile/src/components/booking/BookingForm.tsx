import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  Platform,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { Service } from '../../types';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';
import { Button } from '../shared/Button';
import { DatePicker } from './DatePicker';

export interface BookingData {
  service: string;
  pickupDate: Date;
  pickupTimeSlot: string;
  deliveryDate: Date;
  deliveryTimeSlot: string;
  isEmergency: boolean;
  instructions?: string;
}

interface BookingFormProps {
  preselectedService?: string;
  services: Service[];
  userName: string;
  userAddress: string;
  onSubmit: (booking: BookingData) => void;
  isLoading?: boolean;
}

interface FormErrors {
  service?: string;
  pickupDate?: string;
  pickupTimeSlot?: string;
  deliveryDate?: string;
  deliveryTimeSlot?: string;
}

const TIME_SLOTS = [
  '9:00 AM - 12:00 PM',
  '12:00 PM - 3:00 PM',
  '3:00 PM - 6:00 PM',
  '6:00 PM - 9:00 PM',
];

const EMERGENCY_TIME_SLOTS = [
  'Within 30 minutes',
  'Within 1 hour',
  'Custom',
];

export function BookingForm({
  preselectedService,
  services,
  userName,
  userAddress,
  onSubmit,
  isLoading = false,
}: BookingFormProps) {
  const [selectedService, setSelectedService] = useState(preselectedService || '');
  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTimeSlot, setPickupTimeSlot] = useState('');
  const [deliveryDate, setDeliveryDate] = useState(new Date());
  const [deliveryTimeSlot, setDeliveryTimeSlot] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [customPickupTime, setCustomPickupTime] = useState('');
  const [customDeliveryTime, setCustomDeliveryTime] = useState('');
  const [showPickupTimePicker, setShowPickupTimePicker] = useState(false);
  const [showDeliveryTimePicker, setShowDeliveryTimePicker] = useState(false);
  const [selectedHour, setSelectedHour] = useState(12);
  const [selectedMinute, setSelectedMinute] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState<'AM' | 'PM'>('PM');
  const [instructions, setInstructions] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [showServicePicker, setShowServicePicker] = useState(false);
  const [showPickupTimeSlots, setShowPickupTimeSlots] = useState(false);
  const [showDeliveryTimeSlots, setShowDeliveryTimeSlots] = useState(false);

  useEffect(() => {
    if (preselectedService) {
      setSelectedService(preselectedService);
    }
  }, [preselectedService]);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!selectedService) {
      newErrors.service = 'Please select a service';
    }

    if (!pickupTimeSlot && !customPickupTime) {
      newErrors.pickupTimeSlot = 'Please select pickup time';
    }

    // Only validate delivery if emergency service is enabled
    if (isEmergency) {
      if (!deliveryTimeSlot && !customDeliveryTime) {
        newErrors.deliveryTimeSlot = 'Please select delivery time';
      }

      if (deliveryDate < pickupDate) {
        newErrors.deliveryDate = 'Delivery must be after pickup';
      }
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (pickupDate < today) {
      newErrors.pickupDate = 'Please select a future date';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSubmit({
        service: selectedService,
        pickupDate,
        pickupTimeSlot: customPickupTime || pickupTimeSlot,
        deliveryDate: isEmergency ? deliveryDate : pickupDate,
        deliveryTimeSlot: isEmergency ? (customDeliveryTime || deliveryTimeSlot) : '',
        isEmergency,
        instructions: instructions.trim() || undefined,
      });
    }
  };

  const minimumDate = new Date();

  const getSelectedServiceName = (): string => {
    const service = services.find(s => s.id === selectedService);
    return service ? service.title : 'Select a service';
  };

  const renderServiceItem = ({ item }: { item: Service }) => (
    <TouchableOpacity
      style={styles.serviceItem}
      onPress={() => {
        setSelectedService(item.id);
        setShowServicePicker(false);
        setErrors({ ...errors, service: undefined });
      }}
      activeOpacity={0.7}
    >
      <View style={styles.serviceItemContent}>
        <Text style={styles.serviceItemTitle}>{item.title}</Text>
        <Text style={styles.serviceItemCategory}>{item.category}</Text>
      </View>
      <Text style={styles.serviceItemPrice}>${item.price.toFixed(2)}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Address Section */}
      <View style={styles.sectionBox}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pick at & Delivered to:</Text>
          <TouchableOpacity 
            onPress={() => {/* TODO: Open address editor */}}
            activeOpacity={0.7}
          >
            <Text style={styles.changeLink}>Change</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.addressCard}>
          <View style={styles.addressRow}>
            <Ionicons name="person-outline" size={20} color={colors.primary} />
            <Text style={styles.addressText}>{userName || 'Guest User'}</Text>
          </View>
          <View style={styles.addressRow}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <Text style={styles.addressText}>{userAddress}</Text>
          </View>
        </View>
      </View>

      {/* Service Selection */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Choose Your Service</Text>
        
        <View style={styles.fieldSpacing}>
          <TouchableOpacity
            onPress={() => setShowServicePicker(true)}
            activeOpacity={0.7}
            disabled={isLoading}
          >
            {Platform.OS === 'ios' ? (
              <BlurView intensity={80} tint="light" style={styles.inputWrapper}>
                <View style={styles.selectInput}>
                  <Text
                    style={[
                      styles.selectText,
                      !selectedService && styles.selectPlaceholder,
                    ]}
                  >
                    {getSelectedServiceName()}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={colors.primary} />
                </View>
              </BlurView>
            ) : (
              <View style={[styles.inputWrapper, styles.inputWrapperAndroid]}>
                <View style={styles.selectInput}>
                  <Text
                    style={[
                      styles.selectText,
                      !selectedService && styles.selectPlaceholder,
                    ]}
                  >
                    {getSelectedServiceName()}
                  </Text>
                  <Ionicons name="chevron-down" size={20} color={colors.primary} />
                </View>
              </View>
            )}
          </TouchableOpacity>
          {errors.service && <Text style={styles.errorText}>{errors.service}</Text>}
        </View>
      </View>

      {/* Emergency Service Toggle */}
      <View style={styles.sectionBox}>
        <TouchableOpacity
          style={styles.emergencyToggle}
          onPress={() => setIsEmergency(!isEmergency)}
          activeOpacity={0.7}
        >
          <View style={styles.emergencyInfo}>
            <Ionicons 
              name={isEmergency ? "flash" : "flash-outline"} 
              size={24} 
              color={isEmergency ? colors.destructive : colors.primary} 
            />
            <View style={styles.emergencyText}>
              <Text style={[styles.emergencyTitle, isEmergency && styles.emergencyTitleActive]}>
                Emergency Service
              </Text>
              <Text style={styles.emergencySubtitle}>
                {isEmergency ? 'Extra charges apply' : 'Tap to enable'}
              </Text>
            </View>
          </View>
          <View style={[styles.toggle, isEmergency && styles.toggleActive]}>
            <View style={[styles.toggleThumb, isEmergency && styles.toggleThumbActive]} />
          </View>
        </TouchableOpacity>
        
        {isEmergency && (
          <View style={styles.emergencyNote}>
            <Ionicons name="information-circle-outline" size={20} color={colors.destructive} />
            <Text style={styles.emergencyNoteText}>
              Emergency service includes same-day delivery with additional charges based on urgency.
            </Text>
          </View>
        )}
      </View>

      {/* Pickup Details */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Pickup Details</Text>
        
        <DatePicker
          label=""
          value={pickupDate}
          onChange={(newDate) => {
            setPickupDate(newDate);
            if (errors.pickupDate) {
              setErrors({ ...errors, pickupDate: undefined });
            }
          }}
          error={errors.pickupDate}
          minimumDate={minimumDate}
        />
        
        <Text style={styles.label}>Time Slot *</Text>
        <View style={styles.timeSlotGrid}>
          {(isEmergency ? EMERGENCY_TIME_SLOTS : TIME_SLOTS).map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[
                styles.timeSlotButton,
                pickupTimeSlot === slot && styles.timeSlotButtonActive,
              ]}
              onPress={() => {
                if (slot === 'Custom') {
                  setShowPickupTimePicker(true);
                } else {
                  setPickupTimeSlot(slot);
                  setCustomPickupTime('');
                  if (errors.pickupTimeSlot) {
                    setErrors({ ...errors, pickupTimeSlot: undefined });
                  }
                }
              }}
              activeOpacity={0.7}
            >
              {isEmergency && (
                <Ionicons 
                  name={slot === 'Within 30 minutes' ? 'flash' : slot === 'Within 1 hour' ? 'time' : 'create-outline'} 
                  size={18} 
                  color={pickupTimeSlot === slot ? '#FFFFFF' : colors.primary}
                  style={styles.timeSlotIcon}
                />
              )}
              {!isEmergency && (
                <Ionicons 
                  name="time-outline" 
                  size={18} 
                  color={pickupTimeSlot === slot ? '#FFFFFF' : colors.primary}
                  style={styles.timeSlotIcon}
                />
              )}
              <Text
                style={[
                  styles.timeSlotText,
                  pickupTimeSlot === slot && styles.timeSlotTextActive,
                ]}
              >
                {slot}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {customPickupTime && (
          <View style={styles.customTimeDisplay}>
            <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
            <Text style={styles.customTimeDisplayText}>Custom time: {customPickupTime}</Text>
          </View>
        )}
        
        {errors.pickupTimeSlot && <Text style={styles.errorText}>{errors.pickupTimeSlot}</Text>}
      </View>

      {/* Delivery Details - Only show if emergency is enabled */}
      {isEmergency && (
        <View style={styles.sectionBox}>
          <Text style={styles.sectionTitle}>Delivery Details</Text>
          
          <DatePicker
            label=""
            value={deliveryDate}
            onChange={(newDate) => {
              setDeliveryDate(newDate);
              if (errors.deliveryDate) {
                setErrors({ ...errors, deliveryDate: undefined });
              }
            }}
            error={errors.deliveryDate}
            minimumDate={pickupDate}
          />
          
          <Text style={styles.label}>Time Slot *</Text>
          <View style={styles.timeSlotGrid}>
            {EMERGENCY_TIME_SLOTS.map((slot) => (
              <TouchableOpacity
                key={slot}
                style={[
                  styles.timeSlotButton,
                  deliveryTimeSlot === slot && styles.timeSlotButtonActive,
                ]}
                onPress={() => {
                  if (slot === 'Custom') {
                    setShowDeliveryTimePicker(true);
                  } else {
                    setDeliveryTimeSlot(slot);
                    setCustomDeliveryTime('');
                    if (errors.deliveryTimeSlot) {
                      setErrors({ ...errors, deliveryTimeSlot: undefined });
                    }
                  }
                }}
                activeOpacity={0.7}
              >
                <Ionicons 
                  name={slot === 'Within 30 minutes' ? 'flash' : slot === 'Within 1 hour' ? 'time' : 'create-outline'} 
                  size={18} 
                  color={deliveryTimeSlot === slot ? '#FFFFFF' : colors.primary}
                  style={styles.timeSlotIcon}
                />
                <Text
                  style={[
                    styles.timeSlotText,
                    deliveryTimeSlot === slot && styles.timeSlotTextActive,
                  ]}
                >
                  {slot}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          
          {customDeliveryTime && (
            <View style={styles.customTimeDisplay}>
              <Ionicons name="checkmark-circle" size={20} color={colors.primary} />
              <Text style={styles.customTimeDisplayText}>Custom time: {customDeliveryTime}</Text>
            </View>
          )}
          
          {errors.deliveryTimeSlot && <Text style={styles.errorText}>{errors.deliveryTimeSlot}</Text>}
        </View>
      )}

      {/* Special Instructions */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>Special Instructions</Text>
        <Text style={styles.sectionSubtitle}>Optional - Add any specific care requirements</Text>
        
        <View style={styles.fieldSpacing}>
          {Platform.OS === 'ios' ? (
          <BlurView intensity={80} tint="light" style={[styles.inputWrapper, styles.textAreaWrapper]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={instructions}
              onChangeText={setInstructions}
              placeholder="E.g., Handle with care, remove stains..."
              placeholderTextColor={colors.mutedForeground}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!isLoading}
            />
          </BlurView>
        ) : (
          <View style={[styles.inputWrapper, styles.inputWrapperAndroid, styles.textAreaWrapper]}>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={instructions}
              onChangeText={setInstructions}
              placeholder="E.g., Handle with care, remove stains..."
              placeholderTextColor={colors.mutedForeground}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
              editable={!isLoading}
            />
          </View>
          )}
        </View>
      </View>

      <Button
        title="Confirm Booking"
        onPress={handleSubmit}
        variant="primary"
        loading={isLoading}
        disabled={isLoading}
      />

      {/* Service Selection Modal */}
      <Modal
        visible={showServicePicker}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowServicePicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select a Service</Text>
              <TouchableOpacity
                onPress={() => setShowServicePicker(false)}
                style={styles.closeButton}
                activeOpacity={0.7}
              >
                <Ionicons name="close" size={20} color={colors.mutedForeground} />
              </TouchableOpacity>
            </View>
            <FlatList
              data={services}
              renderItem={renderServiceItem}
              keyExtractor={(item) => item.id}
              style={styles.serviceList}
            />
          </View>
        </View>
      </Modal>

      {/* Pickup Time Picker Modal */}
      {showPickupTimePicker && (
        <Modal
          visible={showPickupTimePicker}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowPickupTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.timePickerModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Pickup Time</Text>
                <TouchableOpacity
                  onPress={() => setShowPickupTimePicker(false)}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.timePickerContainer}>
                <View style={styles.timePickerRow}>
                  {/* Hour Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Hour</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <TouchableOpacity
                          key={hour}
                          style={[
                            styles.timePickerItem,
                            selectedHour === hour && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedHour(hour)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedHour === hour && styles.timePickerItemTextActive,
                            ]}
                          >
                            {hour}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Minute Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Minute</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <TouchableOpacity
                          key={minute}
                          style={[
                            styles.timePickerItem,
                            selectedMinute === minute && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedMinute(minute)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedMinute === minute && styles.timePickerItemTextActive,
                            ]}
                          >
                            {minute.toString().padStart(2, '0')}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Period Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Period</Text>
                    <View style={styles.periodContainer}>
                      {(['AM', 'PM'] as const).map((period) => (
                        <TouchableOpacity
                          key={period}
                          style={[
                            styles.timePickerItem,
                            selectedPeriod === period && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedPeriod(period)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedPeriod === period && styles.timePickerItemTextActive,
                            ]}
                          >
                            {period}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.timePickerActions}>
                <TouchableOpacity
                  style={styles.timePickerCancelButton}
                  onPress={() => {
                    setShowPickupTimePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timePickerCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timePickerConfirmButton}
                  onPress={() => {
                    const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
                    setCustomPickupTime(timeString);
                    setPickupTimeSlot('Custom');
                    setShowPickupTimePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timePickerConfirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Delivery Time Picker Modal */}
      {showDeliveryTimePicker && (
        <Modal
          visible={showDeliveryTimePicker}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowDeliveryTimePicker(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.timePickerModalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Delivery Time</Text>
                <TouchableOpacity
                  onPress={() => setShowDeliveryTimePicker(false)}
                  style={styles.closeButton}
                  activeOpacity={0.7}
                >
                  <Ionicons name="close" size={20} color={colors.mutedForeground} />
                </TouchableOpacity>
              </View>
              
              <View style={styles.timePickerContainer}>
                <View style={styles.timePickerRow}>
                  {/* Hour Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Hour</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((hour) => (
                        <TouchableOpacity
                          key={hour}
                          style={[
                            styles.timePickerItem,
                            selectedHour === hour && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedHour(hour)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedHour === hour && styles.timePickerItemTextActive,
                            ]}
                          >
                            {hour}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Minute Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Minute</Text>
                    <ScrollView style={styles.timePickerScroll} showsVerticalScrollIndicator={false}>
                      {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                        <TouchableOpacity
                          key={minute}
                          style={[
                            styles.timePickerItem,
                            selectedMinute === minute && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedMinute(minute)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedMinute === minute && styles.timePickerItemTextActive,
                            ]}
                          >
                            {minute.toString().padStart(2, '0')}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                  </View>

                  {/* Period Picker */}
                  <View style={styles.timePickerColumn}>
                    <Text style={styles.timePickerLabel}>Period</Text>
                    <View style={styles.periodContainer}>
                      {(['AM', 'PM'] as const).map((period) => (
                        <TouchableOpacity
                          key={period}
                          style={[
                            styles.timePickerItem,
                            selectedPeriod === period && styles.timePickerItemActive,
                          ]}
                          onPress={() => setSelectedPeriod(period)}
                          activeOpacity={0.7}
                        >
                          <Text
                            style={[
                              styles.timePickerItemText,
                              selectedPeriod === period && styles.timePickerItemTextActive,
                            ]}
                          >
                            {period}
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>
                </View>
              </View>

              <View style={styles.timePickerActions}>
                <TouchableOpacity
                  style={styles.timePickerCancelButton}
                  onPress={() => {
                    setShowDeliveryTimePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timePickerCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.timePickerConfirmButton}
                  onPress={() => {
                    const timeString = `${selectedHour}:${selectedMinute.toString().padStart(2, '0')} ${selectedPeriod}`;
                    setCustomDeliveryTime(timeString);
                    setDeliveryTimeSlot('Custom');
                    setShowDeliveryTimePicker(false);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.timePickerConfirmText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
  },
  changeLink: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  sectionSubtitle: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.mutedForeground,
    marginBottom: spacing.sm,
  },
  fieldSpacing: {
    marginTop: spacing.sm,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(43, 65, 98, 0.1)',
    gap: spacing.sm,
    marginTop: spacing.sm,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  addressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  addressText: {
    flex: 1,
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    fontWeight: '500',
  },
  datePickerContainer: {
    marginBottom: spacing.sm,
  },
  emergencyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(43, 65, 98, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  emergencyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flex: 1,
  },
  emergencyText: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  emergencyTitleActive: {
    color: colors.destructive,
  },
  emergencySubtitle: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.mutedForeground,
    marginTop: 2,
  },
  emergencyNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    marginTop: spacing.md,
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    borderRadius: borderRadius.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(229, 62, 62, 0.3)',
  },
  emergencyNoteText: {
    flex: 1,
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.destructive,
    lineHeight: typography.fontSize.xs * 1.4,
  },
  toggle: {
    width: 50,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.muted,
    padding: 2,
    justifyContent: 'center',
  },
  toggleActive: {
    backgroundColor: colors.destructive,
  },
  toggleThumb: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  toggleThumbActive: {
    alignSelf: 'flex-end',
  },
  timeSlotContainer: {
    marginTop: spacing.sm,
  },
  label: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: colors.foreground,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
    letterSpacing: 0.5,
  },
  timeSlotGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  timeSlotButton: {
    flex: 1,
    minWidth: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(43, 65, 98, 0.1)',
    gap: spacing.xs,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  timeSlotIcon: {
    marginRight: spacing.xs / 2,
  },
  timeSlotButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  timeSlotText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  timeSlotTextActive: {
    color: '#FFFFFF',
  },
  customTimeDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    padding: spacing.sm,
    backgroundColor: 'rgba(43, 65, 98, 0.05)',
    borderRadius: borderRadius.lg,
    gap: spacing.sm,
  },
  customTimeDisplayText: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.primary,
  },
  timePickerContainer: {
    padding: spacing.lg,
    backgroundColor: '#FFFFFF',
  },
  timePickerRow: {
    flexDirection: 'row',
    gap: spacing.md,
    height: 200,
  },
  timePickerColumn: {
    flex: 1,
    alignItems: 'center',
  },
  timePickerLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.sm,
  },
  timePickerScroll: {
    flex: 1,
    width: '100%',
  },
  periodContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  timePickerItem: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    marginVertical: spacing.xs / 2,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  timePickerItemActive: {
    backgroundColor: 'rgba(43, 65, 98, 0.1)',
  },
  timePickerItemText: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
  },
  timePickerItemTextActive: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  timePickerModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    paddingBottom: spacing.lg,
  },
  timePickerActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
  timePickerCancelButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.muted,
    alignItems: 'center',
  },
  timePickerCancelText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.mutedForeground,
  },
  timePickerConfirmButton: {
    flex: 1,
    paddingVertical: spacing.md,
    borderRadius: borderRadius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
  },
  timePickerConfirmText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  customTimeContainer: {
    marginTop: spacing.md,
  },
  customTimeLabel: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.sm,
  },
  customTimeInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: borderRadius.xl,
    borderWidth: 1,
    borderColor: 'rgba(43, 65, 98, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
  },
  inputWrapper: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(43, 65, 98, 0.1)',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  inputWrapperAndroid: {
    backgroundColor: '#FFFFFF',
    borderColor: 'rgba(43, 65, 98, 0.1)',
  },
  input: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    backgroundColor: 'transparent',
  },
  selectInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
  },
  selectText: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    color: colors.foreground,
    flex: 1,
  },
  selectPlaceholder: {
    color: colors.mutedForeground,
  },
  textAreaWrapper: {
    minHeight: 120,
  },
  textArea: {
    minHeight: 100,
    paddingTop: spacing.md,
  },
  errorText: {
    fontSize: typography.fontSize.xs,
    fontFamily: typography.fontFamily.sans,
    color: colors.destructive,
    marginTop: spacing.xs,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '70%',
    paddingBottom: spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43, 65, 98, 0.1)',
  },
  modalTitle: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.serif,
    fontWeight: 'bold',
    color: colors.primary,
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.muted,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceList: {
    paddingTop: spacing.sm,
  },
  serviceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs / 2,
    borderRadius: borderRadius.lg,
    backgroundColor: 'transparent',
  },
  serviceItemContent: {
    flex: 1,
  },
  serviceItemTitle: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: colors.foreground,
    marginBottom: spacing.xs / 2,
  },
  serviceItemCategory: {
    fontSize: typography.fontSize.sm,
    fontFamily: typography.fontFamily.sans,
    color: colors.mutedForeground,
  },
  serviceItemPrice: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: colors.primary,
    marginLeft: spacing.md,
  },
});
