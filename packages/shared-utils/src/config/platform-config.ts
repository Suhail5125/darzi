/// <reference types="../vite-env.d.ts" />

interface Config {
  apiUrl: string;
  environment: 'development' | 'production';
}

export const getConfig = (): Config => {
  return {
    apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
    environment: import.meta.env.VITE_ENV as any || 'development'
  };
};
