export const config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL || 'https://api.darzi.com',
  appName: 'Darzi',
  version: '1.0.0',
  supportEmail: 'support@darzi.com',
  socialMedia: {
    facebook: 'https://facebook.com/darzi',
    instagram: 'https://instagram.com/darzi',
    twitter: 'https://twitter.com/darzi',
    whatsapp: 'https://wa.me/1234567890',
  },
  toast: {
    duration: 3000,
    position: 'top',
  },
  cart: {
    maxQuantity: 99,
    deliveryFee: 5.99,
    taxRate: 0.08,
  },
};
