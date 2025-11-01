# Nutri AI

Веб-приложение для учёта калорий с AI-парсингом приёмов пищи на базе Next.js и Feature-Sliced Design.

## Содержание

- [Быстрый старт](#быстрый-старт)
- [Особенности](#особенности)
- [Стек технологий](#стек-технологий)
- [Скрипты](#скрипты)
- [Архитектура](#архитектура)
- [Установка](#установка)
- [Разработка](#разработка)
- [Структура данных](#структура-данных)
- [Документация](#документация)
- [Лицензия](#лицензия)

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Создать .env файл
cp .env.example .env

# Запуск dev сервера с Turbopack
npm run dev
```

Приложение будет доступно на [http://localhost:3000](http://localhost:3000)

**Требования:**
- Node.js >= 18
- npm >= 9

## Особенности

### AI-парсинг приёмов пищи

Пользователь вводит текст на естественном языке:

```
"завтрак: овсянка 50г с бананом и мёдом, кофе с молоком"
```

AI преобразует в структурированные данные:

- Распознаёт продукты
- Определяет количество
- Рассчитывает калории и макронутриенты
- Возвращает confidence level для проверки

### Серверное состояние (React Query)

```tsx
import { useGetUserProfile } from "@/shared/api/generated";

const { data, isLoading, error } = useGetUserProfile();
```

Конфигурация React Query в `@/shared/lib/react-query`.

### Клиентское состояние (Zustand)

```tsx
import { create } from "zustand";

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));
```

### WebSocket соединение

Real-time обновления через Socket.io:

- Синхронизация данных между устройствами
- Уведомления о достижении целей
- Live обновления статистики

### Темная тема

Автоматическое определение темы системы через `features/theme`:

```tsx
import { useTheme } from "@/features/theme";

const { theme, setTheme } = useTheme();
```

## Стек технологий

- **Next.js** 15.5.6 — фреймворк (Pages Router + Turbopack)
- **React** 19.1.0 + **React DOM** 19.1.0
- **TypeScript** ~5
- **TailwindCSS** ^4 — утилитарная стилизация
- **React Query** (TanStack Query) ^5.90 — серверное состояние
- **Zustand** ^5.0 — клиентское состояние
- **Axios** ^1.12 — HTTP клиент
- **Orval** ^7.14 — генерация API из OpenAPI
- **MSW** ^2.11 — мокирование API
- **Shadcn UI** — переиспользуемый UI
- **Lucide React** ^0.546 — иконки
- **Socket.io Client** ^4.8 — WebSocket соединение

## Скрипты

```bash
npm run dev             # Dev сервер (Turbopack)
npm run build           # Production сборка
npm start               # Запуск production сервера
npm run storybook       # Запуск Storybook
npm run build-storybook # Сборка статической версии Storybook
npm run generate:api    # Генерация API клиента из OpenAPI
npm run lint            # ESLint проверка
```

## Архитектура

Проект следует принципам [Feature-Sliced Design](https://feature-sliced.design/):

```
├── pages/                # Next.js роутинг (тонкие обертки)
│   ├── _app.tsx          # Корневой компонент
│   ├── _document.tsx     # HTML документ
│   ├── sign-in/          # Публичные страницы
│   └── board/            # Защищённые страницы
├── src/
│   ├── app/              # Инфраструктура приложения
│   │   ├── pub/          # Публичная конфигурация (app.tsx, лайауты)
│   │   ├── providers/    # Провайдеры (AppProvider, PrivateProvider)
│   │   ├── loaders/      # Загрузчики данных
│   │   ├── layouts/      # Компоненты лайаутов
│   │   └── interceptors/ # HTTP interceptors
│   ├── features/         # Фичи (theme, i18n)
│   ├── pages/            # Бизнес-логика страниц
│   │   ├── sign-in/      # Страница входа
│   │   └── board/        # Доска (защищённая)
│   └── shared/           # Общая инфраструктура
│       ├── api/          # API клиент + Orval генерация
│       ├── ui/           # UI компоненты
│       ├── lib/          # Утилиты и хуки
│       └── constants/    # Константы
```

**Правила импортов:**

- Нижние слои не импортируют верхние
- Импорты через алиас `@/*` (абсолютные пути)
- `/pages/` только для роутинга, логика в `/src/pages/`

**Подробнее:**

- [ARCHITECTURE.md](./ARCHITECTURE.md) — система лайаутов и организация кода

## Установка

### Переменные окружения

Создай `.env` файл на основе `.env.example`:

```env
# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000

# WebSocket
NEXT_PUBLIC_WS_URL=ws://localhost:8000

# Feature flags
NEXT_PUBLIC_ENABLE_AI=true
```

## Разработка

### API генерация

После изменения `src/shared/api/schema.yml`:

```bash
npm run generate:api
```

Orval создаст React Query хуки в `src/shared/api/generated/`.

### Линтинг

```bash
npm run lint
```

ESLint с проверкой:

- TypeScript правила
- Next.js специфичные правила
- Import resolver для абсолютных путей
- Boundaries plugin для FSD архитектуры

### Система лайаутов

Проект использует Per-Page Layouts:

```tsx
// pages/dashboard/index.tsx
import { setPageLayout } from "@/shared/lib/next";
import { getPrivateLayout } from "@/app/pub/get-private-layout";
import { DashboardPage } from "@/pages/dashboard";

export default setPageLayout(DashboardPage, getPrivateLayout);
```

**Доступные лайауты:**

- `getOpenLayout` — публичные страницы (sign-in, landing)
- `getPrivateLayout` — защищённые страницы с авторизацией

### Стилизация

TailwindCSS v4 с утилитами:

```tsx
import { cn } from "@/shared/lib/utils";

<div
  className={cn(
    "bg-white dark:bg-gray-900",
    "p-4 rounded-lg",
    isActive && "border-2 border-blue-500",
  )}
>
  Контент
</div>;
```

### Работа с shadcn/ui

Проект использует [shadcn/ui](https://ui.shadcn.com) — коллекцию переиспользуемых компонентов на базе Radix UI и TailwindCSS.

**Паттерн использования:**

1. **Примитивы** → `src/shared/ui/primitives/`
   - Список компонентов: [components](https://ui.shadcn.com/docs/components)
   - Устанавливаются через CLI: `npx shadcn@latest add button`

2. **UI Kit** → `src/shared/ui/`
   - Композитные компоненты на основе примитивов
   - Бизнес-специфичная логика и стилизация
   - Например: `ui-select.tsx`, `ui-spinner.tsx`

**Добавление нового примитива:**

```bash
# Установка компонента из shadcn/ui
npx shadcn@latest add dialog

# Компонент появится в src/shared/ui/primitives/dialog.tsx
```

**Создание UI компонента:**

```tsx
// src/shared/ui/ui-dialog.tsx
import { Dialog, DialogContent, DialogHeader } from "./primitives/dialog";

export const UiDialog = ({ title, children, ...props }) => (
  <Dialog {...props}>
    <DialogContent>
      <DialogHeader>{title}</DialogHeader>
      {children}
    </DialogContent>
  </Dialog>
);
```

**Преимущества:**

- Полный контроль над кодом компонентов
- Легкая кастомизация под проект
- TypeScript из коробки

### Storybook

Проект использует [Storybook](https://storybook.js.org) для разработки и документации UI компонентов в изоляции.

**Запуск:**

```bash
npm run storybook
```

Storybook будет доступен на [http://localhost:6006](http://localhost:6006)

**Структура:**

- Stories создаются рядом с компонентами: `component.stories.tsx`
- Все stories в `src/shared/ui/`
- Автоматическая генерация документации через `tags: ['autodocs']`

**Создание новой story:**

```tsx
// src/shared/ui/ui-button.stories.tsx
import type { Meta, StoryObj } from "@storybook/react";
import { UiButton } from "./ui-button";

const meta = {
  title: "shared/ui/UiButton",
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
    children: "Click me",
  },
};
```

**Преимущества:**

- Изолированная разработка компонентов
- Визуальное тестирование
- Автоматическая документация
- Проверка доступности (a11y addon)
- Интеграция с Vitest для тестирования

## Структура данных

### Основные сущности

- **User** — пользователь (email, displayName, dailyKcalGoal)
- **DayEntry** — запись дня (date, targetKcal, consumedKcal)
- **Meal** — приём пищи (type, time, totalKcal, source)
- **FoodItem** — позиция продукта (name, quantity, kcal, macros)
- **DietPlan** — план питания (targetKcal, macros)

**Подробнее:**

- [SPECIFICATIONS.md](./SPECIFICATIONS.md) — полная модель данных и API

## Документация

- [SPECIFICATIONS.md](./SPECIFICATIONS.md) — бизнес-требования и API
- [ARCHITECTURE.md](./ARCHITECTURE.md) — архитектура лайаутов
- [src/shared/api/README.md](./src/shared/api/README.md) — работа с API
- [GIT_FLOW.md](./GIT_FLOW.md) — git workflow

## Лицензия

Проприетарное ПО. Все права защищены.
