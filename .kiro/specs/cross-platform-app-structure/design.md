# Design Document: Cross-Platform App Structure

## Overview

This design defines the monorepo structure, configuration files, and integration patterns for a cross-platform application supporting both React Native/Expo (mobile) and React/Vite (web) with shared packages for UI components, utilities, and assets.

## Architecture

### Directory Structure

```
project-root/
├── apps/
│   ├── mobile/                    # React Native/Expo app
│   │   ├── src/
│   │   │   ├── app/              # Expo Router file-based routes
│   │   │   │   ├── (tabs)/       # Tab navigator group
│   │   │   │   │   ├── index.tsx # Home tab screen
│   │   │   │   │   └── profile.tsx # Profile tab screen
│   │   │   │   ├── _layout.tsx   # Root layout
│   │   │   │   └── +not-found.tsx # 404 screen
│   │   │   ├── components/       # Mobile-specific components
│   │   │   └── hooks/            # Mobile-specific hooks
│   │   ├── assets/               # Expo assets (icon, splash)
│   │   ├── app.json              # Expo configuration
│   │   ├── package.json          # Mobile dependencies
│   │   ├── tsconfig.json         # Mobile TypeScript config
│   │   └── tailwind.config.js    # NativeWind configuration
│   │
│   └── web/                       # React/Vite app (existing)
│       ├── src/
│       │   ├── pages/            # Web pages
│       │   ├── components/       # Web-specific components
│       │   ├── routes/           # Routing configuration
│       │   └── hooks/            # Web-specific hooks
│       ├── package.json          # Web dependencies
│       ├── tsconfig.json         # Web TypeScript config
│       └── tailwind.config.js    # Tailwind configuration
│
├── packages/
│   ├── shared-ui/                # Shared UI components
│   │   ├── src/
│   │   │   ├── components/      # Cross-platform components
│   │   │   ├── index.ts         # Main exports
│   │   │   └── types.ts         # Shared types
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   ├── shared-utils/             # Shared utilities
│   │   ├── src/
│   │   │   ├── validation/      # Validation utilities
│   │   │   ├── formatting/      # Formatters
│   │   │   ├── config/          # Configuration module
│   │   │   └── index.ts         # Main exports
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── shared-assets/            # Shared assets
│       ├── images/
│       ├── fonts/
│       ├── icons/
│       ├── src/
│       │   └── index.ts         # Asset exports
│       ├── package.json
│       └── tsconfig.json
│
├── package.json                  # Root workspace configuration
├── tsconfig.json                 # Root TypeScript configuration
└── tailwind.config.base.js      # Shared Tailwind configuration
```

## Component Design

### 1. Root Workspace Configuration

**File:** `package.json` (root)

```json
{
  "name": "cross-platform-monorepo",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev:mobile": "npm run start --workspace=apps/mobile",
    "dev:web": "npm run dev --workspace=apps/web",
    "build:mobile": "npm run build --workspace=apps/mobile",
    "build:web": "npm run build --workspace=apps/web",
    "type-check": "tsc --noEmit"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
```

**Validates:** Requirements 5.1, 5.6, 6.1, 6.2, 6.3, 6.4

### 2. Root TypeScript Configuration

**File:** `tsconfig.json` (root)

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "moduleResolution": "bundler",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx"
  }
}
```

**Validates:** Requirements 7.1

### 3. Mobile App Configuration

**File:** `apps/mobile/package.json`

```json
{
  "name": "mobile",
  "version": "1.0.0",
  "main": "expo-router/entry",
  "scripts": {
    "start": "expo start",
    "android": "expo start --android",
    "ios": "expo start --ios",
    "build": "expo build"
  },
  "dependencies": {
    "expo": "~50.0.0",
    "expo-router": "~3.0.0",
    "react": "18.2.0",
    "react-native": "0.73.0",
    "nativewind": "^4.0.0",
    "@shared-ui": "workspace:*",
    "@shared-utils": "workspace:*",
    "@shared-assets": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "~18.2.0",
    "typescript": "^5.0.0",
    "tailwindcss": "^3.4.0"
  }
}
```

**Validates:** Requirements 1.1, 1.2, 1.5, 2.5, 5.2, 5.4

**File:** `apps/mobile/app.json`

```json
{
  "expo": {
    "name": "Mobile App",
    "slug": "mobile-app",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.example.mobile"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.example.mobile"
    },
    "plugins": [
      "expo-router"
    ]
  }
}
```

**Validates:** Requirements 1.4, 1.6

**File:** `apps/mobile/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "jsx": "react-native",
    "paths": {
      "@shared-ui": ["../../packages/shared-ui/src"],
      "@shared-utils": ["../../packages/shared-utils/src"],
      "@shared-assets": ["../../packages/shared-assets/src"]
    }
  },
  "include": ["src/**/*", "App.tsx"],
  "exclude": ["node_modules"]
}
```

**Validates:** Requirements 7.2, 7.7

**File:** `apps/mobile/tailwind.config.js`

```javascript
const baseConfig = require('../../tailwind.config.base');

