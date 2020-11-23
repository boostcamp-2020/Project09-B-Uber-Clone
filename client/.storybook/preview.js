import { withKnobs } from '@storybook/addon-knobs';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
};

export const decorators = [withKnobs];
