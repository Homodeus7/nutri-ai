# API Layer

API клиент на основе OpenAPI схемы, автогенерация через Orval.

## Структура

```
src/shared/api/
├── schema.yml         # OpenAPI спецификация
├── api-instance.ts    # Axios instance с credentials
├── index.ts           # Публичные экспорты
└── generated/         # Автогенерация (не редактировать)
```

## Флоу работы

### 1. Редактируешь схему
Обновляешь `schema.yml` — добавляешь эндпоинты, модели.

### 2. Генерируешь клиент
```bash
npm run generate:api
```
Orval создаст React Query хуки для всех эндпоинтов.

### 3. Используешь хуки
```tsx
import { api } from '@/shared/api';

// GET запрос
const { data, isLoading } = api.useGetCalendar({ month: '2025-10' });

// POST мутация
const { mutate } = api.usePostDayDateMeals();
mutate({ date: '2025-10-20', data: { type: 'breakfast', totalKcal: 350 } });
```

## Конфигурация

- **Базовый URL**: клиент → `/api`, сервер → `BASE_API_URL/api`
- **Credentials**: `withCredentials: true` для cookie-based auth
- **Доступ в браузере**: `window.api` для дебага

## Полезные ссылки

- [Orval Docs](https://orval.dev)
- [React Query Docs](https://tanstack.com/query/latest)
