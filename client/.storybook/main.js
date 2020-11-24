module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-knobs'],
  babel: async (options) => ({
    ...options,
    plugins: [['import', { libraryName: 'antd-mobile', style: 'css' }]],
  }),
};
