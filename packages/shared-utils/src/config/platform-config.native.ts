interface Config {
  apiUrl: string;
  environment: 'development' | 'production';
}

export const getConfig = (): Config => {
  return {
    apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
    environment: process.env.EXPO_PUBLIC_ENV as any || 'development'
  };
};
