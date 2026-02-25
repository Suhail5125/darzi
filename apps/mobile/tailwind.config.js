const baseConfig = require('../../tailwind.config.base');

module.exports = {
  ...baseConfig,
  content: [
    './App.tsx',
    './src/**/*.{js,jsx,ts,tsx}',
    '../../packages/shared-ui/src/**/*.{js,jsx,ts,tsx}'
  ]
};
