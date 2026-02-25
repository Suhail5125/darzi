import { View, Text } from 'react-native';
import { Link } from 'expo-router';
import { CrossPlatformButton, CrossPlatformCard } from '@darzi/shared-ui/mobile';

export default function NotFoundScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-gray-50 p-4">
      <CrossPlatformCard className="w-full max-w-md p-6">
        <Text className="text-6xl text-center mb-4">404</Text>
        <Text className="text-2xl font-bold text-center mb-2">
          Page Not Found
        </Text>
        <Text className="text-gray-600 text-center mb-6">
          The screen you're looking for doesn't exist.
        </Text>
        <Link href="/" asChild>
          <CrossPlatformButton 
            title="Go to Home" 
            onPress={() => {}}
            variant="primary"
          />
        </Link>
      </CrossPlatformCard>
    </View>
  );
}
