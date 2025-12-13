import type { Meta, StoryObj } from "@storybook/react";
import { UiCardLayout } from "./ui-card-layout";
import { X, Info, AlertCircle, CheckCircle, Settings } from "lucide-react";
import { UiButton } from "./ui-button";

const meta = {
  title: "shared/ui/UiCardLayout",
  component: UiCardLayout,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UiCardLayout>;

export default meta;
type Story = StoryObj;

// ============================================================================
// Basic Examples
// ============================================================================

export const ContentOnly: Story = {
  name: "Content Only",
  render: () => (
    <div className="w-96">
      <UiCardLayout>
        <p className="text-sm">
          This is a simple card with content only. No header or footer.
        </p>
      </UiCardLayout>
    </div>
  ),
};

export const WithHeader: Story = {
  name: "With Header",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Card Title",
          description: "This card has a header with title and description",
        }}
      >
        <p className="text-sm">Card content goes here.</p>
      </UiCardLayout>
    </div>
  ),
};

export const WithFooter: Story = {
  name: "With Footer",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        footer={
          <div className="flex gap-2 w-full">
            <UiButton variant="outline" className="flex-1">
              Cancel
            </UiButton>
            <UiButton className="flex-1">Submit</UiButton>
          </div>
        }
      >
        <p className="text-sm">Card content with action Uibuttons in footer.</p>
      </UiCardLayout>
    </div>
  ),
};

export const Full: Story = {
  name: "Full (Header + Content + Footer)",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Complete Card",
          description:
            "This card has all sections: header, content, and footer",
        }}
        footer={
          <div className="flex gap-2 w-full">
            <UiButton variant="outline" className="flex-1">
              Cancel
            </UiButton>
            <UiButton className="flex-1">Confirm</UiButton>
          </div>
        }
      >
        <div className="space-y-2">
          <p className="text-sm">This is the main content area.</p>
          <p className="text-muted-foreground text-sm">
            You can put any content here: forms, text, images, etc.
          </p>
        </div>
      </UiCardLayout>
    </div>
  ),
};

export const WithHeaderAction: Story = {
  name: "With Header Action",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Dismissible Card",
          description: "This card has a close Uibutton in the header",
          action: (
            <UiButton variant="ghost" size="icon">
              <X className="size-4" />
            </UiButton>
          ),
        }}
      >
        <p className="text-sm">Click the X Uibutton to close this card.</p>
      </UiCardLayout>
    </div>
  ),
};

// ============================================================================
// Modal Examples
// ============================================================================

export const ConfirmModal: Story = {
  name: "Modal - Confirm Action",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Delete Account",
          description: "This action cannot be undone",
          action: (
            <UiButton variant="ghost" size="icon">
              <X className="size-4" />
            </UiButton>
          ),
        }}
        footer={
          <div className="flex gap-2 w-full">
            <UiButton variant="outline" className="flex-1">
              Cancel
            </UiButton>
            <UiButton variant="destructive" className="flex-1">
              Delete
            </UiButton>
          </div>
        }
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-destructive/10 rounded-lg">
            <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <p className="text-sm text-destructive">
              All your data will be permanently removed from our servers. This
              action is irreversible.
            </p>
          </div>
        </div>
      </UiCardLayout>
    </div>
  ),
};

export const InfoModal: Story = {
  name: "Modal - Information",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Information",
          action: (
            <UiButton variant="ghost" size="icon">
              <X className="size-4" />
            </UiButton>
          ),
        }}
        footer={<UiButton className="w-full">Got it</UiButton>}
      >
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-blue-500/10 rounded-lg">
            <Info className="size-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-sm">
              Your account has been successfully verified. You can now access
              all premium features.
            </p>
          </div>
        </div>
      </UiCardLayout>
    </div>
  ),
};

export const SuccessModal: Story = {
  name: "Modal - Success",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Success!",
          description: "Your changes have been saved",
          action: (
            <UiButton variant="ghost" size="icon">
              <X className="size-4" />
            </UiButton>
          ),
        }}
        footer={<UiButton className="w-full">Continue</UiButton>}
      >
        <div className="space-y-3">
          <div className="flex items-center justify-center py-4">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-500/10">
              <CheckCircle className="size-8 text-green-500" />
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            All changes have been successfully saved to your profile.
          </p>
        </div>
      </UiCardLayout>
    </div>
  ),
};

// ============================================================================
// Form Examples
// ============================================================================

