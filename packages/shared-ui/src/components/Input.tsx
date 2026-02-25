import React from 'react';
import { Platform } from '../platform-adapter';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  className?: string;
  secureTextEntry?: boolean;
  keyboardType?: string;
}

export const Input: React.FC<InputProps> = ({ 
  value, 
  onChangeText, 
  placeholder = '',
  className = '',
  secureTextEntry = false,
  keyboardType
}) => {
  const InputComponent = Platform.isNative ? 
    require('react-native').TextInput : 
    'input';

  const baseClasses = 'border border-gray-300 rounded-md px-3 py-2';

  if (Platform.isNative) {
    return (
      <InputComponent
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        className={`${baseClasses} ${className}`}
      />
    );
  }

  return (
    <InputComponent
      type={secureTextEntry ? 'password' : keyboardType === 'email-address' ? 'email' : 'text'}
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChangeText(e.target.value)}
      placeholder={placeholder}
      className={`${baseClasses} ${className}`}
    />
  );
};
