import React from 'react';
import { Platform } from '../platform-adapter';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary',
  className = ''
}) => {
  const Component = Platform.isNative ? 
    require('react-native').TouchableOpacity : 
    'button';
  
  const Text = Platform.isNative ? 
    require('react-native').Text : 
    'span';

  const baseClasses = variant === 'primary' 
    ? 'bg-blue-500 text-white' 
    : 'bg-gray-200 text-gray-800';

  return (
    <Component 
      onPress={Platform.isNative ? onPress : undefined}
      onClick={Platform.isNative ? undefined : onPress}
      className={`px-4 py-2 rounded ${baseClasses} ${className}`}
    >
      <Text>{title}</Text>
    </Component>
  );
};
