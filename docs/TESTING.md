# Testing Guide

Nutri AI uses a focused testing strategy that tests only business-critical code. UI components are covered by Storybook, not unit tests.

## Testing Philosophy

**Test only what matters:**
- ✅ Business logic (schemas, stores, hooks)
- ✅ Critical user flows (E2E)
- ✅ Accessibility compliance
- ❌ UI components (use Storybook instead)
- ❌ Library wrappers (cn, utils)
- ❌ Simple helpers without logic

## Testing Stack

### Vitest (Unit Tests)
- **Zod schemas** validation logic
- **Zustand stores** with business logic
- **Custom hooks** with business logic
- **TypeScript** support with path aliases (`@/*`)

### Playwright (E2E Tests)
- Cross-browser testing (Chromium, Firefox, WebKit)
- Critical user flows (auth, core features)
- Accessibility testing with axe-core

### Storybook (UI Component Testing)
- Visual documentation and testing
- All UI components covered in Storybook
- Interactive component development

## Project Structure

```
nutri-ai/
├── e2e/                           # E2E tests (Playwright)
│   ├── fixtures/                  # Shared fixtures
│   │   └── index.ts
│   ├── helpers/                   # Test helpers
│   │   └── auth.ts
│   ├── auth/                      # Auth flow tests
│   │   └── sign-in.spec.ts
│   └── app/                       # App-level tests
│       ├── navigation.spec.ts
│       └── accessibility.spec.ts
├── src/
│   └── features/auth/sign-in/
│       └── model/
│           ├── sign-in.schema.ts
│           └── sign-in.schema.test.ts  # Schema validation tests
├── vitest.config.ts               # Vitest configuration
├── vitest.setup.ts                # Global test setup
└── playwright.config.ts           # Playwright configuration
```

## Test Naming Convention

### File Naming
- Unit/Component tests: `*.test.ts` or `*.test.tsx`
- E2E tests: `*.spec.ts`
- Place tests **next to the source files** they test

### Test Organization (FSD Pattern)
```
/e2e/
  auth/          # Corresponds to features/auth
  board/         # Corresponds to features/board
  app/           # App-level flows
```

## Writing Tests

### Unit Tests (Vitest)

**Testing Zod schemas (validation logic):**

```typescript
// src/features/auth/sign-in/model/sign-in.schema.test.ts
import { describe, expect, it } from "vitest";
import { signInSchema } from "./sign-in.schema";

describe("signInSchema", () => {
  describe("email validation", () => {
    it("should pass with valid email", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "password123",
      });
      expect(result.success).toBe(true);
    });

    it("should fail with invalid email format", () => {
      const result = signInSchema.safeParse({
        email: "invalid-email",
        password: "password123",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Please enter a valid email address"
        );
      }
    });
  });

  describe("password validation", () => {
    it("should fail with password shorter than 8 characters", () => {
      const result = signInSchema.safeParse({
        email: "user@example.com",
        password: "short",
      });
      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error.issues[0].message).toBe(
          "Password must be at least 8 characters"
        );
      }
    });
  });
});
```

**Testing Zustand stores:**

```typescript
// src/features/theme/model/theme.store.test.ts
import { describe, expect, it, beforeEach } from "vitest";
import { useThemeStore } from "./theme.store";

describe("useThemeStore", () => {
  beforeEach(() => {
    // Reset store state
    useThemeStore.setState({ theme: "light" });
  });

  it("should toggle theme", () => {
    const { toggleTheme } = useThemeStore.getState();
    toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");
  });
});
```

**Testing custom hooks:**

```typescript
// src/shared/lib/hooks/use-debounce.test.ts
import { renderHook, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { useDebounce } from "./use-debounce";

describe("useDebounce", () => {
  it("should debounce value changes", async () => {
    const { result, rerender } = renderHook(
      ({ value }) => useDebounce(value, 500),
      { initialProps: { value: "initial" } }
    );

    expect(result.current).toBe("initial");

    rerender({ value: "updated" });
    expect(result.current).toBe("initial"); // Not updated yet

    await waitFor(() => expect(result.current).toBe("updated"), {
      timeout: 600,
    });
  });
});
```

