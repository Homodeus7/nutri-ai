# Billing & Payments Specification

## Overview

Система биллинга для Nutri AI на основе токенов OpenAI с оплатой через NOWPayments (криптовалюта).

---

## Бизнес-логика

### Модель токенов

| Параметр | Значение |
|----------|----------|
| Единица измерения | OpenAI API tokens (input + output) |
| Расчёт стоимости | Динамический — реальное потребление API |
| Срок действия | Бессрочные |
| При нулевом балансе | Жёсткая блокировка AI-функций |
| Overdraft | Разрешён для завершения запроса (если баланс был > 0) |

### Бесплатный лимит

- Ежемесячное начисление бесплатных токенов
- Не накапливаются (reset каждый месяц)
- Сгорают при наличии активной подписки (подписка имеет свой лимит)

### Модель монетизации

```
┌─────────────────────────────────────────────────────────────┐
│                      Пользователь                           │
├─────────────────────────────────────────────────────────────┤
│  Free tier          │  Token Pack        │  Subscription    │
│  (ежемесячно)       │  (разовая покупка) │  (рекуррентно)   │
├─────────────────────┴───────────────────┴──────────────────┤
│  ⚠️ Пакеты и подписка ВЗАИМОИСКЛЮЧАЮЩИЕ                     │
│  - Есть подписка → пакеты недоступны                        │
│  - Нет подписки → можно купить пакет                        │
└─────────────────────────────────────────────────────────────┘
```

### Подписка

- **Один уровень**: Premium
- **Включает**: фиксированный лимит токенов в месяц
- **Дополнительные фичи**: нет (только токены)
- **Оплата**: рекуррентная через NOWPayments
- **При отмене**: доступ до конца оплаченного периода

### Ценообразование моделей

Единая цена для всех моделей OpenAI (усреднённая). Это упрощает UX и биллинг.

---

## Платежи (NOWPayments)

### Режим интеграции

- **Payment API** — генерация адреса кошелька, QR-код в нашем UI
- **Валюты**: только stablecoins (USDT, USDC)
- **Рекуррентные платежи**: да, для подписки

### Обработка платежей

| Статус | Действие |
|--------|----------|
| `finished` | Зачислить 100% токенов |
| `partially_paid` | Зачислить пропорционально (80% оплаты = 80% токенов) |
| `expired` | Отменить, уведомить пользователя |
| `failed` | Логировать, пометить для разбора |

### Webhook flow

```
NOWPayments → POST /api/payments/webhook
           → Verify IPN signature
           → Update payment status
           → Credit tokens (if applicable)
           → Send notification (if critical)
```

---

## Защита от злоупотреблений

### Rate limiting

- AI-запросы: N запросов в минуту/час
- Лимиты зависят от статуса (free/paid)

### Верификация

- Email подтверждение обязательно для AI-функций
- Блокировка AI для неподтверждённых аккаунтов

---

## UI/UX

### Баланс токенов

- Отображается на странице профиля (не в header)
- При низком балансе — предупреждение перед AI-действием

### История транзакций

- Полная история с фильтрацией по типу/дате
- Экспорт (CSV/JSON)
- Типы: пополнение, списание, начисление бесплатных, коррекция

### Уведомления

Только критичные:
- Закончились токены
- Подписка истекает/истекла
- Неудачный рекуррентный платёж

---

## API Schemas

### User (расширение существующей схемы)

```yaml
User:
  # ... existing fields ...
  properties:
    tokenBalance:
      type: integer
      description: "Текущий баланс токенов (может быть отрицательным)"
    freeTokensRemaining:
      type: integer
      description: "Остаток бесплатных токенов в этом месяце"
    freeTokensResetAt:
      type: string
      format: date-time
      description: "Дата следующего начисления бесплатных токенов"
    subscriptionId:
      type: string
      format: uuid
      nullable: true
    emailVerified:
      type: boolean
      default: false
```

