import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, spacing, typography, borderRadius } from '../../constants/theme';
import { Location } from '../../hooks/useLocation';

interface LocationSelectorProps {
  visible: boolean;
  currentLocation: Location | null;
  availableLocations: Location[];
  onSelectLocation: (location: Location) => void;
  onClose: () => void;
}

export default function LocationSelector({
  visible,
  currentLocation,
  availableLocations,
  onSelectLocation,
  onClose,
}: LocationSelectorProps) {
  const handleSelectLocation = (location: Location) => {
    onSelectLocation(location);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.container} onPress={(e) => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Select Location</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
              accessibilityLabel="Close location selector"
              accessibilityRole="button"
            >
              <Ionicons name="close" size={24} color={colors.text.primary} />
            </TouchableOpacity>
          </View>

          {/* Location List */}
          <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            {availableLocations.map((location) => {
              const isSelected = currentLocation?.id === location.id;

              return (
                <TouchableOpacity
                  key={location.id}
                  style={[
                    styles.locationItem,
                    isSelected && styles.locationItemSelected,
                  ]}
                  onPress={() => handleSelectLocation(location)}
                  accessibilityLabel={`Select ${location.displayName}`}
                  accessibilityRole="button"
                  accessibilityState={{ selected: isSelected }}
                >
                  <View style={styles.locationInfo}>
                    <Ionicons
                      name="location"
                      size={24}
                      color={isSelected ? colors.primary : colors.text.secondary}
                    />
                    <Text
                      style={[
                        styles.locationName,
                        isSelected && styles.locationNameSelected,
                      ]}
                    >
                      {location.displayName}
                    </Text>
                  </View>

                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={24} color={colors.primary} />
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  container: {
    backgroundColor: colors.background,
    borderTopLeftRadius: borderRadius.xl,
    borderTopRightRadius: borderRadius.xl,
    maxHeight: '70%',
    paddingBottom: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontWeight: 'bold',
    color: colors.text.primary,
  },
  closeButton: {
    padding: spacing.xs,
  },
  scrollView: {
    paddingHorizontal: spacing.lg,
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderRadius: borderRadius.md,
    marginTop: spacing.sm,
    backgroundColor: colors.surface,
  },
  locationItemSelected: {
    backgroundColor: colors.primary + '15',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  locationName: {
    fontSize: typography.fontSize.base,
    color: colors.text.primary,
    fontWeight: '500',
  },
  locationNameSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
});