module.exports = {
  ...baseConfig,
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/shared-ui/src/**/*.{js,jsx,ts,tsx}'
  ]
};
```

**Validates:** Requirements 8.1, 8.5

### 4. Mobile App Structure

**File:** `apps/mobile/src/app/_layout.tsx`

```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
```

**File:** `apps/mobile/src/app/(tabs)/_layout.tsx`

```typescript
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen 
        name="index" 
        options={{ title: 'Home' }} 
      />
      <Tabs.Screen 
        name="profile" 
        options={{ title: 'Profile' }} 
      />
    </Tabs>
  );
}
```

**File:** `apps/mobile/src/app/(tabs)/index.tsx`

```typescript
import { View, Text } from 'react-native';
import { Button } from '@shared-ui';

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-2xl font-bold">Home Screen</Text>
      <Button title="Press Me" onPress={() => console.log('Pressed')} />
    </View>
  );
}
```

**Validates:** Requirements 1.7, 9.1, 9.4

**Directory Structure:**
- `apps/mobile/src/app/` - Expo Router file-based routes
- `apps/mobile/src/components/` - Mobile-specific components
- `apps/mobile/src/hooks/` - Mobile-specific hooks
- `apps/mobile/assets/` - Expo assets (icon, splash, adaptive-icon)

**Validates:** Requirements 12.1

### 5. Web App Configuration

**File:** `apps/web/package.json` (modifications)

```json
{
  "name": "web",
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "wouter": "^3.0.0",
    "@shared-ui": "workspace:*",
    "@shared-utils": "workspace:*",
    "@shared-assets": "workspace:*"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0",
    "vite": "^5.0.0",
    "@vitejs/plugin-react": "^4.0.0",
    "tailwindcss": "^3.4.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0"
  }
}
```

**Validates:** Requirements 2.6, 5.2, 5.4

**File:** `apps/web/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "paths": {
      "@shared-ui": ["../../packages/shared-ui/src"],
      "@shared-utils": ["../../packages/shared-utils/src"],
      "@shared-assets": ["../../packages/shared-assets/src"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

**Validates:** Requirements 7.3, 7.7

**File:** `apps/web/tailwind.config.js`

```javascript
const baseConfig = require('../../tailwind.config.base');

module.exports = {
  ...baseConfig,
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    '../../packages/shared-ui/src/**/*.{js,jsx,ts,tsx}'
  ]
};
```

**Validates:** Requirements 8.2, 8.6

**Directory Structure:**
- `apps/web/src/pages/` - Web page components
- `apps/web/src/components/` - Web-specific components
- `apps/web/src/routes/` - Routing configuration
- `apps/web/src/hooks/` - Web-specific hooks

**Validates:** Requirements 12.2

### 6. Shared UI Package

**File:** `packages/shared-ui/package.json`

```json
{
  "name": "@shared-ui",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {
    "react": "^18.2.0"
  },
  "peerDependencies": {
    "react": "^18.2.0",
    "react-native": "*"
  },
  "peerDependenciesMeta": {
    "react-native": {
      "optional": true
    }
  }
}
```

**File:** `packages/shared-ui/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"]
}
```

**Validates:** Requirements 7.4

**File:** `packages/shared-ui/src/index.ts`

```typescript
export { Button } from './components/Button';
export { Card } from './components/Card';
export { Input } from './components/Input';
// Export other cross-platform components
```

**File:** `packages/shared-ui/src/components/Button.tsx` (example)

```typescript
import React from 'react';
import { Platform } from './platform-adapter';

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
```

**File:** `packages/shared-ui/src/platform-adapter.ts`

```typescript
export const Platform = {
  isNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative',
  isWeb: typeof window !== 'undefined' && typeof document !== 'undefined',
  
  select: <T>(options: { native: T; web: T }): T => {
    return Platform.isNative ? options.native : options.web;
  }
};
```

**Validates:** Requirements 2.1, 2.2, 2.3, 2.4, 12.3

### 7. Shared Utils Package

**File:** `packages/shared-utils/package.json`

```json
{
  "name": "@shared-utils",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "dependencies": {}
}
```

**File:** `packages/shared-utils/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"]
}
```

**Validates:** Requirements 7.5

**File:** `packages/shared-utils/src/index.ts`

```typescript
export * from './validation';
export * from './formatting';
export * from './config';
```

**File:** `packages/shared-utils/src/validation/index.ts`

```typescript
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^\+?[\d\s-()]+$/;
  return phoneRegex.test(phone);
};
```

**File:** `packages/shared-utils/src/formatting/index.ts`

```typescript
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
};

export const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US').format(date);
};
```

**File:** `packages/shared-utils/src/config/index.ts`

```typescript
interface Config {
  apiUrl: string;
  environment: 'development' | 'production';
}

const getConfig = (): Config => {
  // Platform-specific environment variable access
  const isNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  
  if (isNative) {
    // Expo environment variables
    return {
      apiUrl: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000',
      environment: process.env.EXPO_PUBLIC_ENV as any || 'development'
    };
  } else {
    // Vite environment variables
    return {
      apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:3000',
      environment: import.meta.env.VITE_ENV as any || 'development'
    };
  }
};

export const config = getConfig();
```

**Validates:** Requirements 4.1, 4.2, 4.3, 4.4, 11.3, 11.4, 12.4

### 8. Shared Assets Package

**File:** `packages/shared-assets/package.json`

```json
{
  "name": "@shared-assets",
  "version": "1.0.0",
  "main": "./src/index.ts",
  "types": "./src/index.ts"
}
```

**File:** `packages/shared-assets/tsconfig.json`

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true
  },
  "include": ["src/**/*"]
}
```

**Validates:** Requirements 7.6

**File:** `packages/shared-assets/src/index.ts`

```typescript
// Image exports
export const images = {
  logo: require('../images/logo.png'),
  placeholder: require('../images/placeholder.png')
};

