import React from 'react';
import { Platform } from '../platform-adapter';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  const Container = Platform.isNative ? 
    require('react-native').View : 
    'div';

  const baseClasses = 'bg-white rounded-lg shadow-md p-4';

  return (
    <Container className={`${baseClasses} ${className}`}>
      {children}
    </Container>
  );
};
