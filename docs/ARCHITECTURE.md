# Архитектура проекта

## Принцип разделения

Проект разделяет **роутинг** и **бизнес-логику** для гибкости, тестируемости и масштабируемости.

```
/pages/              → Роутинг Next.js (тонкие обертки)
/src/pages/          → Бизнес-логика страниц
/src/app/            → Инфраструктура (провайдеры, лайауты)
```

---

## Структура папок

| Папка | Назначение | Что содержит |
|-------|-----------|-------------|
| `/pages/` | Next.js routing | Связь URL с компонентами, назначение лайаутов |
| `/src/pages/` | Бизнес-логика | Компоненты страниц, независимые от Next.js |
| `/src/app/pub/` | Инфраструктура | Провайдеры, лайауты, загрузчики данных |
| `/src/app/layouts/` | Компоненты лайаутов | app-layout, open-layout, private-layout |
| `/src/app/providers/` | Провайдеры | app-provider, private-provider |
| `/src/app/loaders/` | Загрузчики данных | app-loader, private-loader |

---

## Per-Page Layouts Pattern

Каждая страница декларативно выбирает свой лайаут через `setPageLayout`.

**Пример роута** (`pages/sign-in/index.tsx`):
```tsx
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { SignInPage } from "@/pages/sign-in";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(SignInPage, getOpenLayout);
```

**Доступные лайауты:**
- `getOpenLayout` - публичные страницы (sign-in, landing)
- `getPrivateLayout` - защищенные страницы с авторизацией

---

## Как добавить новую страницу

### Публичная страница

1. Создать `/src/pages/my-page/index.tsx`:
```tsx
export const MyPage = () => <div>Content</div>;
```

2. Создать `/pages/my-page/index.tsx`:
```tsx
import { getOpenLayout } from "@/app/pub/get-open-layout";
import { MyPage } from "@/pages/my-page";
import { setPageLayout } from "@/shared/lib/next";

export default setPageLayout(MyPage, getOpenLayout);
```

### Защищенная страница

Используй `getPrivateLayout` и добавь loader:

```tsx
import { getPrivateLayout, getPrivateRouterLoader } from "@/app/pub/get-private-layout";
import { DashboardPage } from "@/pages/dashboard";
import { setPageLayout } from "@/shared/lib/next";

export const getServerSideProps = getPrivateRouterLoader;

export default setPageLayout(DashboardPage, getPrivateLayout);
```

---

## Как добавить новый лайаут

1. Создать `/src/app/layouts/admin-layout.tsx`
2. Создать `/src/app/pub/get-admin-layout.tsx`:
```tsx
import { NextPageLayout } from "@/shared/lib/next";
import { AdminLayout } from "../layouts/admin-layout";

export const getAdminLayout: NextPageLayout = (children) => (
  <AdminLayout>{children}</AdminLayout>
);
```

3. Использовать: `setPageLayout(AdminPage, getAdminLayout)`

---

## Поток рендеринга

```
Next.js Router → _app.tsx (App)
                      ↓
          Извлечение getLayout из компонента
                      ↓
          Применение Layout (Open/Private)
                      ↓
          AppProvider + AppLayout
                      ↓
                  Рендер
```

---

## Преимущества

**Разделение ответственности:**
- Роутинг изолирован от логики
- Компоненты страниц переиспользуемы
- Легко тестировать без Next.js

**Гибкость лайаутов:**
- Per-Page Layouts pattern
- Легко добавлять новые типы (admin, mobile, embed)

**Упрощенная миграция:**
- При переходе на App Router меняется только `/pages/` → `/app/`
- Вся логика в `/src/` остается нетронутой

**Clean Architecture:**
- Зависимости идут от внешних слоев к внутренним
- Соблюдение Feature-Sliced Design принципов