### Subscription

```yaml
Subscription:
  type: object
  required:
    - id
    - userId
    - planId
    - status
    - currentPeriodStart
    - currentPeriodEnd
    - createdAt
  properties:
    id:
      type: string
      format: uuid
    userId:
      type: string
      format: uuid
    planId:
      type: string
      format: uuid
    status:
      type: string
      enum: [active, canceled, past_due, expired]
    currentPeriodStart:
      type: string
      format: date-time
    currentPeriodEnd:
      type: string
      format: date-time
    canceledAt:
      type: string
      format: date-time
      nullable: true
    cancelReason:
      type: string
      nullable: true
    nowpaymentsSubscriptionId:
      type: string
      nullable: true
      description: "ID подписки в NOWPayments"
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

### SubscriptionPlan

```yaml
SubscriptionPlan:
  type: object
  required:
    - id
    - name
    - priceUsd
    - tokensIncluded
    - billingPeriod
    - isActive
  properties:
    id:
      type: string
      format: uuid
    name:
      type: string
      example: "Premium"
    description:
      type: string
    priceUsd:
      type: number
      format: float
      example: 9.99
    tokensIncluded:
      type: integer
      example: 1000000
      description: "Количество токенов в месяц"
    billingPeriod:
      type: string
      enum: [monthly, yearly]
    isActive:
      type: boolean
      default: true
      description: "Доступен для покупки"
    sortOrder:
      type: integer
      default: 0
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

### TokenPackage

```yaml
TokenPackage:
  type: object
  required:
    - id
    - name
    - priceUsd
    - tokensAmount
    - isActive
  properties:
    id:
      type: string
      format: uuid
    name:
      type: string
      example: "Starter Pack"
    description:
      type: string
    priceUsd:
      type: number
      format: float
      example: 4.99
    tokensAmount:
      type: integer
      example: 500000
    bonusTokens:
      type: integer
      default: 0
      description: "Бонусные токены (если есть)"
    isActive:
      type: boolean
      default: true
    sortOrder:
      type: integer
      default: 0
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

### Payment

```yaml
Payment:
  type: object
  required:
    - id
    - userId
    - type
    - amountUsd
    - status
    - createdAt
  properties:
    id:
      type: string
      format: uuid
    userId:
      type: string
      format: uuid
    type:
      type: string
      enum: [subscription, package]
    subscriptionId:
      type: string
      format: uuid
      nullable: true
    packageId:
      type: string
      format: uuid
      nullable: true
    amountUsd:
      type: number
      format: float
      description: "Сумма в USD"
    amountCrypto:
      type: number
      format: float
      nullable: true
    cryptoCurrency:
      type: string
      enum: [USDT, USDC]
      nullable: true
    status:
      type: string
      enum: [pending, confirming, confirmed, finished, partially_paid, expired, failed, refunded]
    tokensAwarded:
      type: integer
      nullable: true
      description: "Сколько токенов начислено"
    nowpaymentsPaymentId:
      type: string
      nullable: true
    nowpaymentsInvoiceId:
      type: string
      nullable: true
    payAddress:
      type: string
      nullable: true
      description: "Адрес для оплаты"
    expiresAt:
      type: string
      format: date-time
      nullable: true
    paidAt:
      type: string
      format: date-time
      nullable: true
    metadata:
      type: object
      description: "Дополнительные данные от NOWPayments"
    createdAt:
      type: string
      format: date-time
    updatedAt:
      type: string
      format: date-time
