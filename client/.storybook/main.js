const path = require('path');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-knobs'],
  babel: async (options) => ({
    ...options,
    plugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
  }),
  webpackFinal: async (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../src/components'),
      '@pages': path.resolve(__dirname, '../src/pages'),
      '@custom-types': path.resolve(__dirname, '../src/types'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@queries': path.resolve(__dirname, '../src/queries'),
      '@stores': path.resolve(__dirname, '../src/stores'),
      '@containers': path.resolve(__dirname, '../src/containers'),
    };
    // config.resolve.extensions.push('.js', '.jsx');
    return config;
  },
};
