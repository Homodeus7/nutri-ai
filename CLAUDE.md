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

### Testing

```bash
npm test                   # Run unit tests in watch mode
npm run test:run           # Run unit tests once
npm run test:coverage      # Run tests with coverage report
npm run test:ui            # Run unit tests with Vitest UI
npm run test:e2e           # Run E2E tests with Playwright
npm run test:e2e:ui        # Run E2E tests in UI mode (debugging)
npm run test:e2e:headed    # Run E2E tests in headed mode
npm run test:e2e:debug     # Run E2E tests in debug mode
npm run test:e2e:chromium  # Run E2E tests in Chromium only
npm run test:e2e:report    # Show Playwright test report
```

See [docs/TESTING.md](./docs/TESTING.md) for complete testing guide.

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

The project uses a **focused testing strategy** - test only business-critical code:

**What to test:**

- ✅ **Zod schemas** - Validation logic and error messages (Vitest)
- ✅ **Zustand stores** - Complex state management (Vitest)
- ✅ **Custom hooks** - Only hooks with business logic (Vitest)
- ✅ **Critical flows** - Auth, core features, navigation (Playwright)
- ✅ **Accessibility** - WCAG compliance with axe-core (Playwright)
- ✅ **UI components** - Visual documentation (Storybook)

**What NOT to test:**

- ❌ UI components with unit tests (use Storybook)
- ❌ Library wrappers (cn, simple utils)
- ❌ Generated API code
- ❌ Simple helpers without logic

**Tools:**

- **Vitest**: Business logic tests (`*.test.ts` next to source)
- **Playwright**: E2E tests (`e2e/**/*.spec.ts`)
- **Storybook**: UI component documentation and testing
- **MSW**: API mocking (`src/shared/lib/msw/`)

**Test structure:**

```
e2e/                    # E2E tests
  auth/                 # Auth flows
  app/                  # Navigation, accessibility
src/features/auth/sign-in/
  model/
    sign-in.schema.ts
    sign-in.schema.test.ts  # Schema validation tests
```

See [docs/TESTING.md](./docs/TESTING.md) for complete guide.

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

## Memory Bank Guidelines

ВАЖНО: Активно используй MCP memory-bank для сохранения контекста и важной информации по проектам.

### Имя проекта

Имя проекта в memory-bank **всегда совпадает с именем рабочей директории**: `nutri-ai`

### Когда сохранять в memory-bank

Сохраняй информацию в следующих случаях:

- После исследования кодовой базы — записывай найденные паттерны, структуру компонентов
- Важные архитектурные решения и технические детали проекта
- Прогресс по сложным многоэтапным задачам
- Найденные проблемы и их решения
- Зависимости между компонентами и модулями
- Перед завершением длительной сессии — для продолжения работы позже
- Контекст, который поможет в будущих сессиях

### Рекомендуемая структура файлов

Старайся, чтобы файлы в memory-bank не разрастались сильно, пиши по делу и в новых файлах.

## Code Review Checklist

Перед коммитом проверяй:

### FSD & Architecture

- ✅ Используется FSD Public API (импорты через `index.ts`)
- ✅ Нет прямых импортов из `model/`, `ui/`, `lib/` извне модуля
- ✅ Соблюдены layer boundaries (нижние слои не импортируют верхние)
- ✅ Абсолютные импорты через `@/*` alias
- ✅ Роутинг в `/pages/`, бизнес-логика в `/src/pages/`

### Testing

- ✅ Zod schemas покрыты тестами
- ✅ Сложные Zustand stores протестированы
- ✅ Кастомные хуки с бизнес-логикой протестированы
- ✅ UI компоненты задокументированы в Storybook
- ✅ Критические флоу покрыты E2E тестами

### API & Data

- ✅ После изменения `schema.yml` выполнен `npm run generate:api`
- ✅ Используются только generated React Query hooks
- ✅ Формы используют TanStack Form + Zod validation

### UI & Styling

- ✅ Используется `cn()` для слияния классов
- ✅ Новые UI примитивы добавлены через `npx shadcn@latest add`
- ✅ Компоненты используют cva для вариантов

### Accessibility

- ✅ Semantic HTML
- ✅ ARIA attributes где необходимо
- ✅ Keyboard navigation
- ✅ Focus management

## Common Pitfalls

Типичные ошибки, которых нужно избегать:

### ❌ Прямые импорты из internal folders

```tsx
// ❌ WRONG
import { SignInForm } from "@/features/auth/sign-in/ui/sign-in-form";
import { useAuthStore } from "@/features/auth/sign-in/model/use-auth-store";

// ✅ CORRECT
import { SignInForm, useAuthStore } from "@/features/auth/sign-in";
```

### ❌ Unit тесты для UI компонентов

```tsx
// ❌ WRONG - не пиши unit тесты для UI
describe("Button", () => {
  it("renders correctly", () => { ... });
});

// ✅ CORRECT - используй Storybook
export const Primary: Story = { args: { variant: "primary" } };
```

### ❌ Пропуск генерации API

```bash
# ❌ WRONG - редактируешь schema.yml и забываешь регенерировать
vim src/shared/api/schema.yml

# ✅ CORRECT - всегда регенерируй после изменений
vim src/shared/api/schema.yml
npm run generate:api
```

### ❌ Нарушение FSD layer boundaries

```tsx
// ❌ WRONG - features импортирует из pages
// src/features/auth/sign-in/ui/form.tsx
import { BoardPage } from "@/pages/board";

// ✅ CORRECT - используй shared или entities
import { useAuthRedirect } from "@/shared/lib/auth";
```

### ❌ Создание ненужных файлов

```bash
# ❌ WRONG - создаешь новую утилиту для одной операции
src/shared/lib/format-email.ts

# ✅ CORRECT - используй inline или существующую утилиту
const email = value.toLowerCase().trim();
```

## Performance Considerations

### Tree-shaking через Public API

```tsx
// ✅ CORRECT - экспортируй только необходимое
// features/analytics/index.ts
export { useTrackEvent } from "./model/use-track-event";
export type { TrackEventOptions } from "./model/use-track-event";
// НЕ экспортируй internal helpers, они не попадут в bundle

// ❌ WRONG - экспорт всего подряд увеличивает bundle
export * from "./model";
export * from "./ui";
export * from "./lib";
```

### Dynamic imports для тяжелых компонентов

```tsx
// ✅ CORRECT - lazy load тяжелых компонентов
import dynamic from "next/dynamic";

const ChartWidget = dynamic(() => import("@/widgets/chart-widget"), {
  loading: () => <Spinner />,
});
```

### React Query optimistic updates

```tsx
// ✅ CORRECT - используй optimistic updates для лучшего UX
const { mutate } = useUpdateMeal({
  onMutate: async (newData) => {
    await queryClient.cancelQueries({ queryKey: ["meals"] });
    const previous = queryClient.getQueryData(["meals"]);
    queryClient.setQueryData(["meals"], (old) => ({ ...old, ...newData }));
    return { previous };
  },
  onError: (err, newData, context) => {
    queryClient.setQueryData(["meals"], context.previous);
  },
});
```

### Avoid unnecessary re-renders

```tsx
// ✅ CORRECT - используй селекторы в Zustand
const theme = useThemeStore((state) => state.theme);

// ❌ WRONG - подписка на весь store
const store = useThemeStore();
const theme = store.theme;
```

### Code splitting по роутам

```tsx
// ✅ CORRECT - Next.js автоматически делает code splitting
// pages/board/index.tsx → отдельный chunk
// pages/sign-in/index.tsx → отдельный chunk
```
