export const Platform = {
  isNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative',
  isWeb: typeof window !== 'undefined' && typeof document !== 'undefined',
  
  select: <T>(options: { native: T; web: T }): T => {
    return Platform.isNative ? options.native : options.web;
  }
};
