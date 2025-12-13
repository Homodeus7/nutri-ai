import type { Meta, StoryObj } from "@storybook/react";
import { UiSpinner } from "./ui-spinner";

const meta = {
  title: "shared/ui/UiSpinner",
  component: UiSpinner,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UiSpinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "w-8 h-8 text-primary",
  },
};

export const Small: Story = {
  args: {
    className: "w-4 h-4 text-primary",
  },
};

export const Large: Story = {
  args: {
    className: "w-16 h-16 text-primary",
  },
};

export const AllSizes: Story = {
  args: { className: "" },
  render: () => (
    <div className="flex gap-8 items-center">
      <UiSpinner className="w-4 h-4 text-primary" />
      <UiSpinner className="w-8 h-8 text-primary" />
      <UiSpinner className="w-12 h-12 text-primary" />
      <UiSpinner className="w-16 h-16 text-primary" />
    </div>
  ),
};
