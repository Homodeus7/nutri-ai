# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Nutri AI is a web application for calorie tracking with AI-powered meal parsing, built with Next.js 15 (Pages Router), React 19, TypeScript, and Feature-Sliced Design architecture.

## Commands

### Development
```bash
npm run dev              # Start dev server with Turbopack
npm run build            # Production build with Turbopack
npm start                # Start production server
npm run storybook        # Run Storybook on port 6006
npm run build-storybook  # Build static Storybook
```

### Code Generation
```bash
npm run generate:api     # Generate React Query hooks from OpenAPI schema
```

After editing `src/shared/api/schema.yml`, always run `npm run generate:api` to regenerate the API client.

## Architecture

### Directory Structure

The project separates **routing** from **business logic**:

- `/pages/` - Next.js routing layer (thin wrappers only)
- `/src/pages/` - Page components with business logic
- `/src/app/` - Application infrastructure
  - `pub/` - Public app setup (App component, globals.css)
  - `layouts/` - Layout components (app-layout, open-layout, private-layout)
  - `providers/` - Provider components (app-provider, private-provider)
  - `loaders/` - Data loaders (app-loader, private-loader)
  - `interceptors/` - API interceptors
- `/src/features/` - Feature modules
  - `auth/` - Authentication (sign-in, sign-up with models/schemas)
  - `i18n/` - Internationalization (language store, updater)
  - `theme/` - Theme management (theme store, updater)
- `/src/entities/` - Domain entities with stores
- `/src/widgets/` - Composite widget components
- `/src/shared/` - Shared infrastructure
  - `api/` - API client and generated React Query hooks
  - `ui/` - UI components (primitives from shadcn/ui + custom components)
  - `lib/` - Utilities, hooks, and helpers
  - `constants/` - Application constants

### Per-Page Layouts Pattern

Pages use `setPageLayout` to declaratively assign layouts:

```tsx
// pages/sign-in/index.tsx
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);
```

Available layouts:
- `getOpenLayout` - Public pages (sign-in, landing)
- `getPrivateLayout` - Protected pages with authentication

### State Management

- **Server state**: React Query (`@tanstack/react-query`) - auto-generated from OpenAPI
- **Client state**: Zustand - stores in features/entities (auth, theme, i18n)
- **Forms**: TanStack React Form + Zod validation

### API Layer

API client is auto-generated from OpenAPI schema:

1. Edit `src/shared/api/schema.yml` (OpenAPI 3.0.3 spec)
2. Run `npm run generate:api` (uses Orval)
3. Use generated React Query hooks from `src/shared/api/generated/`

**Configuration** (orval.config.ts):
- Input: `src/shared/api/schema.yml`
- Output: `src/shared/api/generated/` (React Query client)
- Mutator: `src/shared/api/api-instance.ts` (Axios with credentials)
- Server output: `server/generated.ts`

**Axios instance** (api-instance.ts):
- Base URL: `/api` (rewrites to `BASE_API_URL` in next.config.ts)
- Credentials: `withCredentials: true` for cookie-based auth

### UI Components

UI components use shadcn/ui primitives + custom wrappers:

- **Primitives** (`src/shared/ui/primitives/`) - Radix UI components installed via shadcn CLI
- **Custom components** (`src/shared/ui/`) - Project-specific UI components
- **Inputs** (`src/shared/ui/inputs/`) - Form-integrated inputs
- **Forms** (`src/shared/ui/form/`) - React Form integrated components

**Adding a new primitive:**
```bash
npx shadcn@latest add [component]  # Installs to src/shared/ui/primitives/
```

**Existing primitives:**
- button, input, textarea, label, select, switch, separator, field, input-group, spinner, sonner

**Custom components with stories:**
- ui-button, ui-select, ui-spinner, ui-page-spinner, ui-text, ui-input

### Styling

- **Tailwind CSS v4** with CSS variables for theming
- **Class merging**: Use `cn()` from `src/shared/lib/utils.ts` (clsx + tailwind-merge)
- **Theme**: Light/dark mode via `next-themes` and Zustand store
- **Component variants**: Class Variance Authority (cva)

### Routing

**Current routes:**
- `/` → redirects to `/board`
- `/sign-in` - Sign-in page (public)
- `/board` - Board page (private)
- `/403` - Forbidden page

**Adding a new page:**

1. Create component in `/src/pages/[name]/`
2. Create route in `/pages/[name]/index.tsx`:
   ```tsx
   import { getOpenLayout } from "@/app/pub/get-open-layout";
   import { MyPage } from "@/pages/my-page";
   import { setPageLayout } from "@/shared/lib/next";

   export default setPageLayout(MyPage, getOpenLayout);
   ```
3. For private pages, use `getPrivateLayout` instead

### Provider Composition

App providers are composed in `src/app/providers/app-provider.tsx`:

```tsx
MSWProvider → Toaster → QueryProvider → I18nProvider → children
```

- **MSWProvider**: Mock Service Worker for API mocking (dev/test only)
- **Toaster**: Sonner toast notifications
- **QueryProvider**: React Query client
- **I18nProvider**: Internationalization

