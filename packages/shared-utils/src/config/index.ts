/// <reference types="../vite-env.d.ts" />

// Import platform-specific config
// Metro will automatically use .native.ts for React Native and .ts for web
import { getConfig as getPlatformConfig } from './platform-config';

interface Config {
  apiUrl: string;
  environment: 'development' | 'production';
}

export const config = getPlatformConfig();

// Configuration verification for testing
export interface ConfigVerification {
  success: boolean;
  platform: 'mobile' | 'web';
  config: {
    apiUrl: string;
    environment: string;
  };
  messages: string[];
}

export function verifyConfig(): ConfigVerification {
  const isNative = typeof navigator !== 'undefined' && navigator.product === 'ReactNative';
  const messages: string[] = [];
  
  // Get current config
  const currentConfig = {
    apiUrl: config.apiUrl,
    environment: config.environment
  };
  
  messages.push(`Platform detected: ${isNative ? 'mobile (React Native)' : 'web (Vite)'}`);
  messages.push(`API URL: ${currentConfig.apiUrl}`);
  messages.push(`Environment: ${currentConfig.environment}`);
  
  // Verify config is working
  const success = !!(currentConfig.apiUrl && currentConfig.environment);
  
  if (success) {
    messages.push('✅ Configuration loaded successfully');
  } else {
    messages.push('❌ Configuration failed to load');
  }
  
  return {
    success,
    platform: isNative ? 'mobile' : 'web',
    config: currentConfig,
    messages
  };
}

export function printConfigVerification(): void {
  const result = verifyConfig();
  
  console.log('\n=== Environment Configuration Verification ===\n');
  
  result.messages.forEach(msg => console.log(msg));
  
  console.log('\n--- Configuration Values ---');
  console.log(JSON.stringify(result.config, null, 2));
  
  console.log('\n===========================================\n');
}