export const SignInForm: Story = {
  name: "Form - Sign In",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Welcome back",
          description: "Sign in to your account to continue",
        }}
        footer={
          <div className="flex flex-col gap-3 w-full">
            <UiButton className="w-full">Sign in</UiButton>
            <UiButton variant="outline" className="w-full">
              Create account
            </UiButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter password"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="text-right">
            <UiButton variant="link" className="h-auto p-0 text-xs">
              Forgot password?
            </UiButton>
          </div>
        </div>
      </UiCardLayout>
    </div>
  ),
};

export const SettingsForm: Story = {
  name: "Form - Settings",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Notification Settings",
          description: "Manage how you receive notifications",
          action: <Settings className="size-4 text-muted-foreground" />,
        }}
        footer={
          <div className="flex gap-2 w-full">
            <UiButton variant="outline" className="flex-1">
              Reset
            </UiButton>
            <UiButton className="flex-1">Save changes</UiButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Email notifications</label>
              <p className="text-xs text-muted-foreground">
                Receive notifications via email
              </p>
            </div>
            <input type="checkbox" className="size-4" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">Push notifications</label>
              <p className="text-xs text-muted-foreground">
                Receive push notifications
              </p>
            </div>
            <input type="checkbox" className="size-4" />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <label className="text-sm font-medium">SMS notifications</label>
              <p className="text-xs text-muted-foreground">
                Receive notifications via SMS
              </p>
            </div>
            <input type="checkbox" className="size-4" />
          </div>
        </div>
      </UiCardLayout>
    </div>
  ),
};

export const FeedbackForm: Story = {
  name: "Form - Feedback",
  render: () => (
    <div className="w-96">
      <UiCardLayout
        header={{
          title: "Send Feedback",
          description: "We'd love to hear your thoughts",
          action: (
            <UiButton variant="ghost" size="icon">
              <X className="size-4" />
            </UiButton>
          ),
        }}
        footer={
          <div className="flex gap-2 w-full">
            <UiButton variant="outline" className="flex-1">
              Cancel
            </UiButton>
            <UiButton className="flex-1">Send feedback</UiButton>
          </div>
        }
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              Subject
            </label>
            <input
              id="subject"
              type="text"
              placeholder="Brief summary"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Tell us more..."
              rows={4}
              className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>
        </div>
      </UiCardLayout>
    </div>
  ),
};

// ============================================================================
// All Variants Showcase
// ============================================================================

export const AllVariants: Story = {
  name: "All Variants Showcase",
  render: () => (
    <div className="grid gap-6 p-6 max-w-4xl">
      <div className="grid grid-cols-2 gap-6">
        <UiCardLayout>
          <p className="text-sm">Content only</p>
        </UiCardLayout>

        <UiCardLayout
          header={{
            title: "With header",
          }}
        >
          <p className="text-sm">Header + content</p>
        </UiCardLayout>

        <UiCardLayout footer={<UiButton className="w-full">Action</UiButton>}>
          <p className="text-sm">Content + footer</p>
        </UiCardLayout>

        <UiCardLayout
          header={{
            title: "Complete",
            description: "All sections",
          }}
          footer={<UiButton className="w-full">Submit</UiButton>}
        >
          <p className="text-sm">Full layout</p>
        </UiCardLayout>
      </div>

      <div className="border-t pt-6">
        <h3 className="text-lg font-semibold mb-4">Use Cases</h3>
        <div className="grid grid-cols-3 gap-4">
          <UiCardLayout
            className="w-full"
            header={{
              title: "Modal",
              action: <X className="size-4" />,
            }}
            footer={
              <div className="flex gap-2 w-full">
                <UiButton variant="outline" size="sm" className="flex-1">
                  Cancel
                </UiButton>
                <UiButton size="sm" className="flex-1">
                  OK
                </UiButton>
              </div>
            }
          >
            <p className="text-xs">Modal dialog content</p>
          </UiCardLayout>

          <UiCardLayout
            className="w-full"
            header={{
              title: "Form",
              description: "Input form",
            }}
            footer={
              <UiButton size="sm" className="w-full">
                Save
              </UiButton>
            }
          >
            <input
              type="text"
              placeholder="Enter value"
              className="flex h-8 w-full rounded-md border px-2 text-xs"
            />
          </UiCardLayout>

          <UiCardLayout
            className="w-full"
            header={{
              title: "Info",
            }}
          >
            <div className="flex items-start gap-2">
              <Info className="size-4 shrink-0 mt-0.5" />
              <p className="text-xs">Information card</p>
            </div>
          </UiCardLayout>
        </div>
      </div>
    </div>
  ),
};
