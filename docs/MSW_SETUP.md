# MSW (Mock Service Worker) Setup

## Обзор

MSW перехватывает API запросы в браузере и возвращает mock данные, позволяя разрабатывать frontend без backend.

**Как работает:**

```
Browser Request → Service Worker → MSW Handlers → Mock Response (faker data)
```

Mock handlers **автоматически генерируются** Orval из OpenAPI спецификации.

---

## Конфигурация

### Переменные окружения (.env)

```bash
# Mock mode (development) - MSW перехватывает запросы
NEXT_PUBLIC_USE_MOCK_API=true

# Production mode - запросы идут на real API
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_BASE_URL=https://your-api.com/api
```

### Два режима работы

| Режим          | USE_MOCK_API | Описание                                                                     |
| -------------- | ------------ | ---------------------------------------------------------------------------- |
| **Mock**       | `true`       | Все запросы перехватываются MSW, возвращаются faker данные, backend не нужен |
| **Production** | `false`      | MSW выключен, запросы идут на real API, нужен backend                        |

---

## Файловая структура

```
src/shared/
├── api/generated/
│   └── nutriAIFoodCalorieTrackerAPI.ts  # Auto-generated API + mock handlers
└── lib/msw/
    ├── browser.ts                        # MSW worker setup
    ├── init-msw.ts                       # MSW initialization
    └── msw-provider.tsx                  # React provider

public/
└── mockServiceWorker.js                  # MSW service worker script
```

---

## Использование

### Development с моками

1. Убедись `.env` содержит: `NEXT_PUBLIC_USE_MOCK_API=true`
2. Запусти: `npm run dev`
3. Проверь консоль:
   ```
   🔧 Mock API mode enabled
   ✅ MSW started successfully
   [MSW] Mocking enabled.
   ```
4. Все API запросы возвращают mock данные

### Переключение на Real API

1. Обнови `.env`:
   ```bash
   NEXT_PUBLIC_USE_MOCK_API=false
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api
   ```
2. Перезапусти dev сервер
3. Убедись backend запущен

---

## Mock Handlers

Mock handlers автоматически генерируются при запуске:

```bash
npm run generate:api
```

Orval создает:

- API типы и React Query hooks
- Mock response generators (faker)
- MSW handlers для всех endpoints

**Доступные handlers** (в `nutriAIFoodCalorieTrackerAPI.ts`):

```typescript
export const getNutriAIFoodCalorieTrackerAPIMock = () => [
  getPostAuthSignupMockHandler(),
  getPostAuthLoginMockHandler(),
  getGetCalendarMockHandler(),
  getGetDayDateMockHandler(),
  // ... все endpoints
];
```

---

## Debugging

### Проверка статуса MSW

**Консоль с моками:**

```
🔧 Mock API mode enabled
✅ MSW started successfully
[MSW] POST /auth/login (200 OK)
```

**Консоль без моков:**

```
📡 Using real API: http://localhost:3333/api
```

### Типичные проблемы

**"Failed to fetch mockServiceWorker.js"**

```bash
npx msw init public/
```

**MSW не перехватывает запросы**

- Проверь `.env`: `NEXT_PUBLIC_USE_MOCK_API=true`
- Hard refresh: `Cmd+Shift+R` (Mac) или `Ctrl+Shift+R` (Windows)
- Перезапусти dev сервер

**Build fails with MSW error**

- Используй динамические импорты (как в `browser.ts`)
- Не импортируй MSW напрямую

### Инспекция mock данных

MSW логирует все перехваченные запросы:

```
[MSW] POST /auth/login (200 OK)
```

Смотри Network tab в DevTools для просмотра mock ответов.

---

## Регенерация моков

При изменении API спецификации:

1. Обнови `src/shared/api/schema.yml`
2. Запусти: `npm run generate:api`
3. Новые моки автоматически применяются

---

## Production

В production:

- Установи `NEXT_PUBLIC_USE_MOCK_API=false`
- MSW полностью выключен
- Нет performance impact
- MSW код не включается в bundle

---

## Ресурсы

- [MSW Documentation](https://mswjs.io/)
- [Orval Documentation](https://orval.dev/)
