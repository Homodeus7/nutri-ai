# Code Patterns

Detailed code patterns and examples for Nutri AI project.

## Table of Contents

- [FSD Public API Pattern](#fsd-public-api-pattern)
- [Import Rules](#import-rules)
- [Common Mistakes](#common-mistakes)
- [Performance Optimization](#performance-optimization)
- [Provider Composition](#provider-composition)
- [Routing Pattern](#routing-pattern)

## FSD Public API Pattern

### Public API Structure

Each FSD module (feature/entity/widget) exports its public API ONLY through `index.ts`:

```tsx
// ✅ CORRECT: features/auth/sign-in/index.ts
export { useSignIn } from "./model/use-sign-in";
export type { UseSignInOptions } from "./model/use-sign-in";
export { signInSchema } from "./model/sign-in.schema";
export type { SignInFormData } from "./model/sign-in.schema";
export { SignInForm } from "./ui/sign-in-form";
```

### Usage

```tsx
// ✅ CORRECT: Import from public API
import { SignInForm, useSignIn, signInSchema } from "@/features/auth/sign-in";

// ❌ WRONG: Direct import bypassing public API
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
import { useSignIn } from "@/features/auth/sign-in/model/use-sign-in";
```

### Why This Matters

1. **Tree-shaking**: Only exported items are bundled
2. **Encapsulation**: Hides internal implementation details
3. **Refactoring**: Internal changes don't break external code
4. **Bundle size**: Prevents importing unnecessary code

## Import Rules

### 1. Absolute Imports Only

```tsx
// ✅ CORRECT
import { Button } from "@/shared/ui/primitives/button";
import { useAuth } from "@/features/auth";

// ❌ WRONG
import { Button } from "../../shared/ui/primitives/button";
import { useAuth } from "../features/auth";
```

### 2. Never Import from `/pages/`

`/pages/` is ONLY for Next.js routing.

```tsx
// ❌ WRONG: Importing from routing layer
import { BoardPage } from "@/pages/board";

// ✅ CORRECT: Use src/pages/ for business logic
import { BoardPage } from "@/src/pages/board";
```

### 3. FSD Layer Boundaries

Lower layers cannot import from upper layers:

```
app → pages → widgets → features → entities → shared
```

```tsx
// ❌ WRONG: features importing from pages
// features/auth/model/use-auth.ts
import { BoardPage } from "@/pages/board";

// ✅ CORRECT: Use shared layer
import { useAuthRedirect } from "@/shared/lib/auth";
```

### 4. API Imports

```tsx
// ✅ CORRECT: Use generated hooks
import { useGetUserProfile, usePostAuth } from "@/shared/api/generated";

// ❌ WRONG: Direct axios calls
import axios from "axios";
axios.get("/api/user/profile");
```

### 5. UI Imports

```tsx
// ✅ CORRECT: Import from shared/ui
import { Button } from "@/shared/ui/primitives/button";
import { UiButton } from "@/shared/ui/ui-button";

// ❌ WRONG: Direct import from node_modules
import { Button } from "@radix-ui/react-button";
```

### 6. Public API Through index.ts

```tsx
// ✅ CORRECT: Public API
import { useSignIn } from "@/features/auth/sign-in";

// ❌ WRONG: Bypassing public API
import { useSignIn } from "@/features/auth/sign-in/model/use-sign-in";
```

## Common Mistakes

### 1. Direct Imports from Internal Folders

```tsx
// ❌ WRONG
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
import { useSignIn } from "@/features/auth/sign-in/model/use-sign-in";

// ✅ CORRECT
import { SignInForm, useSignIn } from "@/features/auth/sign-in";
```

### 2. Forgot to Regenerate API

```bash
# ❌ WRONG: Edit schema.yml and forget to regenerate
vim src/shared/api/schema.yml
git commit -m "Update API schema"

# ✅ CORRECT: Always regenerate after schema changes
vim src/shared/api/schema.yml
npm run generate:api
git add src/shared/api/
git commit -m "Update API schema"
```

### 3. Violating FSD Layer Boundaries

```tsx
// ❌ WRONG: features importing from pages
// features/auth/model/use-auth.ts
import { BoardPage } from "@/pages/board";

// ✅ CORRECT: Use shared or entities
import { useAuthRedirect } from "@/shared/lib/auth";
```

### 4. Unit Tests for UI Components

```tsx
// ❌ WRONG: Don't write unit tests for UI
describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click</Button>);
    expect(screen.getByText("Click")).toBeInTheDocument();
  });
});

// ✅ CORRECT: Use Storybook for UI documentation
export const Primary: Story = {
  args: { variant: "primary", children: "Click" }
};
```

### 5. Creating Unnecessary Files

```bash
# ❌ WRONG: New utility for a single operation
src/shared/lib/format-email.ts
# Content: export const formatEmail = (v) => v.toLowerCase().trim();

# ✅ CORRECT: Inline or use existing utility
const email = value.toLowerCase().trim();
```

### 6. Using Relative Imports

```tsx
// ❌ WRONG
import { cn } from "../../lib/utils";
import { Button } from "../primitives/button";

// ✅ CORRECT
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/primitives/button";
```

## Performance Optimization

### 1. Tree-Shaking via Public API

```tsx
// ✅ CORRECT: Export only necessary items
// features/analytics/index.ts
export { useTrackEvent } from "./model/use-track-event";
export type { TrackEventOptions } from "./model/use-track-event";

// ❌ WRONG: Exporting everything increases bundle size
export * from "./model";
export * from "./ui";
export * from "./lib";
```

**Result:** Bundle only includes what's imported, not entire module.

### 2. Lazy Loading Heavy Components

```tsx
// ✅ CORRECT: Lazy load heavy components
import dynamic from "next/dynamic";

const ChartWidget = dynamic(() => import("@/widgets/chart-widget"), {
  loading: () => <Spinner />,
  ssr: false, // Optional: disable SSR for client-only components
});

// Usage
export const DashboardPage = () => {
  return (
    <div>
      <ChartWidget data={data} />
    </div>
  );
};
```

### 3. Zustand Selectors

```tsx
// ✅ CORRECT: Use selectors to prevent unnecessary re-renders
const theme = useThemeStore((state) => state.theme);
const setTheme = useThemeStore((state) => state.setTheme);

// ❌ WRONG: Subscribing to entire store causes re-renders on any change
const store = useThemeStore();
console.log(store.theme); // Re-renders when ANY store value changes
```

### 4. Memoization

```tsx
import { useMemo } from "react";

// ✅ CORRECT: Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return data.reduce((acc, item) => acc + item.calories, 0);
}, [data]);

// ❌ WRONG: Recalculates on every render
const expensiveValue = data.reduce((acc, item) => acc + item.calories, 0);
```

## Provider Composition

### App Provider Structure

`src/app/providers/app-provider.tsx` composes providers in specific order:

```tsx
export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <MSWProvider>
      <Toaster />
      <QueryProvider>
        <I18nProvider>
          {children}
        </I18nProvider>
      </QueryProvider>
    </MSWProvider>
  );
}
```

**Order matters:**
1. `MSWProvider` - MSW mocking (dev/test only)
2. `Toaster` - Toast notifications (no context needed)
3. `QueryProvider` - React Query client
4. `I18nProvider` - Internationalization
5. App content

### Private Provider

`src/app/providers/private-provider.tsx` adds auth protection:

```tsx
export function PrivateProvider({ children }: { children: React.ReactNode }) {
  const { data: user, isLoading } = useGetCurrentUser();

  if (isLoading) return <PageSpinner />;
  if (!user) return <Navigate to="/sign-in" />;

  return <>{children}</>;
}
```

## Routing Pattern

### Adding a New Page

**Step 1:** Create page component in `/src/pages/[name]/`

```tsx
// src/pages/settings/index.tsx
export function SettingsPage() {
  return <div>Settings</div>;
}
```

**Step 2:** Create route in `/pages/[name]/index.tsx`

```tsx
// pages/settings/index.tsx - ROUTING ONLY
import { getPrivateLayout } from "@/app/pub/get-private-layout";
import { SettingsPage } from "@/pages/settings";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SettingsPage, getPrivateLayout);
```

### Current Routes

- `/` → redirects to `/board` (see [next.config.ts](../next.config.ts))
- `/sign-in` - Sign-in page (public, uses `getOpenLayout`)
- `/board` - Main board (private, uses `getPrivateLayout`)
- `/403` - Forbidden page (public)

### Layout Selection

```tsx
// Public page (no auth required)
export default setPageLayout(SignInPage, getOpenLayout);

// Private page (auth required)
export default setPageLayout(BoardPage, getPrivateLayout);
```

## UI Components Pattern

### Adding shadcn/ui Primitives

```bash
npx shadcn@latest add [component]
# Installs to src/shared/ui/primitives/[component].tsx
```

**Existing primitives:**
button, input, textarea, label, select, switch, separator, field, input-group, spinner, sonner, form

### Custom UI Components

Custom wrappers are in `src/shared/ui/`:

```tsx
// src/shared/ui/ui-button.tsx
import { Button, ButtonProps } from "./primitives/button";
import { Spinner } from "./primitives/spinner";

export function UiButton({ isLoading, children, ...props }: ButtonProps & { isLoading?: boolean }) {
  return (
    <Button disabled={isLoading} {...props}>
      {isLoading && <Spinner />}
      {children}
    </Button>
  );
}
```

### Styling with cn()

```tsx
import { cn } from "@/shared/lib/utils";

export function Card({ className, ...props }: { className?: string }) {
  return (
    <div
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  );
}
```

### Component Variants with cva

```tsx
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        outline: "border border-input bg-background",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  // ...
}
```

## Form Handling Pattern

### Basic Form with Zod

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type FormData = z.infer<typeof schema>;

export function SignInForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

### Form with API Mutation

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePostAuth } from "@/shared/api/generated";
import { signInSchema, type SignInFormData } from "./model/sign-in.schema";

export function SignInForm() {
  const { mutate, isPending } = usePostAuth();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: SignInFormData) => {
    mutate(data, {
      onSuccess: () => router.push("/board"),
      onError: (error) => toast.error(error.message),
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* form fields */}
    </form>
  );
}
```

## API Integration Pattern

### Queries

```tsx
import { useGetUserProfile } from "@/shared/api/generated";

export function UserProfile() {
  const { data, isLoading, error } = useGetUserProfile();

  if (isLoading) return <Spinner />;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{data.name}</div>;
}
```

### Mutations

```tsx
import { usePostAuth } from "@/shared/api/generated";
import { toast } from "sonner";

export function useSignIn() {
  const router = useRouter();
  const { mutate, isPending } = usePostAuth();

  const signIn = (data: SignInFormData) => {
    mutate(data, {
      onSuccess: () => {
        toast.success("Signed in successfully");
        router.push("/board");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  return { signIn, isPending };
}
```

### API Generation Workflow

1. Edit OpenAPI schema: `src/shared/api/schema.yml`
2. Run codegen: `npm run generate:api`
3. Import generated hooks: `@/shared/api/generated`

**Configuration:** See [orval.config.ts](../orval.config.ts)
