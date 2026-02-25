import React from 'react';
import { Button } from '@darzi/shared-ui';
import { images } from '@darzi/shared-assets';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <img src={images.logo} alt="Logo" className="w-24 h-24 mb-4" />
      <h1 className="text-4xl font-bold mb-4">Home Page</h1>
      <p className="text-lg text-gray-600 mb-6">Welcome to the web application</p>
      <Button onClick={() => console.log('Button clicked')}>
        Get Started
      </Button>
    </div>
  );
};