// Icon exports (SVG for web, PNG for mobile)
export const icons = {
  home: Platform.isNative 
    ? require('../icons/home.png')
    : require('../icons/home.svg'),
  profile: Platform.isNative
    ? require('../icons/profile.png')
    : require('../icons/profile.svg')
};

// Font exports
export const fonts = {
  regular: require('../fonts/Regular.ttf'),
  bold: require('../fonts/Bold.ttf')
};

const Platform = {
  isNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
};
```

**File:** `packages/shared-assets/src/types.d.ts`

```typescript
declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpg' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: any;
  export default value;
}

declare module '*.ttf' {
  const value: any;
  export default value;
}
```

**Directory Structure:**
- `packages/shared-assets/images/` - Image files
- `packages/shared-assets/fonts/` - Font files
- `packages/shared-assets/icons/` - Icon files (SVG and PNG)

**Validates:** Requirements 3.1, 3.2, 3.3, 3.6, 3.7, 10.5, 10.6, 12.5

### 9. Base Tailwind Configuration

**File:** `tailwind.config.base.js`

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#3B82F6',
        secondary: '#10B981',
        accent: '#F59E0B'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
};
```

**Validates:** Requirements 8.3

## Integration Patterns

### Pattern 1: Cross-Platform Component Development

When creating a component that works on both platforms:

1. Create component in `packages/shared-ui/src/components/`
2. Use Platform adapter for platform-specific behavior
3. Use Tailwind classes compatible with both NativeWind and Tailwind CSS
4. Export from `packages/shared-ui/src/index.ts`
5. Import in apps using `@shared-ui`

**Validates:** Requirements 2.1, 2.2, 2.5, 2.6, 8.3

### Pattern 2: Platform-Specific Component Variants

When a component needs significant platform differences:

1. Create base interface in `packages/shared-ui/src/types.ts`
2. Create platform-specific implementations in respective app directories
3. Document why component cannot be shared

**Validates:** Requirements 2.7, 12.6, 12.7

### Pattern 3: Asset Loading

Mobile (React Native):
```typescript
import { images } from '@shared-assets';
import { Image } from 'react-native';

<Image source={images.logo} style={{ width: 100, height: 100 }} />
```

Web (React):
```typescript
import { images } from '@shared-assets';

<img src={images.logo} alt="Logo" className="w-24 h-24" />
```

**Validates:** Requirements 3.4, 3.5, 10.1, 10.2

### Pattern 4: Environment Configuration

Both platforms:
```typescript
import { config } from '@shared-utils';

fetch(`${config.apiUrl}/api/data`);
```

**Validates:** Requirements 11.1, 11.2, 11.3, 11.4

### Pattern 5: Navigation Setup

