import type { Meta, StoryObj } from "@storybook/react";
import {
  UiInputField,
  UiPasswordInput,
  UiTextareaField,
  UiInputWithIcon,
  UiInputWithPrefix,
} from "./inputs";
import { Button } from "@/shared/ui/primitives/button";
import { Mail, Search, User } from "lucide-react";

const meta = {
  title: "shared/ui/UiInput",
  component: UiInputField,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof UiInputField>;

export default meta;
type Story = StoryObj;

// ============================================================================
// UiInputField Stories
// ============================================================================

export const InputFieldBasic: Story = {
  name: "UiInputField - Basic",
  render: () => (
    <div className="max-w-md">
      <UiInputField
        id="email-basic"
        label="Email"
        type="email"
        placeholder="email@example.com"
      />
    </div>
  ),
};

export const InputFieldWithDescription: Story = {
  name: "UiInputField - With Description",
  render: () => (
    <div className="max-w-md">
      <UiInputField
        id="email-desc"
        label="Email"
        type="email"
        placeholder="email@example.com"
        description="We'll never share your email with anyone else"
      />
    </div>
  ),
};

export const InputFieldWithError: Story = {
  name: "UiInputField - With Error",
  render: () => (
    <div className="max-w-md">
      <UiInputField
        id="email-error"
        label="Email"
        type="email"
        placeholder="email@example.com"
        defaultValue="invalid-email"
        error="Please enter a valid email address"
      />
    </div>
  ),
};

export const InputFieldWithMultipleErrors: Story = {
  name: "UiInputField - Multiple Errors",
  render: () => (
    <div className="max-w-md">
      <UiInputField
        id="password-errors"
        label="Password"
        type="password"
        defaultValue="123"
        error={[
          { message: "Password must be at least 8 characters" },
          { message: "Password must contain at least one uppercase letter" },
          { message: "Password must contain at least one number" },
        ]}
      />
    </div>
  ),
};

export const InputFieldDisabled: Story = {
  name: "UiInputField - Disabled",
  render: () => (
    <div className="max-w-md">
      <UiInputField
        id="email-disabled"
        label="Email"
        type="email"
        placeholder="email@example.com"
        disabled
        description="This field is currently disabled"
      />
    </div>
  ),
};

export const InputFieldTypes: Story = {
  name: "UiInputField - Different Types",
  render: () => (
    <div className="max-w-md space-y-6">
      <UiInputField
        id="text"
        label="Text"
        type="text"
        placeholder="Enter text"
      />
      <UiInputField
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
      />
      <UiInputField
        id="number"
        label="Number"
        type="number"
        placeholder="Enter number"
      />
      <UiInputField
        id="tel"
        label="Phone"
        type="tel"
        placeholder="+1 (555) 000-0000"
      />
      <UiInputField
        id="url"
        label="URL"
        type="url"
        placeholder="https://example.com"
      />
      <UiInputField id="date" label="Date" type="date" />
    </div>
  ),
};

// ============================================================================
// UiPasswordInput Stories
// ============================================================================

export const PasswordInputBasic: Story = {
  name: "UiPasswordInput - Basic",
  render: () => (
    <div className="max-w-md">
      <UiPasswordInput
        id="password-basic"
        label="Password"
        placeholder="Enter your password"
      />
    </div>
  ),
};

export const PasswordInputWithDescription: Story = {
  name: "UiPasswordInput - With Description",
  render: () => (
    <div className="max-w-md">
      <UiPasswordInput
        id="password-desc"
        label="Password"
        placeholder="Enter your password"
        description="Must be at least 8 characters with uppercase, lowercase, and numbers"
      />
    </div>
  ),
};

export const PasswordInputWithError: Story = {
  name: "UiPasswordInput - With Error",
  render: () => (
    <div className="max-w-md">
      <UiPasswordInput
        id="password-error"
        label="Password"
        placeholder="Enter your password"
        defaultValue="weak"
        error="Password is too weak"
      />
    </div>
  ),
};

export const PasswordInputShowByDefault: Story = {
  name: "UiPasswordInput - Show by Default",
  render: () => (
    <div className="max-w-md">
      <UiPasswordInput
        id="password-show"
        label="Password"
        placeholder="Enter your password"
        defaultValue="MyPassword123"
        defaultShowPassword={true}
        description="Password is visible by default"
      />
    </div>
  ),
};

// ============================================================================
// UiTextareaField Stories
// ============================================================================

export const TextareaFieldBasic: Story = {
  name: "UiTextareaField - Basic",
  render: () => (
    <div className="max-w-md">
      <UiTextareaField
        id="bio-basic"
        label="Bio"
        placeholder="Tell us about yourself..."
      />
    </div>
  ),
};

export const TextareaFieldWithDescription: Story = {
  name: "UiTextareaField - With Description",
  render: () => (
    <div className="max-w-md">
      <UiTextareaField
        id="bio-desc"
        label="Bio"
        placeholder="Tell us about yourself..."
        description="Maximum 500 characters. This will be displayed on your public profile."
      />
    </div>
  ),
};

export const TextareaFieldWithError: Story = {
  name: "UiTextareaField - With Error",
  render: () => (
    <div className="max-w-md">
      <UiTextareaField
        id="bio-error"
        label="Bio"
        placeholder="Tell us about yourself..."
        defaultValue="Hi"
        error="Bio must be at least 10 characters long"
      />
    </div>
  ),
};

export const TextareaFieldRows: Story = {
  name: "UiTextareaField - Custom Rows",
  render: () => (
    <div className="max-w-md">
      <UiTextareaField
        id="bio-rows"
        label="Detailed Description"
        placeholder="Enter detailed description..."
        rows={8}
        description="Feel free to write as much as you'd like"
      />
    </div>
  ),
};

// ============================================================================
// UiInputWithIcon Stories
// ============================================================================

export const InputWithIconStart: Story = {
  name: "UiInputWithIcon - Icon Start",
  render: () => (
    <div className="max-w-md">
      <UiInputWithIcon
        id="email-icon"
        label="Email"
        type="email"
        placeholder="email@example.com"
        icon={<Mail className="size-4" />}
        iconPosition="start"
      />
    </div>
  ),
};

export const InputWithIconEnd: Story = {
  name: "UiInputWithIcon - Icon End",
  render: () => (
    <div className="max-w-md">
      <UiInputWithIcon
        id="search-icon"
        label="Search"
        type="search"
        placeholder="Search..."
        icon={<Search className="size-4" />}
        iconPosition="end"
      />
    </div>
  ),
};

export const InputWithIconError: Story = {
  name: "UiInputWithIcon - With Error",
  render: () => (
    <div className="max-w-md">
      <UiInputWithIcon
        id="email-icon-error"
        label="Email"
        type="email"
        placeholder="email@example.com"
        icon={<Mail className="size-4" />}
        defaultValue="invalid"
        error="Please enter a valid email address"
      />
    </div>
  ),
};

export const InputWithIconMultiple: Story = {
  name: "UiInputWithIcon - Multiple Examples",
  render: () => (
    <div className="max-w-md space-y-6">
      <UiInputWithIcon
        id="user"
        label="Username"
        placeholder="Enter username"
        icon={<User className="size-4" />}
        description="Choose a unique username"
      />
      <UiInputWithIcon
        id="email"
        label="Email"
        type="email"
        placeholder="email@example.com"
        icon={<Mail className="size-4" />}
        description="We'll send updates to this email"
      />
      <UiInputWithIcon
        id="search"
        label="Search"
        type="search"
        placeholder="Search..."
        icon={<Search className="size-4" />}
        iconPosition="end"
      />
    </div>
  ),
};

// ============================================================================
// UiInputWithPrefix Stories
// ============================================================================

export const InputWithPrefixOnly: Story = {
  name: "UiInputWithPrefix - Prefix Only",
  render: () => (
    <div className="max-w-md">
      <UiInputWithPrefix
        id="website-prefix"
        label="Website"
        placeholder="example.com"
        prefix="https://"
        description="Enter your website URL"
      />
    </div>
  ),
};

export const InputWithSuffixOnly: Story = {
  name: "UiInputWithPrefix - Suffix Only",
  render: () => (
    <div className="max-w-md">
      <UiInputWithPrefix
        id="username-suffix"
        label="Username"
        placeholder="username"
        suffix="@example.com"
        description="Your email will be username@example.com"
      />
    </div>
  ),
};

export const InputWithBothPrefixAndSuffix: Story = {
  name: "UiInputWithPrefix - Both Prefix and Suffix",
  render: () => (
    <div className="max-w-md space-y-6">
      <UiInputWithPrefix
        id="website"
        label="Website"
        placeholder="example"
        prefix="https://"
        suffix=".com"
        description="Your full URL will be https://example.com"
      />
      <UiInputWithPrefix
        id="price"
        label="Price"
        type="number"
        placeholder="0.00"
        prefix="$"
        suffix="USD"
        description="Enter the price in US dollars"
      />
    </div>
  ),
};

export const InputWithPrefixError: Story = {
  name: "UiInputWithPrefix - With Error",
  render: () => (
    <div className="max-w-md">
      <UiInputWithPrefix
        id="website-error"
        label="Website"
        placeholder="example.com"
        prefix="https://"
        defaultValue="invalid url"
        error="Please enter a valid domain name"
      />
    </div>
  ),
};

// ============================================================================
// Complete Form Examples
// ============================================================================

export const LoginForm: Story = {
  name: "Complete Login Form",
  render: () => (
    <div className="max-w-md space-y-6 p-6 border rounded-lg">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Sign in</h2>
        <p className="text-muted-foreground text-sm">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <UiInputWithIcon
          id="login-email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon={<Mail className="size-4" />}
        />

        <UiPasswordInput
          id="login-password"
          label="Password"
          placeholder="Enter your password"
        />
      </div>

      <Button className="w-full">Sign in</Button>
    </div>
  ),
};

export const RegistrationForm: Story = {
  name: "Complete Registration Form",
  render: () => (
    <div className="max-w-md space-y-6 p-6 border rounded-lg">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Enter your information to get started
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <UiInputField
            id="first-name"
            label="First name"
            placeholder="John"
          />
          <UiInputField id="last-name" label="Last name" placeholder="Doe" />
        </div>

        <UiInputWithIcon
          id="reg-email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon={<Mail className="size-4" />}
          description="We'll send a verification link to this email"
        />

        <UiPasswordInput
          id="reg-password"
          label="Password"
          placeholder="Minimum 8 characters"
          description="Must contain uppercase, lowercase, and numbers"
        />

        <UiInputField
          id="phone"
          label="Phone number (optional)"
          type="tel"
          placeholder="+1 (555) 000-0000"
        />
      </div>

      <Button className="w-full">Create account</Button>
    </div>
  ),
};

export const ProfileForm: Story = {
  name: "Complete Profile Form",
  render: () => (
    <div className="max-w-md space-y-6 p-6 border rounded-lg">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Edit Profile</h2>
        <p className="text-muted-foreground text-sm">
          Update your profile information
        </p>
      </div>

      <div className="space-y-4">
        <UiInputWithIcon
          id="profile-username"
          label="Username"
          placeholder="johndoe"
          icon={<User className="size-4" />}
          description="This is your public display name"
        />

        <UiInputWithIcon
          id="profile-email"
          label="Email"
          type="email"
          placeholder="email@example.com"
          icon={<Mail className="size-4" />}
        />

        <UiInputWithPrefix
          id="profile-website"
          label="Website"
          placeholder="example.com"
          prefix="https://"
          description="Your personal or professional website"
        />

        <UiTextareaField
          id="profile-bio"
          label="Bio"
          placeholder="Tell us about yourself..."
          description="Brief description for your profile. Max 160 characters."
          rows={4}
        />
      </div>

      <div className="flex gap-2">
        <Button variant="outline" className="flex-1">
          Cancel
        </Button>
        <Button className="flex-1">Save changes</Button>
      </div>
    </div>
  ),
};

export const FormWithValidation: Story = {
  name: "Form with Validation",
  render: () => (
    <div className="max-w-md space-y-6">
      <UiInputWithIcon
        id="valid-email"
        label="Email (Valid)"
        type="email"
        defaultValue="user@example.com"
        icon={<Mail className="size-4" />}
        description="Email format is correct"
      />

      <UiInputWithIcon
        id="invalid-email"
        label="Email (Invalid)"
        type="email"
        defaultValue="invalid"
        icon={<Mail className="size-4" />}
        error="Please enter a valid email address"
      />

      <UiPasswordInput
        id="weak-password"
        label="Password (Weak)"
        defaultValue="123"
        error={[
          { message: "Password must be at least 8 characters" },
          { message: "Password must contain uppercase letters" },
          { message: "Password must contain numbers" },
        ]}
      />

      <UiTextareaField
        id="short-bio"
        label="Bio (Too Short)"
        defaultValue="Hi"
        error="Bio must be at least 10 characters long"
      />
    </div>
  ),
};

export const AllComponentsShowcase: Story = {
  name: "All Components Showcase",
  render: () => (
    <div className="max-w-2xl space-y-8">
      <section className="space-y-4">
        <h3 className="text-lg font-semibold">UiInputField</h3>
        <UiInputField
          id="showcase-input"
          label="Email Address"
          type="email"
          placeholder="email@example.com"
          description="Standard input field with label and description"
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">UiPasswordInput</h3>
        <UiPasswordInput
          id="showcase-password"
          label="Password"
          placeholder="Enter password"
          description="Password field with show/hide toggle"
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">UiTextareaField</h3>
        <UiTextareaField
          id="showcase-textarea"
          label="Comments"
          placeholder="Enter your comments..."
          description="Multi-line text input"
        />
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">UiInputWithIcon</h3>
        <div className="grid grid-cols-2 gap-4">
          <UiInputWithIcon
            id="showcase-icon-start"
            label="Search"
            placeholder="Search..."
            icon={<Search className="size-4" />}
          />
          <UiInputWithIcon
            id="showcase-icon-end"
            label="Email"
            type="email"
            placeholder="email@example.com"
            icon={<Mail className="size-4" />}
            iconPosition="end"
          />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-lg font-semibold">UiInputWithPrefix</h3>
        <div className="grid grid-cols-2 gap-4">
          <UiInputWithPrefix
            id="showcase-prefix"
            label="Website"
            placeholder="example.com"
            prefix="https://"
          />
          <UiInputWithPrefix
            id="showcase-suffix"
            label="Price"
            type="number"
            placeholder="0.00"
            prefix="$"
            suffix="USD"
          />
        </div>
      </section>
    </div>
  ),
};