### E2E Tests (Playwright)

**Basic page tests:**

```typescript
// e2e/auth/sign-in.spec.ts
import { expect, test } from "../fixtures";

test.describe("Sign In", () => {
  test("should display sign in form", async ({ page }) => {
    await page.goto("/sign-in");

    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
```

**Using helpers:**

```typescript
// e2e/helpers/auth.ts
export async function signIn(page: Page, email: string, password: string) {
  await page.goto("/sign-in");
  await page.fill('[name="email"]', email);
  await page.fill('[name="password"]', password);
  await page.click('button[type="submit"]');
}

// e2e/auth/sign-in.spec.ts
import { signIn } from "../helpers/auth";

test("should sign in successfully", async ({ page }) => {
  await signIn(page, "test@example.com", "password123");
  await expect(page).toHaveURL("/board");
});
```

**Accessibility tests:**

```typescript
// e2e/app/accessibility.spec.ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../fixtures";

test("should not have accessibility violations", async ({ page }) => {
  await page.goto("/sign-in");

  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## Running Tests

### Vitest (Unit & Integration)

```bash
# Run tests in watch mode (default)
npm test

# Run tests once
npm run test:run

# Run with UI
npm run test:ui

# Run with coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

### Playwright (E2E)

```bash
# Run all E2E tests
npm run test:e2e

# Run with UI mode (recommended for debugging)
npm run test:e2e:ui

# Run in headed mode (see browser)
npm run test:e2e:headed

# Debug mode (step through tests)
npm run test:e2e:debug

# Run specific browser
npm run test:e2e:chromium

# Show report
npm run test:e2e:report
```

### Run specific tests

```bash
# Vitest - run specific file
npm test -- src/shared/lib/utils.test.ts

# Vitest - run tests matching pattern
npm test -- --grep="cn"

# Playwright - run specific file
npm run test:e2e -- e2e/auth/sign-in.spec.ts

# Playwright - run tests matching title
npm run test:e2e -- --grep="sign in"
```

## Best Practices

### General

1. **Test naming**: Use descriptive names that explain what is being tested
   ```typescript
   // ✅ Good
   it("should show error when email is invalid")

   // ❌ Bad
   it("test 1")
   ```

2. **Test organization**: Group related tests with `describe`
   ```typescript
   describe("SignInForm", () => {
     describe("email validation", () => {
       it("should accept valid emails");
       it("should reject invalid emails");
     });
   });
   ```

3. **Arrange-Act-Assert**: Structure tests clearly
   ```typescript
   it("should update count", async () => {
     // Arrange
     const { getByRole } = render(<Counter />);

     // Act
     await userEvent.click(getByRole("button"));

     // Assert
     expect(getByRole("status")).toHaveTextContent("1");
   });
   ```

### Unit Tests (Schemas, Stores, Hooks)

1. **Test business logic only**: Focus on validation, state changes, transformations
2. **Test edge cases**: Empty values, boundaries, invalid inputs
3. **Use `safeParse` for Zod schemas**: Avoid thrown errors, test both success and error states
4. **Test error messages**: Ensure user-facing messages are correct
5. **Reset state between tests**: Use `beforeEach` to reset Zustand stores
6. **Mock sparingly**: Only mock external dependencies (API, timers), not business logic

**Example - Schema validation:**
```typescript
// ✅ Good - tests validation and error messages
it("should fail with invalid email", () => {
  const result = signInSchema.safeParse({ email: "invalid", password: "pass" });
  expect(result.success).toBe(false);
  if (!result.success) {
    expect(result.error.issues[0].message).toBe("Please enter a valid email address");
  }
});

// ❌ Bad - only tests success case
it("validates email", () => {
  const result = signInSchema.parse({ email: "user@example.com", password: "pass" });
  expect(result).toBeTruthy();
});
```

