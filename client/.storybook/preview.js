import { withKnobs } from '@storybook/addon-knobs';
import { Provider } from 'react-redux';
import store from '../src/stores';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [
  withKnobs,
  (Story) => (
    <Provider store={store}>
      <Story />
    </Provider>
  ),
];
