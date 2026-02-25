import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { colors, typography, spacing, borderRadius } from '../../constants/theme';

export interface Service {
  id: string;
  title: string;
  category?: string;
  description: string;
  image?: any;
  imageUrl?: string;
  features?: string[];
  price?: string;
}

interface ServiceGridProps {
  services: Service[];
  onServicePress: (serviceId: string) => void;
}

export const ServiceGrid: React.FC<ServiceGridProps> = ({ services, onServicePress }) => {
  const renderServiceCard = ({ item, index }: { item: Service; index: number }) => {
    const isLastItem = index === services.length - 1;
    
    return (
      <TouchableOpacity
        style={[styles.cardContainer, isLastItem && styles.lastCardContainer]}
        onPress={() => onServicePress(item.id)}
        activeOpacity={0.9}
      >
        <View style={styles.card}>
          {/* Image */}
          <Image
            source={item.image || { uri: item.imageUrl || 'https://via.placeholder.com/200' }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Text overlay centered */}
          <View style={styles.textOverlay}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
            {item.price && (
              <Text style={styles.price}>{item.price}</Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Semi-transparent box container like booking form */}
      <View style={styles.sectionBox}>
        <Text style={styles.sectionTitle}>How We Help</Text>
        
        <FlatList
          data={services}
          renderItem={renderServiceCard}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: spacing.xl,
    paddingHorizontal: spacing.md,
  },
  sectionBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '700',
    color: colors.foreground,
    marginBottom: spacing.md,
  },
  cardContainer: {
    width: '100%',
    marginBottom: spacing.md,
  },
  lastCardContainer: {
    marginBottom: 0,
  },
  card: {
    borderRadius: borderRadius.xl,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
  },
  textOverlay: {
    position: 'absolute',
    bottom: spacing.md,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  title: {
    fontSize: typography.fontSize.xl,
    fontFamily: typography.fontFamily.sans,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: spacing.xs / 2,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  price: {
    fontSize: typography.fontSize.base,
    fontFamily: typography.fontFamily.sans,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
