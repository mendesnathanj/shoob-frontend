import { ComponentStory, ComponentMeta } from '@storybook/react';
import Box from './Box';

export default {
  padded: 0,
  parameters: {
    docs: {
      description: {
        component: 'A utility UI component',
      },
    },
  },
  argTypes: {
    padded: {
      description: 'overwritten description',
      options: [0, 1, 2, 3],
      control: {
        type: 'select',
      }
    },
  },
} as ComponentMeta<typeof Box>;

const Template: ComponentStory<typeof Box> = (args) => <Box {...args} style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}>Box</Box>;

export const Default = Template.bind({});
export const Padded = Template.bind({});

Default.args = {
  padded: 0,
};

Padded.parameters = {
  docs: {
    description: {
      story: 'A box with padding',
    },
  },
};

Padded.args = {
  padded: 3,
};
