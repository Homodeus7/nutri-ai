import type { Meta, StoryObj } from '@storybook/react';
import { UiPageSpinner } from './ui-page-spinner';

const meta = {
  title: 'shared/ui/UiPageSpinner',
  component: UiPageSpinner,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UiPageSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
