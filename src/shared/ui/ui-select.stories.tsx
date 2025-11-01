import type { Meta, StoryObj } from '@storybook/react';
import { UiSelect } from './ui-select';
import { useState } from 'react';

type Option = { id: number; name: string };

const meta = {
  title: 'shared/ui/UiSelect',
  component: UiSelect<Option>,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UiSelect<Option>>;

export default meta;
type Story = StoryObj<typeof meta>;

const options: Option[] = [
  { id: 1, name: 'Option 1' },
  { id: 2, name: 'Option 2' },
  { id: 3, name: 'Option 3' },
];

export const Default: Story = {
  args: {
    onChange: () => {},
    getLabel: () => '',
  },
  render: () => {
    const [value, setValue] = useState<Option | undefined>(options[0]);
    return (
      <UiSelect
        options={options}
        value={value}
        onChange={setValue}
        getLabel={(opt) => opt?.name ?? ''}
        placeholder="Select option..."
      />
    );
  },
};

export const WithLabel: Story = {
  args: {
    onChange: () => {},
    getLabel: () => '',
  },
  render: () => {
    const [value, setValue] = useState<Option | undefined>();
    return (
      <UiSelect
        options={options}
        value={value}
        onChange={setValue}
        getLabel={(opt) => opt?.name ?? ''}
        label="Choose an option"
        placeholder="Select..."
      />
    );
  },
};

export const WithError: Story = {
  args: {
    onChange: () => {},
    getLabel: () => '',
  },
  render: () => {
    const [value, setValue] = useState<Option | undefined>();
    return (
      <UiSelect
        options={options}
        value={value}
        onChange={setValue}
        getLabel={(opt) => opt?.name ?? ''}
        label="Required field"
        error="This field is required"
        placeholder="Select..."
      />
    );
  },
};

export const SmallSize: Story = {
  args: {
    onChange: () => {},
    getLabel: () => '',
  },
  render: () => {
    const [value, setValue] = useState<Option | undefined>(options[1]);
    return (
      <UiSelect
        options={options}
        value={value}
        onChange={setValue}
        getLabel={(opt) => opt?.name ?? ''}
        size="sm"
        placeholder="Select..."
      />
    );
  },
};