Mobile (`apps/mobile/src/app/_layout.tsx`):
```typescript
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

Mobile Tabs (`apps/mobile/src/app/(tabs)/_layout.tsx`):
```typescript
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
```

Web (`apps/web/src/routes/index.tsx`):
```typescript
import { Route, Switch } from 'wouter';
import { HomePage } from '../pages/HomePage';
import { ProfilePage } from '../pages/ProfilePage';

export const Routes = () => (
  <Switch>
    <Route path="/" component={HomePage} />
    <Route path="/profile" component={ProfilePage} />
  </Switch>
);
```

**Validates:** Requirements 9.1, 9.2, 9.4, 9.5

## Development Workflow

### Initial Setup

1. Install dependencies: `npm install` (at root)
2. This hoists common dependencies and links workspace packages

**Validates:** Requirements 5.3

### Running Applications

- Mobile: `npm run dev:mobile` starts Expo dev server
- Web: `npm run dev:web` starts Vite dev server
- Both support hot module replacement

**Validates:** Requirements 6.1, 6.2, 6.5

### Building Applications

- Mobile: `npm run build:mobile` creates production builds
- Web: `npm run build:web` creates optimized production build

**Validates:** Requirements 6.3, 6.4

### Type Checking

- Run `npm run type-check` at root to check all workspaces
- TypeScript resolves workspace references correctly

**Validates:** Requirements 6.6, 7.7

## Asset Optimization Strategy

### Images

- Provide @1x, @2x, @3x versions for mobile
- Use responsive images for web
- Optimize file sizes for mobile bundle

**Validates:** Requirements 10.3, 10.4

### Icons

- Use SVG for web
- Provide PNG alternatives for mobile
- Export platform-appropriate format from shared-assets

**Validates:** Requirements 10.5, 10.6

## Environment Configuration Strategy

### Mobile (Expo)

Create `.env` files:
- `.env.development`
- `.env.production`

Access via `process.env.EXPO_PUBLIC_*`

**Validates:** Requirements 11.1, 11.5

### Web (Vite)

Create `.env` files:
- `.env.development`
- `.env.production`

Access via `import.meta.env.VITE_*`

**Validates:** Requirements 11.2, 11.6

## Correctness Properties

### Property 1: Workspace Resolution
**For all shared packages P and all apps A:**
- IF A imports from P using workspace protocol
- THEN the import resolves to P's source code
- AND changes to P are immediately reflected in A during development

**Validates:** Requirements 5.2, 5.3, 7.7

### Property 2: Cross-Platform Component Compatibility
**For all components C in shared-ui:**
- IF C is exported from shared-ui
- THEN C can be imported and rendered in both mobile and web apps
- AND C maintains consistent visual appearance across platforms

**Validates:** Requirements 2.1, 2.5, 2.6

### Property 3: Asset Loading Consistency
**For all assets A in shared-assets:**
- IF A is exported from shared-assets
- THEN A can be loaded in both mobile and web apps
- AND A displays correctly on both platforms

**Validates:** Requirements 3.3, 3.4, 3.5

### Property 4: Type Safety Across Workspaces
**For all shared packages P:**
- IF P exports TypeScript types
- THEN those types are available to all apps importing P
- AND TypeScript compiler validates usage correctly

**Validates:** Requirements 7.7

### Property 5: Environment Configuration Isolation
**For all environment variables E:**
- IF E is defined for development environment
- THEN E is only accessible in development builds
- AND production builds use production environment variables

**Validates:** Requirements 11.5, 11.6

### Property 6: Build Independence
**For all apps A:**
- IF A is built using its build command
- THEN the build succeeds without requiring other apps to be built
- AND the build includes all necessary dependencies from shared packages

**Validates:** Requirements 6.3, 6.4

### Property 7: Hot Module Replacement
**For all apps A in development mode:**
- IF source code in A or its dependencies changes
- THEN the changes are reflected in the running app
- WITHOUT requiring a full restart

**Validates:** Requirements 6.5

### Property 8: Platform-Specific Styling
**For all components C using Tailwind classes:**
- IF C is rendered on mobile
- THEN NativeWind processes the Tailwind classes
- AND IF C is rendered on web
- THEN standard Tailwind CSS processes the classes
- AND the visual result is consistent

**Validates:** Requirements 8.1, 8.2, 8.3

## Summary

This design provides a complete monorepo structure for cross-platform development with:

- Clear separation between mobile and web apps
- Shared packages for UI, utilities, and assets
- Proper workspace configuration for dependency management
- Platform-specific configurations while maximizing code reuse
- Type-safe development across all packages
- Optimized asset loading for each platform
- Environment-specific configuration
- Streamlined development workflow

All requirements are addressed through the directory structure, configuration files, and integration patterns defined above.