```

### TokenTransaction

```yaml
TokenTransaction:
  type: object
  required:
    - id
    - userId
    - type
    - amount
    - balanceAfter
    - createdAt
  properties:
    id:
      type: string
      format: uuid
    userId:
      type: string
      format: uuid
    type:
      type: string
      enum: [purchase, subscription_credit, free_monthly, usage, admin_adjustment, refund]
    amount:
      type: integer
      description: "Положительное = пополнение, отрицательное = списание"
    balanceAfter:
      type: integer
      description: "Баланс после транзакции"
    description:
      type: string
      nullable: true
      example: "AI parse: овсянка 50г с бананом"
    relatedPaymentId:
      type: string
      format: uuid
      nullable: true
    relatedMealId:
      type: string
      format: uuid
      nullable: true
      description: "Если списание за AI-парсинг"
    aiRequestTokens:
      type: object
      nullable: true
      description: "Детали использования OpenAI"
      properties:
        inputTokens:
          type: integer
        outputTokens:
          type: integer
        model:
          type: string
    createdAt:
      type: string
      format: date-time
```

### BillingSettings (для админки)

```yaml
BillingSettings:
  type: object
  properties:
    freeMonthlyTokens:
      type: integer
      example: 50000
      description: "Бесплатные токены в месяц"
    tokenPriceUsd:
      type: number
      format: float
      example: 0.00001
      description: "Цена за 1 токен в USD (для расчёта пакетов)"
    minBalanceForAi:
      type: integer
      default: 0
      description: "Минимальный баланс для AI-запросов"
    maxOverdraft:
      type: integer
      default: 10000
      description: "Максимальный разрешённый минус"
    aiRateLimitFree:
      type: integer
      example: 10
      description: "Лимит AI-запросов в час для free tier"
    aiRateLimitPaid:
      type: integer
      example: 100
      description: "Лимит AI-запросов в час для paid"
```

---

## API Endpoints

### Billing

```yaml
/user/billing:
  get:
    summary: Получить биллинг информацию пользователя
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                tokenBalance:
                  type: integer
                freeTokensRemaining:
                  type: integer
                freeTokensResetAt:
                  type: string
                  format: date-time
                subscription:
                  $ref: "#/components/schemas/Subscription"
                  nullable: true
                canUseAi:
                  type: boolean
                aiRequestsRemaining:
                  type: integer
                  description: "Оставшиеся запросы до rate limit"

/user/billing/transactions:
  get:
    summary: История транзакций токенов
    parameters:
      - name: type
        in: query
        schema:
          type: string
          enum: [purchase, subscription_credit, free_monthly, usage, admin_adjustment, refund]
      - name: from
        in: query
        schema:
          type: string
          format: date
      - name: to
        in: query
        schema:
          type: string
          format: date
      - name: limit
        in: query
        schema:
          type: integer
          default: 50
      - name: offset
        in: query
        schema:
          type: integer
          default: 0
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                transactions:
                  type: array
                  items:
                    $ref: "#/components/schemas/TokenTransaction"
                total:
                  type: integer

/user/billing/transactions/export:
  get:
    summary: Экспорт истории транзакций
    parameters:
      - name: format
        in: query
        required: true
        schema:
          type: string
          enum: [csv, json]
      - name: from
        in: query
        schema:
          type: string
          format: date
      - name: to
        in: query
        schema:
          type: string
          format: date
```

### Subscription

```yaml
/subscription/plans:
  get:
    summary: Получить доступные планы подписки
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                plans:
                  type: array
                  items:
                    $ref: "#/components/schemas/SubscriptionPlan"

/subscription:
  post:
    summary: Создать подписку (инициировать платёж)
    requestBody:
      content:
        application/json:
          schema:
            type: object
            required:
              - planId
              - currency
            properties:
              planId:
                type: string
                format: uuid
              currency:
                type: string
                enum: [USDT, USDC]
    responses:
      201:
        content:
          application/json:
            schema:
              type: object
              properties:
                payment:
                  $ref: "#/components/schemas/Payment"
                payAddress:
                  type: string
                payAmount:
                  type: number
                qrCodeUrl:
                  type: string
                expiresAt:
                  type: string
                  format: date-time

  delete:
    summary: Отменить подписку
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                subscription:
                  $ref: "#/components/schemas/Subscription"
                message:
                  type: string
                  example: "Подписка отменена. Доступ сохранится до 2025-02-15"
