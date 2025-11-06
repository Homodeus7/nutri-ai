# Архитектура проекта

## Организация лайаутов и структура папок

### Обзор структуры

Проект использует паттерн **разделения роутинга и бизнес-логики** для достижения максимальной гибкости, тестируемости и масштабируемости.

```
/pages/              → Слой роутинга Next.js (Pages Router)
/src/pages/          → Бизнес-логика страниц
/src/app/pub/        → Инфраструктура приложения (провайдеры, лайауты)
/src/shared/lib/     → Переиспользуемые утилиты
```

---

## Структура и назначение папок

### 1. `/pages/` — Слой роутинга Next.js

Содержит **только тонкие обертки** для Next.js Pages Router. Эти файлы связывают URL с компонентами и назначают лайауты.

**Пример:** `pages/sign-in/index.tsx`
```tsx
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);
```

**Задачи:**
- Определение маршрутов приложения (file-based routing)
- Связывание URL с компонентами страниц
- Назначение лайаутов через `setPageLayout`

**Почему нужна эта папка:**
Next.js Pages Router требует наличия папки `/pages/` для маршрутизации. Это не недостаток, а архитектурное требование фреймворка.

---

### 2. `/src/pages/` — Бизнес-логика страниц

Содержит **реальные компоненты страниц** с бизнес-логикой, независимые от Next.js.

**Задачи:**
- Реализация UI и логики страниц
- Работа с данными, состоянием, эффектами
- Композиция компонентов из UI-kit

**Преимущества:**
- Компоненты не зависят от Next.js и могут быть протестированы изолированно
- Можно использовать в Storybook, тестах, разных контекстах
- Легко переиспользовать между проектами

---

### 3. `/src/app/pub/` — Инфраструктура приложения

Содержит корневую инфраструктуру приложения: провайдеры, лайауты, загрузчики данных.

**Файлы:**

#### `app.tsx` — Корневой компонент
```tsx
export function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  return (
    <AppLoader data={pageProps}>
      <AppProvider>
        <AppLayout>
          {getLayout(<Component {...pageProps} />, pageProps)}
        </AppLayout>
      </AppProvider>
    </AppLoader>
  );
}
```

Реализует паттерн **Per-Page Layouts** — каждая страница выбирает свой лайаут через метод `getLayout`.

#### `get-open-layout.tsx` — Публичный лайаут
```tsx
export const getOpenLayout: NextPageLayout = (children) => (
  <OpenLayout>{children}</OpenLayout>
);
```

Используется для **публичных страниц** (sign-in, 403, landing).

#### `get-private-layout.tsx` — Приватный лайаут
```tsx
export const getPrivateLayout: NextPageLayout = (children, data) => (
  <PrivateLoader data={data}>
    <PrivateProvider>
      <PrivateLayout>{children}</PrivateLayout>
    </PrivateProvider>
  </PrivateLoader>
);
```

Используется для **защищенных страниц** с авторизацией. Включает:
- Загрузку данных пользователя (`PrivateLoader`)
- Контекст приватных данных (`PrivateProvider`)
- Специфичный UI для авторизованных пользователей

**Задачи:**
- Управление глобальным состоянием (провайдеры)
- Предоставление различных лайаутов для разных типов страниц
- Загрузка глобальных данных (локализация, настройки, профиль)

---

### 4. `/src/shared/lib/next.ts` — Утилиты

Содержит переиспользуемые утилиты для работы с Next.js.

```tsx
export type NextPageLayout = (
  page: React.ReactElement,
  data?: any,
) => React.ReactNode;

export const setPageLayout = (
  page: () => React.ReactElement,
  layout: NextPageLayout,
) => {
  const pageWithLayout = page as (() => React.ReactElement) & {
    getLayout?: NextPageLayout;
  };

  pageWithLayout.getLayout = layout;

  return pageWithLayout;
};
```

**Функция `setPageLayout`:**
- Декларативно связывает страницу с лайаутом
- Избегает дублирования кода
- Типизирована для TypeScript

---

## Преимущества архитектуры

### 1. Разделение ответственности (Separation of Concerns)

```
/pages/          → Роутинг (ЧТО открывать и ГДЕ)
/src/pages/      → Бизнес-логика (КАК работает)
/src/app/        → Инфраструктура (провайдеры, обертки)
```

Каждый слой имеет четкую зону ответственности.

### 2. Переиспользование компонентов

Компоненты из `/src/pages/` можно:
- Тестировать независимо от Next.js
- Использовать в Storybook для документации
- Рендерить в разных контекстах (desktop app, mobile)
- Переиспользовать между проектами