### E2E Tests

1. **Test critical user flows only**: E2E tests are slow and expensive
2. **Use `test.skip`** for tests requiring API mocks/setup
3. **Create reusable helpers** for common actions (auth, navigation)
4. **Use data-testid sparingly**: Prefer semantic selectors
5. **Wait for navigation/network**: Use `waitForURL`, `waitForResponse`

## Testing Strategy

### What to Test

**Unit tests (Vitest) - Business Logic Only:**
- ✅ **Zod schemas** - Validation rules and error messages
- ✅ **Zustand stores** - State management with complex logic
- ✅ **Custom hooks** - Only hooks with business logic (not UI hooks)
- ✅ **Pure functions** - Utilities with algorithms or transformations

**E2E tests (Playwright) - Critical Flows:**
- ✅ **Authentication flows** - Sign in, sign up, sign out
- ✅ **Core features** - Main user journeys
- ✅ **Navigation** - Redirects, protected routes
- ✅ **Accessibility** - WCAG compliance with axe-core
- ✅ **Cross-browser** - Chromium, Firefox, WebKit

**Storybook - UI Components:**
- ✅ **All UI components** - Visual documentation and testing
- ✅ **Component variants** - Different states and props
- ✅ **Interactive testing** - Manual testing in isolation

### What NOT to Test

**❌ Don't write unit tests for:**
- UI components (use Storybook)
- Library wrappers (`cn`, simple utils)
- Generated API code
- Simple helpers without logic
- Next.js framework code

**❌ Don't write E2E tests for:**
- UI component variations
- Simple pages without logic
- Every possible edge case (use unit tests)

## CI/CD Integration

### GitHub Actions Example

```yaml
name: Tests

on: [push, pull_request]

jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:run

  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run build
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Debugging

### Vitest

```bash
# Run in UI mode for interactive debugging
npm run test:ui

# Use console.log or debugger in tests
it("debugs test", () => {
  const result = myFunction();
  console.log("Result:", result);
  debugger; // Pause here
});
```

### Playwright

```bash
# Debug mode - opens inspector
npm run test:e2e:debug

# Headed mode - see browser
npm run test:e2e:headed

# UI mode - interactive debugging
npm run test:e2e:ui
```

**Add breakpoints in tests:**
```typescript
test("debug test", async ({ page }) => {
  await page.goto("/");
  await page.pause(); // Opens Playwright Inspector
  // ... rest of test
});
```

## Coverage

### View coverage reports

```bash
# Generate coverage
npm run test:coverage

# Coverage report saved to:
# - coverage/index.html (open in browser)
# - coverage/coverage-final.json
```

### Coverage configuration

Coverage excludes (configured in `vitest.config.ts`):
- `node_modules/`
- `.next/`
- `e2e/`
- Config files
- Generated code (`src/shared/api/generated/`)
- Public API files (`index.ts`)

## Common Issues

### "Cannot find module '@/...'"

**Solution**: Path aliases are configured in `vitest.config.ts`. Ensure:
```typescript
resolve: {
  alias: {
    "@": path.resolve(__dirname, "./src"),
  },
}
```

### "ReferenceError: document is not defined"

**Solution**: Ensure `environment: "jsdom"` in `vitest.config.ts`

### Playwright tests timeout

**Solution**: Increase timeout in `playwright.config.ts`:
```typescript
use: {
  timeout: 30000, // 30 seconds per test
}
```

### React 19 compatibility warnings

**Solution**: Ignore warnings in tests:
```typescript
// vitest.setup.ts
const originalError = console.error;
console.error = (...args) => {
  if (args[0]?.includes("ReactDOM.render")) return;
  originalError(...args);
};
```

## Resources

- [Vitest Docs](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Docs](https://playwright.dev/)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
