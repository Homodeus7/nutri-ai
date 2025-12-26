# CLAUDE.md

Instructions for Claude Code when working with Nutri AI project.

**Nutri AI** - calorie tracking app with AI-powered meal parsing
**Stack:** Next.js 15 (Pages Router), React 19, TypeScript, Feature-Sliced Design

## Critical Rules

1. **FSD Public API**: Import ONLY via `index.ts` - never from `model/`, `ui/`, `lib/`
2. **Routing separation**: `/pages/` - Next.js routing only, `/src/pages/` - business logic
3. **Use generated API**: `@/shared/api/generated` hooks (run `npm run generate:api` after schema changes)
4. **Absolute imports**: `@/*` only
5. **Test selectively**: schemas, stores, critical flows ([TESTING.md](./docs/TESTING.md))

## Tech Stack

**Core:** Next.js 15.5.6, React 19, TypeScript 5
**State:** React Query 5.90.5 (server), Zustand 5.0.8 (client)
**Forms:** React Hook Form 7.68.0 + Zod 3.25.76
**UI:** Radix UI (shadcn/ui), Tailwind v4, Lucide icons
**Testing:** Vitest, Playwright, Storybook
**API:** Orval 7.14.0 (OpenAPI codegen), Axios 1.12.2

## Structure

```
/pages/           # Next.js routing (thin wrappers only)
/src/
  /app/           # Infrastructure (layouts, providers, loaders, interceptors)
  /pages/         # Page components with business logic
  /features/      # Feature modules (auth, i18n, theme)
  /entities/      # Domain entities
  /widgets/       # Composite widgets
  /shared/        # Shared (api, ui, lib, constants)
    /api/         # API client (generated from OpenAPI)
    /ui/          # UI components
      /primitives/  # shadcn/ui primitives
      /inputs/      # Form-integrated inputs
```

## Layouts

Use in `/pages/[name]/index.tsx`:
- `getOpenLayout` - public pages (sign-in, landing)
- `getPrivateLayout` - protected pages (require auth)

```tsx
import { getPrivateLayout } from "@/app/pub/get-private-layout";
import { MyPage } from "@/pages/my-page";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(MyPage, getPrivateLayout);
```

## Key Workflows

**Forms:**
```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });
type FormData = z.infer<typeof schema>;

const form = useForm<FormData>({
  resolver: zodResolver(schema),
  defaultValues: { email: "" }
});
```

**API:**
```tsx
// Queries
import { useGetUserProfile } from "@/shared/api/generated";
const { data, isLoading } = useGetUserProfile();

// Mutations
import { usePostAuth } from "@/shared/api/generated";
const { mutate, isPending } = usePostAuth();
```

**UI Components:**
```bash
npx shadcn@latest add [component]  # → src/shared/ui/primitives/
```

## Commands

```bash
# Development
npm run dev              # Dev server (Turbopack)
npm run build            # Production build

# API
npm run generate:api     # Regenerate API from schema.yml (ALWAYS after schema changes)

# Testing
npm test                 # Vitest watch
npm run test:e2e         # Playwright headless
npm run test:e2e:ui      # Playwright UI mode

# Storybook
npm run storybook        # Dev on :6006
```

## Documentation

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Full architecture details
- [PATTERNS.md](./docs/PATTERNS.md) - Code patterns and examples
- [TESTING.md](./docs/TESTING.md) - Testing guide
- [API.md](./docs/API.md) - API layer details
- [INDEX.md](./docs/INDEX.md) - Docs index

## Memory Bank

**Project name:** `nutri-ai` (matches directory)

**When to save:**
- After codebase exploration
- Architectural decisions
- Complex task progress
- Found issues/solutions
- Before ending sessions

**Keep files:** compact, focused, separated by topic
