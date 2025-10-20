# Nutri AI Food Calorie Tracker App — Минимальная техническая документация

> Краткая и технически ёмкая спецификация для разработки фронтенда и бэкенда.

---

## 1. Цель проекта

Приложение для учёта и подсчёта калорий с возможностью ввода приёма пищи через ИИ и отслеживания прогресса по календарю и целям питания.

## 2. Основные пользовательские сценарии

1. Просмотр календаря и выбор дня для ввода/редактирования приёма пищи.
2. Настройка целевых параметров (диета/план питания, калорийность цели).
3. Добавление приёма пищи: вручную или через ИИ (описание на естественном языке → распарсенные позиции и калории).
4. Просмотр статистики: круговой график заполнения цели (0–100%).

## 3. Страницы / экраны

### 3.1 Главная — Календарь

- Отображает месяц.
- Выбор дня → переход на экран заполнения выбранной даты.
- Краткий индика тор: % выполненной цели на день (используется для быстрого просмотра).

### 3.2 Экран заполнения дня

- Список приёмов пищи за выбранную дату (утро/обед/ужин/перекусы).
- Кнопка "Добавить приём" → выбор: вручную / через ИИ.
- Итог: потреблённые калории / целевая калорийность / круговой график 0–100%.

### 3.3 Настройки плана питания

- Выбор/создание диеты или плана (целевая калорийность, соотношение Б/Ж/У при необходимости).
- Возможность применить план к пользователю или к отдельной дате.

### 3.4 Добавление еды через ИИ

- Поле ввода текста (например: "завтрак: овсянка 50 г с бананом и мёдом, кофе с молоком").
- Отправка на AI API → отображение распарсенного результата (позиций с весами и калориями) для подтверждения/редактирования.

## 4. AI-интеграция (высокоуровнево)

- **Назначение:** преобразовать свободный текст о приёме пищи в структуру `FoodItem[]` с оценкой калорий и макронутриентов.
- **Вход:** { userId, date, tz, text }
- **Выход:** { parsedItems: [{ name, qty, unit, kcal, protein, fat, carbs, confidence }], totalKcal, warnings }
- **Рекомендации:**
  - Сделать синхронный HTTP POST `/ai/parse-meal` с тайм-аутом (на клиенте ожидать ответ и показывать результат).
  - Логировать исходные запросы и ответы (для улучшения модели и дебага).
  - Валидировать `kcal` и округлять до целого; если confidence < порог — пометить как требующее проверки.

## 5. Бэкенд — сущности (описание полей)

> В полях указано: `тип` — краткое описание (required/optional)

### 5.1 User

- `id` — string (UUID) — идентификатор. (required)
- `email` — string — логин/почта. (required)
- `passwordHash` — string — хеш пароля. (required)
- `displayName` — string — отображаемое имя. (optional)
- `timezone` — string — зона пользователя (IANA), для корректного отображения дат. (optional)
- `dailyKcalGoal` — integer — цель калорий в день (может приходить из плана). (optional)
- `createdAt` — datetime. (required)

### 5.2 DayEntry

- `id` — string (UUID). (required)
- `userId` — string (FK → User.id). (required)
- `date` — date (YYYY-MM-DD) — дата дня в зоне пользователя. (required)
- `targetKcal` — integer — цель на этот день (если переопределена). (optional)
- `consumedKcal` — integer — суммарно по всем meal.totalKcal. (computed / denormalized). (optional)
- `notes` — string. (optional)
- `createdAt`, `updatedAt` — datetime.

### 5.3 Meal

- `id` — string (UUID). (required)
- `dayEntryId` — string (FK → DayEntry.id). (required)
- `type` — enum [breakfast, lunch, dinner, snack, other]. (required)
- `time` — time (HH:MM) — время приёма. (optional)
- `name` — string — название приёма/блюда. (optional)
- `items` — array of FoodItem (see ниже) — детальные позиции. (optional)
- `totalKcal` — integer — сумма калорий по items (если items отсутствуют — может быть вручную). (required)
- `source` — enum [manual, ai] — откуда пришла запись. (required)
- `aiConfidence` — float (0..1) — если source = ai. (optional)
- `createdAt`, `updatedAt` — datetime.

### 5.4 FoodItem

- `id` — string (UUID).
- `mealId` — string (FK → Meal.id).
- `name` — string — название продукта/блюда. (required)
- `quantity` — float — количество (число). (required)
- `unit` — string — единица измерения (g, ml, piece, tbsp и т.п.). (required)
- `kcal` — integer — калории для указанного количества. (required)
- `protein` — float — грамм белка в этой позиции. (optional)
- `fat` — float — грамм жира. (optional)
- `carbs` — float — грамм углеводов. (optional)
- `source` — string — если продукт сопоставлен с базой данных продуктов. (optional)

### 5.5 DietPlan

- `id` — string (UUID).
- `userId` — string (FK) — может быть глобальным (null) или привязан к пользователю. (optional)
- `name` — string — название плана. (required)
- `targetKcal` — integer. (required)
- `macros` — object { proteinPct, fatPct, carbsPct } (sum may be 100). (optional)
- `description` — string. (optional)
- `createdAt`, `updatedAt` — datetime.

### 5.6 AiParseLog

- `id` — string (UUID).
- `userId` — string (optional).
- `requestText` — text — исходный ввод пользователя.
- `requestPayload` — json — дополнительные данные (date, tz).
- `responsePayload` — json — ответ ИИ.
- `responseTimeMs` — integer.
- `createdAt` — datetime.

## 6. API — минимальный набор конечных точек (REST)

- `POST /auth/signup` — регистрация.
- `POST /auth/login` — получить токен.
- `GET /calendar?month=YYYY-MM` — получить краткие данные по дням (consumedPercent, consumedKcal, targetKcal).
- `GET /day/:date` — получить DayEntry + meals + items для даты (YYYY-MM-DD).
- `POST /day/:date/meals` — создать meal (body: { type, time, name, items?, totalKcal?, source }).
- `PUT /meals/:id` — обновить meal.
- `DELETE /meals/:id` — удалить meal.
- `POST /ai/parse-meal` — проксирует/вызывает внешний AI для парсинга (body: { userId, date, text }).
- `GET /plans` — список доступных планов.
- `POST /plans/:id/apply?date=YYYY-MM-DD` — применить план к user/day.
- `GET /stats?from=YYYY-MM-DD&to=YYYY-MM-DD` — агрегированная статистика (суммы, средние, заполнение %).

## 7. Валидация и правила

- `kcal` — integer ≥ 0.
- `date` — строго в формате YYYY-MM-DD.
- `time` — HH:MM или nullable.
- При source = ai: если `aiConfidence` < 0.6 пометить как требующее подтверждения.
- Ограничение длины текста для AI-запроса (например, 2048 символов).

## 8. Безопасность и приватность

- Аутентификация: JWT или сессии; все API кроме `/auth` — защищены.
- Логи AI: хранить без персональных данных, либо шифровать при необходимости.
- Пользовательские данные — доступ только владельцу.

## 9. Мониторинг и метрики (минимум)

- Логи ошибок бэкенда и AI timeouts.
- Количество AI-запросов, среднее время ответа, % low-confidence.
- Наличие endpoint для админ-экспорта (csv) дневных данных при необходимости.

## 10. Нельзя забывать

- Поддерживать timezone пользователя при сохранении/отображении дат.
- Делать округление калорий до целого при отображении и хранить целое в базе.

---