### 3. Гибкая система лайаутов

Реализован паттерн **Per-Page Layouts** из официальной документации Next.js:
- Каждая страница выбирает свой лайаут декларативно
- `getOpenLayout` для публичных страниц
- `getPrivateLayout` для защищенных страниц
- Легко добавить новые типы лайаутов (admin, mobile, embed)

### 4. Тестируемость

Бизнес-логика отделена от фреймворка:
- Unit-тесты для компонентов страниц без Next.js
- Интеграционные тесты для роутинга
- Мокирование провайдеров изолированно

### 5. Упрощенная миграция

При переходе на **App Router** (если потребуется):
- Изменяется только папка `/pages/` → `/app/`
- Вся логика в `/src/` остается нетронутой
- Минимальные изменения в инфраструктуре

### 6. Чистая архитектура

Следует принципам **Feature-Sliced Design** и **Clean Architecture**:

```
pages → app → shared
      ↘ pages ↗
```

Зависимости идут в одну сторону — от внешних слоев к внутренним.

---

## Как добавить новую страницу

### Публичная страница

1. Создать компонент в `/src/pages/my-page/index.tsx`:
```tsx
export const MyPage = () => {
  return <div>My Page Content</div>;
};
```

2. Создать роут в `/pages/my-page/index.tsx`:
```tsx
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { MyPage } from "@/pages/my-page";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(MyPage, getOpenLayout);
```

### Защищенная страница

1. Создать компонент в `/src/pages/dashboard/index.tsx`:
```tsx
export const DashboardPage = () => {
  return <div>Dashboard Content</div>;
};
```

2. Создать роут в `/pages/dashboard/index.tsx`:
```tsx
import { getPrivateLayout, getPrivateRouterLoader } from "@/app/pub/get-private-layout";
import { DashboardPage } from "@/pages/dashboard";
import { setPageLayout } from "@/shared/lib/next";

export const getServerSideProps = getPrivateRouterLoader;

export default setPageLayout(DashboardPage, getPrivateLayout);
```

---

## Как добавить новый тип лайаута

1. Создать компонент лайаута в `/src/app/layouts/admin-layout.tsx`:
```tsx
export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AdminSidebar />
      <main>{children}</main>
    </div>
  );
};
```

2. Создать функцию-обертку в `/src/app/pub/get-admin-layout.tsx`:
```tsx
import { NextPageLayout } from "@/shared/lib/next";
import { AdminLayout } from "../layouts/admin-layout";

export const getAdminLayout: NextPageLayout = (children) => (
  <AdminLayout>{children}</AdminLayout>
);
```

3. Использовать в странице:
```tsx
import { getAdminLayout } from "@/app/pub/get-admin-layout";

export default setPageLayout(AdminPage, getAdminLayout);
```

---

## Диаграмма потока рендеринга

```
1. Next.js читает /pages/sign-in/index.tsx
            ↓
2. Находит компонент с getLayout
            ↓
3. Рендерит _app.tsx (App)
            ↓
4. App извлекает getLayout из компонента
            ↓
5. Оборачивает <SignInPage /> в getOpenLayout
            ↓
6. getOpenLayout применяет <OpenLayout>
            ↓
7. Все обернуто в AppProvider и AppLayout
            ↓
8. Финальный вывод пользователю
```

---

## Альтернативные подходы

### Почему не Next.js App Router?

**App Router** — современная альтернатива, но:
- Pages Router стабильнее для проектов с SSR
- Миграция может быть постепенной при необходимости
- Текущая архитектура уже подготовлена к миграции

### Почему не смешивать все в `/pages/`?

Смешивание роутинга и бизнес-логики приводит к:
- Сложности тестирования (требуется мокировать Next.js)
- Невозможности переиспользовать компоненты
- Тесной связанности с фреймворком

---

## Рекомендации

1. **Держите `/pages/` максимально тонкими** — только роутинг и связывание
2. **Вся логика в `/src/pages/`** — бизнес-логика, стейт-менеджмент
3. **Провайдеры в `/src/app/providers/`** — глобальное состояние
4. **Лайауты в `/src/app/layouts/`** — переиспользуемые обертки UI
5. **Утилиты в `/src/shared/lib/`** — общие хелперы

---

## Полезные ссылки

- [Next.js Layouts Documentation](https://nextjs.org/docs/pages/building-your-application/routing/pages-and-layouts)
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Clean Architecture by Robert Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