```

### Token Packages

```yaml
/packages:
  get:
    summary: Получить доступные пакеты токенов
    description: Доступно только для пользователей без активной подписки
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                packages:
                  type: array
                  items:
                    $ref: "#/components/schemas/TokenPackage"
                available:
                  type: boolean
                  description: "false если есть активная подписка"

/packages/{id}/purchase:
  post:
    summary: Купить пакет токенов
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
    requestBody:
      content:
        application/json:
          schema:
            type: object
            required:
              - currency
            properties:
              currency:
                type: string
                enum: [USDT, USDC]
    responses:
      201:
        content:
          application/json:
            schema:
              type: object
              properties:
                payment:
                  $ref: "#/components/schemas/Payment"
                payAddress:
                  type: string
                payAmount:
                  type: number
                qrCodeUrl:
                  type: string
                expiresAt:
                  type: string
                  format: date-time
      400:
        description: Есть активная подписка
```

### Payments

```yaml
/payments/{id}:
  get:
    summary: Получить статус платежа
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
    responses:
      200:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Payment"

/payments/{id}/check:
  post:
    summary: Принудительно проверить статус платежа в NOWPayments
    parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
    responses:
      200:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/Payment"

/payments/webhook:
  post:
    summary: Webhook от NOWPayments (IPN)
    description: Внутренний endpoint для обработки callback'ов
    security: []  # Верификация через IPN signature
```

### Admin Endpoints

```yaml
/admin/billing/settings:
  get:
    summary: Получить настройки биллинга
    security:
      - bearerAuth: []
    responses:
      200:
        content:
          application/json:
            schema:
              $ref: "#/components/schemas/BillingSettings"

  put:
    summary: Обновить настройки биллинга
    requestBody:
      content:
        application/json:
          schema:
            $ref: "#/components/schemas/BillingSettings"

/admin/subscription-plans:
  get:
    summary: Список всех планов (включая неактивные)
  post:
    summary: Создать план подписки

/admin/subscription-plans/{id}:
  put:
    summary: Обновить план
  delete:
    summary: Деактивировать план

/admin/packages:
  get:
    summary: Список всех пакетов
  post:
    summary: Создать пакет

/admin/packages/{id}:
  put:
    summary: Обновить пакет
  delete:
    summary: Деактивировать пакет

/admin/users/{id}/tokens:
  post:
    summary: Ручная корректировка баланса
    requestBody:
      content:
        application/json:
          schema:
            type: object
            required:
              - amount
              - reason
            properties:
              amount:
                type: integer
                description: "Положительное или отрицательное значение"
              reason:
                type: string

/admin/payments:
  get:
    summary: Список всех платежей с фильтрацией
    parameters:
      - name: status
        in: query
        schema:
          type: string
      - name: userId
        in: query
        schema:
          type: string
          format: uuid
      - name: from
        in: query
        schema:
          type: string
          format: date
      - name: to
        in: query
        schema:
          type: string
          format: date

/admin/stats/billing:
  get:
    summary: Статистика биллинга
    responses:
      200:
        content:
          application/json:
            schema:
              type: object
              properties:
                totalRevenue:
                  type: number
                activeSubscriptions:
                  type: integer
                tokensConsumed:
                  type: integer
                tokensAwarded:
                  type: integer
```

---

## Изменения в существующих endpoints

### AI Parse

```yaml
/ai/parse:
  post:
    # ... existing ...
    responses:
      201:
        # ... existing response ...
        # Добавить в ответ:
        content:
          application/json:
            schema:
              allOf:
                - $ref: "#/components/schemas/AiParseResponse"
                - type: object
                  properties:
                    tokensUsed:
                      type: integer
                      description: "Потрачено токенов на этот запрос"
                    tokenBalanceAfter:
                      type: integer
      402:
        description: Недостаточно токенов
        content:
          application/json:
            schema:
              type: object
              properties:
                error:
                  type: string
                  example: "insufficient_tokens"
                tokenBalance:
                  type: integer
                requiredMinimum:
                  type: integer
      429:
        description: Rate limit exceeded
