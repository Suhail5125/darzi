# Environment Configuration Testing Guide

This document explains how to verify that environment configuration is working correctly for both mobile and web applications.

## Overview

Environment files have been created for both platforms:

### Mobile (Expo)
- `apps/mobile/.env.development` - Development environment variables
- `apps/mobile/.env.production` - Production environment variables

Variables:
- `EXPO_PUBLIC_API_URL` - API endpoint URL
- `EXPO_PUBLIC_ENV` - Environment name (development/production)

### Web (Vite)
- `apps/web/.env.development` - Development environment variables
- `apps/web/.env.production` - Production environment variables

Variables:
- `VITE_API_URL` - API endpoint URL
- `VITE_ENV` - Environment name (development/production)

## Configuration Module

The shared configuration module (`packages/shared-utils/src/config/index.ts`) automatically detects the platform and reads the appropriate environment variables:

```typescript
import { config } from '@darzi/shared-utils';

console.log(config.apiUrl);      // Platform-specific API URL
console.log(config.environment); // 'development' or 'production'
```

## Testing Instructions

### Web Application

1. **Start development server:**
   ```bash
   npm run dev:web
   ```

2. **Navigate to the test page:**
   Open your browser and go to: `http://localhost:5173/config-test`

3. **Verify the configuration:**
   - Check that the page shows "Configuration Loaded Successfully"
   - Verify API URL matches `.env.development` (http://localhost:3000)
   - Verify Environment shows "development"
   - Check browser console for detailed output

4. **Test production build:**
   ```bash
   npm run build:web
   npm run preview
   ```
   Navigate to the config-test page and verify production values are used.

### Mobile Application

1. **Start development server:**
   ```bash
   npm run dev:mobile
   ```

2. **Open the app:**
   - Press `i` for iOS simulator
   - Press `a` for Android emulator
   - Or scan QR code with Expo Go app

3. **Test configuration:**
   - On the home screen, tap "Test Environment Config" button
   - Check the console/terminal output for configuration values
   - Verify API URL matches `.env.development` (http://localhost:3000)
   - Verify Environment shows "development"

4. **Alternative - Use ConfigTest component:**
   You can also import and render the full ConfigTest component:
   ```typescript
   import { ConfigTest } from '../components/ConfigTest';
   // Render <ConfigTest /> in your screen
   ```

## Verification Checklist

- [ ] Web development mode reads from `.env.development`
- [ ] Web production build reads from `.env.production`
- [ ] Mobile development mode reads from `.env.development`
- [ ] Mobile production build reads from `.env.production`
- [ ] Config module correctly detects platform (mobile vs web)
- [ ] API URLs are different between development and production
- [ ] Environment names are correct for each mode

## Expected Values

### Development Mode
- API URL: `http://localhost:3000`
- Environment: `development`

### Production Mode
- API URL: `https://api.production.com` (update this to your actual production URL)
- Environment: `production`

## Troubleshooting

### Environment variables not loading

**Web (Vite):**
- Ensure variables start with `VITE_` prefix
- Restart the dev server after changing .env files
- Check that .env files are in `apps/web/` directory

**Mobile (Expo):**
- Ensure variables start with `EXPO_PUBLIC_` prefix
- Restart the Expo dev server after changing .env files
- Check that .env files are in `apps/mobile/` directory
- Clear cache: `npx expo start --clear`

### Default values being used

If you see warnings about environment variables not being set:
1. Verify .env files exist in the correct location
2. Check that variable names match exactly (case-sensitive)
3. Restart the development server
4. For mobile, try clearing the cache

## Implementation Details

The configuration system uses platform detection to determine which environment variables to read:

- **Mobile (React Native):** Checks `navigator.product === 'ReactNative'` and reads `process.env.EXPO_PUBLIC_*`
- **Web (Vite):** Reads `import.meta.env.VITE_*`

This allows the same config module to work seamlessly on both platforms while accessing platform-specific environment variables.
