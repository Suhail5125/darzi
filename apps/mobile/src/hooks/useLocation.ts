import { useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LOCATION_STORAGE_KEY = '@darzi_selected_location';

export interface Location {
  id: string;
  name: string;
  displayName: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}

export interface UseLocationReturn {
  currentLocation: Location | null;
  availableLocations: Location[];
  isLoading: boolean;
  setLocation: (location: Location) => Promise<void>;
  clearLocation: () => Promise<void>;
  refreshLocations: () => Promise<void>;
}

// Mock available locations - in production, this would come from an API
const AVAILABLE_LOCATIONS: Location[] = [
  {
    id: '1',
    name: 'downtown',
    displayName: 'Downtown',
    coordinates: { latitude: 40.7128, longitude: -74.006 },
  },
  {
    id: '2',
    name: 'midtown',
    displayName: 'Midtown',
    coordinates: { latitude: 40.7549, longitude: -73.9840 },
  },
  {
    id: '3',
    name: 'uptown',
    displayName: 'Uptown',
    coordinates: { latitude: 40.7829, longitude: -73.9654 },
  },
  {
    id: '4',
    name: 'brooklyn',
    displayName: 'Brooklyn',
    coordinates: { latitude: 40.6782, longitude: -73.9442 },
  },
  {
    id: '5',
    name: 'queens',
    displayName: 'Queens',
    coordinates: { latitude: 40.7282, longitude: -73.7949 },
  },
];

/**
 * Custom hook for managing user location selection and persistence
 * @returns Location state and methods
 */
export function useLocation(): UseLocationReturn {
  const [currentLocation, setCurrentLocation] = useState<Location | null>(null);
  const [availableLocations, setAvailableLocations] = useState<Location[]>(AVAILABLE_LOCATIONS);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved location from AsyncStorage on mount
  useEffect(() => {
    loadSavedLocation();
  }, []);

  const loadSavedLocation = async () => {
    try {
      setIsLoading(true);
      const savedLocationJson = await AsyncStorage.getItem(LOCATION_STORAGE_KEY);
      
      if (savedLocationJson) {
        const savedLocation: Location = JSON.parse(savedLocationJson);
        setCurrentLocation(savedLocation);
      } else {
        // Set default location if none saved
        const defaultLocation = AVAILABLE_LOCATIONS[0];
        setCurrentLocation(defaultLocation);
        await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(defaultLocation));
      }
    } catch (error) {
      console.error('Error loading saved location:', error);
      // Fallback to default location
      setCurrentLocation(AVAILABLE_LOCATIONS[0]);
    } finally {
      setIsLoading(false);
    }
  };

  const setLocation = useCallback(async (location: Location) => {
    try {
      setCurrentLocation(location);
      await AsyncStorage.setItem(LOCATION_STORAGE_KEY, JSON.stringify(location));
    } catch (error) {
      console.error('Error saving location:', error);
      throw error;
    }
  }, []);

  const clearLocation = useCallback(async () => {
    try {
      await AsyncStorage.removeItem(LOCATION_STORAGE_KEY);
      setCurrentLocation(null);
    } catch (error) {
      console.error('Error clearing location:', error);
      throw error;
    }
  }, []);

  const refreshLocations = useCallback(async () => {
    try {
      setIsLoading(true);
      // In production, fetch locations from API
      // const response = await api.get('/locations');
      // setAvailableLocations(response.data);
      
      // For now, use mock data
      setAvailableLocations(AVAILABLE_LOCATIONS);
    } catch (error) {
      console.error('Error refreshing locations:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    currentLocation,
    availableLocations,
    isLoading,
    setLocation,
    clearLocation,
    refreshLocations,
  };
}