```

---

## Database Schema (Prisma-like)

```prisma
model Subscription {
  id                       String   @id @default(uuid())
  userId                   String   @unique
  planId                   String
  status                   SubscriptionStatus
  currentPeriodStart       DateTime
  currentPeriodEnd         DateTime
  canceledAt               DateTime?
  cancelReason             String?
  nowpaymentsSubscriptionId String?
  createdAt                DateTime @default(now())
  updatedAt                DateTime @updatedAt

  user    User             @relation(fields: [userId], references: [id])
  plan    SubscriptionPlan @relation(fields: [planId], references: [id])
}

model SubscriptionPlan {
  id             String   @id @default(uuid())
  name           String
  description    String?
  priceUsd       Float
  tokensIncluded Int
  billingPeriod  BillingPeriod
  isActive       Boolean  @default(true)
  sortOrder      Int      @default(0)
  createdAt      DateTime @default(now())
  updatedAt      DateTime @updatedAt

  subscriptions Subscription[]
}

model TokenPackage {
  id          String   @id @default(uuid())
  name        String
  description String?
  priceUsd    Float
  tokensAmount Int
  bonusTokens Int      @default(0)
  isActive    Boolean  @default(true)
  sortOrder   Int      @default(0)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  payments Payment[]
}

model Payment {
  id                    String        @id @default(uuid())
  userId                String
  type                  PaymentType
  subscriptionId        String?
  packageId             String?
  amountUsd             Float
  amountCrypto          Float?
  cryptoCurrency        CryptoCurrency?
  status                PaymentStatus
  tokensAwarded         Int?
  nowpaymentsPaymentId  String?
  nowpaymentsInvoiceId  String?
  payAddress            String?
  expiresAt             DateTime?
  paidAt                DateTime?
  metadata              Json?
  createdAt             DateTime      @default(now())
  updatedAt             DateTime      @updatedAt

  user    User          @relation(fields: [userId], references: [id])
  package TokenPackage? @relation(fields: [packageId], references: [id])
}

model TokenTransaction {
  id               String          @id @default(uuid())
  userId           String
  type             TransactionType
  amount           Int
  balanceAfter     Int
  description      String?
  relatedPaymentId String?
  relatedMealId    String?
  aiRequestTokens  Json?
  createdAt        DateTime        @default(now())

  user User @relation(fields: [userId], references: [id])

  @@index([userId, createdAt])
  @@index([type])
}

enum SubscriptionStatus {
  active
  canceled
  past_due
  expired
}

enum BillingPeriod {
  monthly
  yearly
}

enum PaymentType {
  subscription
  package
}

enum PaymentStatus {
  pending
  confirming
  confirmed
  finished
  partially_paid
  expired
  failed
  refunded
}

enum CryptoCurrency {
  USDT
  USDC
}

enum TransactionType {
  purchase
  subscription_credit
  free_monthly
  usage
  admin_adjustment
  refund
}
```

---

## Не включено в первую версию

- [ ] Промокоды
- [ ] Реферальная программа
- [ ] Множественные уровни подписки
- [ ] Дополнительные фичи для подписчиков
- [ ] Мультипликаторы цен для разных моделей
- [ ] Расширенная защита от мультиаккаунтов

---

## Open Questions

1. **Конкретные значения**: сколько бесплатных токенов в месяц? Цена подписки? Размеры пакетов?
2. **NOWPayments plan**: какой тариф (комиссии, лимиты)?
3. **Email провайдер**: для критичных уведомлений
4. **Время жизни платежа**: сколько ждать оплату (обычно 20-60 минут для крипты)?
