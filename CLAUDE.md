# CLAUDE.md

Instructions for Claude Code when working with Nutri AI project.

## Project Overview

Nutri AI - calorie tracking web application with AI-powered meal parsing.

**Stack:** Next.js 15 (Pages Router), React 19, TypeScript, Feature-Sliced Design

## Tech Stack

### Core
- Next.js 15.5.6 (Pages Router + Turbopack)
- React 19.1.0
- TypeScript 5

### Data Management
- **Server state**: React Query 5.90.5 (auto-generated from OpenAPI)
- **Client state**: Zustand 5.0.8
- **Forms**: React Hook Form 7.68.0 + Zod 3.25.76
- **HTTP**: Axios 1.12.2

### UI
- **Components**: Radix UI (via shadcn/ui)
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React 0.546
- **Theming**: next-themes 0.4.6
- **Toasts**: Sonner 2.0.7

### Dev Tools
- **Testing**: Vitest (unit), Playwright (e2e), Storybook (UI)
- **API Codegen**: Orval 7.14.0
- **Mocking**: MSW 2.11.6

## Project Structure (FSD)

```
/pages/                    # Next.js routing ONLY (thin wrappers)
/src/
  /app/                    # Application infrastructure
    /pub/                  # Public app setup (App, globals.css)
    /layouts/              # Layout components (app, open, private)
    /providers/            # Provider components (app-provider, private-provider)
    /loaders/              # Data loaders
    /interceptors/         # API interceptors
  /pages/                  # Page components with business logic
  /features/               # Feature modules (auth, i18n, theme)
  /entities/               # Domain entities
  /widgets/                # Composite widgets
  /shared/                 # Shared infrastructure
    /api/                  # API client (generated from OpenAPI)
    /ui/                   # UI components
      /primitives/         # shadcn/ui primitives
      /inputs/             # Form-integrated inputs
    /lib/                  # Utils, hooks
    /constants/            # Constants
```

### Routing vs Business Logic Separation

**CRITICAL:** `/pages/` is ONLY for Next.js routing, `/src/pages/` contains ALL business logic.

```tsx
// pages/sign-in/index.tsx - ROUTING ONLY
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);
```

**Available layouts:**
- `getOpenLayout` - public pages (sign-in, landing)
- `getPrivateLayout` - protected pages (require authentication)

### Provider Composition

`src/app/providers/app-provider.tsx`:
```
MSWProvider → Toaster → QueryProvider → I18nProvider → children
```

## Key Patterns

### 1. FSD Public API (CRITICAL!)

**Each module exports its public API ONLY through `index.ts`**

```tsx
// ✅ CORRECT: features/auth/sign-in/index.ts
export { useSignIn } from "./model/use-sign-in";
export type { UseSignInOptions } from "./model/use-sign-in";
export { signInSchema } from "./model/sign-in.schema";
export type { SignInFormData } from "./model/sign-in.schema";
export { SignInForm } from "./ui/sign-in-form";

// ✅ CORRECT: Usage
import { SignInForm, useSignIn } from "@/features/auth/sign-in";

// ❌ WRONG: Direct import bypassing public API
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
```

**Why this matters:**
- Tree-shaking: only exported items will be bundled
- Encapsulation: hides internal implementation
- Refactoring: internal changes don't break external code

### 2. Import Rules

1. **Always use absolute imports** via `@/*` alias
2. **Never import from `/pages/`** - only for routing
3. **FSD layer boundaries**: lower layers don't import upper layers
4. **API**: import from `@/shared/api` (generated hooks)
5. **UI**: import from `@/shared/ui` or `@/shared/ui/primitives`
6. **Public API**: ALWAYS through `index.ts`, never directly from `model/`, `ui/`, `lib/`

### 3. Form Handling

**React Hook Form + Zod:**

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { email: "", password: "" },
});
```

### 4. API Integration

**ALWAYS use generated React Query hooks:**

```tsx
// Queries
import { useGetUserProfile } from "@/shared/api/generated";
const { data, isLoading, error } = useGetUserProfile();

