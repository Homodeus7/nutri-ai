import type { Meta, StoryObj } from "@storybook/react";
import { UiButton } from "./ui-button";
import { CircleFadingArrowUpIcon } from "lucide-react";

const meta = {
  title: "shared/ui/Ui-Button",
  component: UiButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UiButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Loading: Story = {
  args: {
    loading: true,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: "Delete",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: "Outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
    children: "Ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
    children: "Link",
  },
};

export const Icon: Story = {
  args: {
    variant: "outline",
    size: "icon",
    children: <CircleFadingArrowUpIcon />,
  },
};

export const AllVariants: Story = {
  args: { children: "" },
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex gap-2">
        <UiButton variant="default">Default</UiButton>
        <UiButton loading={true}>Loading</UiButton>
        <UiButton variant="destructive">Destructive</UiButton>
        <UiButton variant="outline">Outline</UiButton>
        <UiButton variant="secondary">Secondary</UiButton>
        <UiButton variant="ghost">Ghost</UiButton>
        <UiButton variant="link">Link</UiButton>
        <UiButton variant="outline" size="icon">
          <CircleFadingArrowUpIcon />
        </UiButton>
      </div>
      <div className="flex gap-2 items-center">
        <UiButton size="sm">Small</UiButton>
        <UiButton size="default">Default</UiButton>
        <UiButton size="lg">Large</UiButton>
      </div>
    </div>
  ),
};