### Import Rules

1. **Always use absolute imports** via `@/*` alias
2. **Never import from `/pages/`** - only use for routing
3. **Layer boundaries**: Lower layers don't import upper layers (FSD)
4. **API imports**: Import from `@/shared/api` (generated hooks)
5. **UI imports**: Import from `@/shared/ui` or `@/shared/ui/primitives`
6. **FSD Public API (CRITICAL)**:
   - **NEVER import directly from internal folders** (model/, ui/, lib/, etc.)
   - **ALWAYS use public API through index.ts** for external imports
   - Each module (feature/entity/widget) MUST export only necessary items through index.ts
   - This enables proper tree-shaking and prevents bundle bloat
   - Example: Use `@/features/auth/sign-in` (✅) not `@/features/auth/sign-in/model/...` (❌)
   - Internal imports within the same module can use relative paths (`../model/...`)

### Testing

- **Storybook**: Component documentation and visual testing
  - Stories in `src/shared/ui/*.stories.tsx`
  - Run: `npm run storybook`
- **MSW**: API mocking for development
  - Config: `src/shared/lib/msw/`
  - Worker directory: `public/`
- **No unit test framework** currently configured

## Key Patterns

### Creating a Feature

Features follow this structure:

```
src/features/[feature-name]/
├── model/           # Stores, schemas
├── ui/              # UI components
└── index.ts         # Public exports (PUBLIC API)
```

**CRITICAL: Public API Pattern**

Each feature module MUST define its public API through `index.ts`:

1. **Export only what's necessary** - hooks, components, types, schemas
2. **Never expose internal implementation** - keep model/ui files private
3. **Always export related types** - if exporting schema, export its type too
4. **Enable tree-shaking** - only exported items will be bundled

```tsx
// ✅ CORRECT: features/auth/sign-in/index.ts
export { useSignIn } from "./model/use-sign-in";
export type { UseSignInOptions } from "./model/use-sign-in";
export { signInSchema } from "./model/sign-in.schema";
export type { SignInFormData } from "./model/sign-in.schema";
export { SignInForm } from "./ui/sign-in-form";

// ✅ CORRECT: External usage
import { SignInForm, useSignIn } from "@/features/auth/sign-in";

// ❌ WRONG: Direct import bypassing public API
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
```

Example: `src/features/auth/` contains sign-in/sign-up with Zod schemas and form components.

### Form Handling

Use TanStack React Form + Zod:

```tsx
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

const form = useForm({
  defaultValues: { email: "", password: "" },
  validatorAdapter: zodValidator(),
  validators: { onChange: schema },
});
```

### API Requests

Always use generated React Query hooks:

```tsx
import { useGetUserProfile } from "@/shared/api/generated";

const { data, isLoading, error } = useGetUserProfile();
```

For mutations:
```tsx
import { usePostAuth } from "@/shared/api/generated";

const { mutate, isPending } = usePostAuth();
mutate({ email, password });
```

### Environment Variables

- `BASE_API_URL` - API backend URL (default: `http://localhost:3000`)
- API requests are rewritten from `/api/*` to `${BASE_API_URL}/api/*`

## Technical Details

### Dependencies

**Core:**
- Next.js 15.5.6 (Pages Router + Turbopack)
- React 19.1.0
- TypeScript 5

**State & Data:**
- TanStack React Query 5.90.5 (server state)
- Zustand 5.0.8 (client state)
- Axios 1.12.2 (HTTP client)

**Forms & Validation:**
- TanStack React Form 1.23.8
- Zod 3.25.76

**UI:**
- Radix UI components
- Tailwind CSS 4
- Lucide React 0.546 (icons)
- Sonner 2.0.7 (toasts)
- next-themes 0.4.6

**Dev Tools:**
- Orval 7.14.0 (OpenAPI codegen)
- MSW 2.11.6 (API mocking)
- Storybook 10.0.2
- shadcn CLI 3.5.0

### Configuration Files

- `tsconfig.json` - TypeScript config with `@/*` path alias → `./src/*`
- `next.config.ts` - Next.js config with redirects and API rewrites
- `orval.config.ts` - OpenAPI code generation
- `components.json` - shadcn/ui configuration
- `tailwind.config.ts` - Tailwind CSS v4 configuration
- `.storybook/` - Storybook configuration

## Documentation

Full documentation is in `/docs/`:

- [docs/INDEX.md](./docs/INDEX.md) - Documentation index
- [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Detailed architecture
- [docs/SPECIFICATIONS.md](./docs/SPECIFICATIONS.md) - Business requirements and API spec
- [docs/API.md](./docs/API.md) - API layer details
- [docs/GIT_FLOW.md](./docs/GIT_FLOW.md) - Git workflow

**Quick reference:**
- Architecture: Feature-Sliced Design with Pages Router
- Layouts: Per-page layouts pattern
- API: OpenAPI → Orval → React Query hooks
- Forms: TanStack Form + Zod
- State: React Query (server) + Zustand (client)
- UI: shadcn/ui primitives + custom components
- Styling: Tailwind CSS v4 with theme system