// Mutations
import { usePostAuth } from "@/shared/api/generated";
const { mutate, isPending } = usePostAuth();
mutate({ email, password });
```

**API Generation Workflow:**
1. Edit `src/shared/api/schema.yml` (OpenAPI 3.0.3)
2. Run `npm run generate:api` (Orval)
3. Use hooks from `src/shared/api/generated/`

**Configuration (orval.config.ts):**
- Input: `src/shared/api/schema.yml`
- Output: `src/shared/api/generated/`
- Mutator: `src/shared/api/api-instance.ts` (Axios with credentials)
- Base URL: `/api` → rewrites to `BASE_API_URL` in next.config.ts

### 5. UI Components

**Adding shadcn/ui primitives:**
```bash
npx shadcn@latest add [component]  # Installs to src/shared/ui/primitives/
```

**Existing primitives:**
button, input, textarea, label, select, switch, separator, field, input-group, spinner, sonner, form

**Custom components:**
ui-button, ui-select, ui-spinner, ui-page-spinner, ui-text, ui-input

**Styling:**
- `cn()` from `src/shared/lib/utils.ts` for class merging (clsx + tailwind-merge)
- `cva` for component variants
- CSS variables for theming

### 6. Testing Strategy

**Focused approach - test ONLY business-critical code:**

**What to test:**
- ✅ Zod schemas (validation logic) - Vitest
- ✅ Zustand stores (complex state) - Vitest
- ✅ Hooks with business logic - Vitest
- ✅ Critical flows (auth, navigation) - Playwright
- ✅ Accessibility (WCAG, axe-core) - Playwright
- ✅ UI components (documentation) - Storybook

**What NOT to test:**
- ❌ UI components with unit tests (use Storybook only)
- ❌ Library wrappers (cn, simple utils)
- ❌ Generated API code
- ❌ Simple helpers without logic

**Test structure:**
```
e2e/auth/*.spec.ts          # E2E auth tests
src/features/auth/sign-in/
  model/
    sign-in.schema.ts
    sign-in.schema.test.ts  # Zod schema tests
```

Details: [docs/TESTING.md](./docs/TESTING.md)

### 7. Routing

**Current routes:**
- `/` → redirects to `/board`
- `/sign-in` - sign-in page (public)
- `/board` - main page (private)
- `/403` - forbidden page

**Adding a new page:**
1. Create component in `/src/pages/[name]/`
2. Create route in `/pages/[name]/index.tsx`:
   ```tsx
   import { getPrivateLayout } from "@/app/pub/get-private-layout";
   import { MyPage } from "@/pages/my-page";
   import { setPageLayout } from "@/shared/lib/next";

   export default setPageLayout(MyPage, getPrivateLayout);
   ```

### 8. Performance Optimization

**Tree-shaking via Public API:**
```tsx
// ✅ Export only necessary items
export { useTrackEvent } from "./model/use-track-event";
export type { TrackEventOptions } from "./model/use-track-event";

// ❌ Exporting everything increases bundle size
export * from "./model";
export * from "./ui";
```

**Lazy loading heavy components:**
```tsx
import dynamic from "next/dynamic";

const ChartWidget = dynamic(() => import("@/widgets/chart-widget"), {
  loading: () => <Spinner />,
});
```

**Zustand selectors:**
```tsx
// ✅ Selector - prevents unnecessary re-renders
const theme = useThemeStore((state) => state.theme);

// ❌ Subscribing to entire store
const store = useThemeStore();
```

## Common Mistakes

### ❌ Direct imports from internal folders
```tsx
// ❌ WRONG
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";

// ✅ CORRECT
import { SignInForm } from "@/features/auth/sign-in";
```

### ❌ Forgot to regenerate API
```bash
# ❌ Edit schema.yml and forget to regenerate
vim src/shared/api/schema.yml

# ✅ Always regenerate
vim src/shared/api/schema.yml
npm run generate:api
```

### ❌ Violating FSD layer boundaries
```tsx
// ❌ features importing from pages
import { BoardPage } from "@/pages/board";

// ✅ Use shared or entities
import { useAuthRedirect } from "@/shared/lib/auth";
```

### ❌ Unit tests for UI
```tsx
// ❌ Don't write unit tests for UI
describe("Button", () => {
  it("renders correctly", () => { ... });
});

// ✅ Use Storybook
export const Primary: Story = { args: { variant: "primary" } };
```

### ❌ Creating unnecessary files
```bash
# ❌ New utility for a single operation
src/shared/lib/format-email.ts

# ✅ Inline or use existing utility
const email = value.toLowerCase().trim();
```

## Development Commands

### Development
```bash
npm run dev              # Dev server (Turbopack)
npm run build            # Production build
npm start                # Production server
npm run storybook        # Storybook on :6006
npm run build-storybook  # Build Storybook
```

### API Generation
```bash
npm run generate:api     # Generate React Query hooks from OpenAPI
```

**IMPORTANT:** After changing `src/shared/api/schema.yml`, ALWAYS run `npm run generate:api`

### Testing
```bash
# Unit tests (Vitest)
npm test                   # Watch mode
npm run test:run           # Single run
npm run test:coverage      # With coverage
npm run test:ui            # Vitest UI

# E2E tests (Playwright)
npm run test:e2e           # Headless
npm run test:e2e:ui        # UI mode (debugging)
npm run test:e2e:headed    # Headed mode
npm run test:e2e:debug     # Debug mode
npm run test:e2e:chromium  # Chromium only
npm run test:e2e:report    # Show report
```

## Memory Bank Guidelines

**CRITICAL:** Actively use MCP memory-bank to save context.

### Project Name
Project name in memory-bank: `nutri-ai` (matches directory name)

### When to Save
- After codebase exploration (patterns, structure)
- Architectural decisions and technical details
- Progress on complex multi-step tasks
- Found issues and solutions
- Component dependencies
- Before ending long sessions
- Context for future sessions

### File Structure
Memory-bank files should be:
- Compact (don't bloat)
- Focused (to the point)
- Separated (new file for new topic)

## Additional Documentation

- [docs/INDEX.md](./docs/INDEX.md) - Documentation index
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Detailed architecture
- [docs/SPECIFICATIONS.md](./docs/SPECIFICATIONS.md) - Requirements and API spec
- [docs/API.md](./docs/API.md) - API layer
- [docs/TESTING.md](./docs/TESTING.md) - Complete testing guide
- [docs/GIT_FLOW.md](./docs/GIT_FLOW.md) - Git workflow

## Configuration Files

- `tsconfig.json` - TypeScript (`@/*` alias → `./src/*`)
- `next.config.ts` - Next.js (redirects, API rewrites)
- `orval.config.ts` - OpenAPI generation
- `components.json` - shadcn/ui
- `tailwind.config.ts` - Tailwind CSS v4
- `.storybook/` - Storybook

## Environment Variables

- `BASE_API_URL` - API backend URL (default: `http://localhost:3000`)
- API requests are rewritten: `/api/*` → `${BASE_API_URL}/api/*`
