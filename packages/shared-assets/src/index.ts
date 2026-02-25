// Platform detection utility
const Platform = {
  isNative: typeof navigator !== 'undefined' && navigator.product === 'ReactNative'
};

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
