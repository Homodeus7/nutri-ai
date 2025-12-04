# Руководство по тестированию

Тестируем только бизнес-логику. UI компоненты покрываем Storybook, а не юнит-тестами.

## Философия

**Что тестируем:**
- ✅ Zod схемы - валидация и сообщения об ошибках
- ✅ Zustand stores - сложная логика состояния
- ✅ Кастомные хуки - только с бизнес-логикой
- ✅ Критические флоу - аутентификация, основные сценарии
- ✅ Accessibility - WCAG compliance

**Что НЕ тестируем:**
- ❌ UI компоненты (используем Storybook)
- ❌ Обёртки над библиотеками (cn, utils)
- ❌ Генерированный API код
- ❌ Простые хелперы без логики

## Инструменты

- **Vitest** - юнит-тесты (схемы, stores, хуки)
- **Playwright** - E2E тесты (критические флоу, accessibility)
- **Storybook** - UI компоненты (визуальная документация)

## Структура проекта

```
nutri-ai/
├── e2e/                           # E2E тесты (Playwright)
│   ├── fixtures/                  # Общие fixtures
│   ├── helpers/                   # Хелперы (auth.ts)
│   ├── auth/                      # Тесты аутентификации
│   └── app/                       # Тесты на уровне приложения
├── src/features/auth/sign-in/
│   └── model/
│       ├── sign-in.schema.ts
│       └── sign-in.schema.test.ts # Тесты схемы
```

**Правила именования:**
- Юнит-тесты: `*.test.ts` (рядом с файлом)
- E2E тесты: `*.spec.ts` (в папке `/e2e/`)

## Команды

```bash
# Vitest
npm test                   # Watch mode
npm run test:run           # Один раз
npm run test:ui            # UI режим
npm run test:coverage      # С покрытием

# Playwright
npm run test:e2e           # Все E2E тесты
npm run test:e2e:ui        # UI режим (для отладки)
npm run test:e2e:headed    # С видимым браузером
npm run test:e2e:debug     # Debug режим
npm run test:e2e:chromium  # Только Chromium

# Запуск конкретного теста
npm test -- path/to/file.test.ts
npm run test:e2e -- e2e/auth/sign-in.spec.ts
```

## Примеры

### Zod схемы

```typescript
// src/features/auth/sign-in/model/sign-in.schema.test.ts
import { describe, expect, it } from "vitest";
import { signInSchema } from "./sign-in.schema";

describe("signInSchema", () => {
  it("должен пройти с валидным email", () => {
    const result = signInSchema.safeParse({
      email: "user@example.com",
      password: "password123",
    });
    expect(result.success).toBe(true);
  });

  it("должен упасть с невалидным email", () => {
    const result = signInSchema.safeParse({
      email: "invalid",
      password: "password123",
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toBe("Введите корректный email");
    }
  });
});
```

### Zustand stores

```typescript
// src/features/theme/model/theme.store.test.ts
import { describe, expect, it, beforeEach } from "vitest";
import { useThemeStore } from "./theme.store";

describe("useThemeStore", () => {
  beforeEach(() => {
    useThemeStore.setState({ theme: "light" });
  });

  it("должен переключить тему", () => {
    const { toggleTheme } = useThemeStore.getState();
    toggleTheme();
    expect(useThemeStore.getState().theme).toBe("dark");
  });
});
```

### E2E тесты

```typescript
// e2e/auth/sign-in.spec.ts
import { expect, test } from "../fixtures";

test.describe("Вход в систему", () => {
  test("должен показать форму входа", async ({ page }) => {
    await page.goto("/sign-in");
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('input[name="password"]')).toBeVisible();
  });
});
```

**С хелперами:**

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

test("должен успешно войти", async ({ page }) => {
  await signIn(page, "test@example.com", "password123");
  await expect(page).toHaveURL("/board");
});
```

### Accessibility

```typescript
// e2e/app/accessibility.spec.ts
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "../fixtures";

test("не должен иметь проблем с доступностью", async ({ page }) => {
  await page.goto("/sign-in");
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
```

## Лучшие практики

### Юнит-тесты

1. **Используй `safeParse`** для Zod схем - тестируй success и error
2. **Проверяй сообщения об ошибках** - они видны пользователю
3. **Сбрасывай state** между тестами через `beforeEach`
4. **Тестируй edge cases** - пустые значения, границы, невалидные данные

### E2E тесты

1. **Только критические флоу** - E2E медленные и дорогие
2. **Переиспользуй хелперы** - выноси общие действия (auth, navigation)
3. **Семантические селекторы** - избегай `data-testid`
4. **Ждём навигацию** - используй `waitForURL`, `waitForResponse`

## Отладка

**Vitest:**
```bash
npm run test:ui  # Интерактивная отладка
```

**Playwright:**
```bash
npm run test:e2e:debug    # Inspector
npm run test:e2e:ui       # UI режим
npm run test:e2e:headed   # Видимый браузер

# В коде
await page.pause();  // Пауза для отладки
```

## Частые проблемы

**Cannot find module '@/...'**
- Проверь `vitest.config.ts` → `resolve.alias`

**ReferenceError: document is not defined**
- Добавь `environment: "jsdom"` в `vitest.config.ts`

**Playwright timeout**
- Увеличь `timeout` в `playwright.config.ts`
