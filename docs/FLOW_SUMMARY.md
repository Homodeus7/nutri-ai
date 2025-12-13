# Flow Summary - Логика работы приложения

## Общая концепция

Приложение для отслеживания калорий с AI-парсингом приёмов пищи. Ключевые принципы:

- Всегда ищем в базе ПЕРЕД обращением к AI
- AI результаты автоматически кэшируются как новые продукты
- UsageCount определяет популярность и приоритет в поиске
- FoodItem может ссылаться на Product ИЛИ Recipe ИЛИ быть standalone

---

## 1. Работа с Продуктами

### 1.1 Поиск продукта (текстовый)

```
User: вводит "гречка"
  ↓
Backend: SELECT * FROM products
  WHERE normalizedName LIKE '%гречка%'
  ORDER BY isVerified DESC, usageCount DESC, createdBy = currentUser
  LIMIT 10
  ↓
Response: список продуктов
```

### 1.2 Сканирование штрихкода

```
User: сканирует штрихкод
  ↓
Backend:
  1. Ищет в БД по barcode
  2. Если найден → return product
  3. Если НЕ найден:
     → OpenFoodFacts API
     → сохранить в БД (source='openfoodfacts')
     → return product
  4. Если нигде нет → 404
  ↓
Response: product
```

### 1.3 Ручное создание

```
User: заполняет форму (название, КБЖУ)
  ↓
Backend:
  1. Нормализует name → normalizedName (lowercase, transliterate)
  2. Создаёт product (source='manual', isVerified=false)
  ↓
Response: новый product
```

---

## 2. AI Parse - Разбор приёма пищи

### Полный цикл AI Parse

```
User: "завтрак: овсянка 50г с бананом"
  ↓
STEP 1: Claude API - разбор текста
  → items: [
      { parsedName: "овсянка", quantity: 50, unit: "g" },
      { parsedName: "банан", quantity: 100, unit: "g" }
    ]
  ↓
STEP 2: Поиск каждого item в products
  FOR EACH item:
    SELECT * FROM products
    WHERE normalizedName LIKE '%{parsedName}%'
    ORDER BY usageCount DESC, isVerified DESC
    LIMIT 3
  ↓
  Результат:
  - овсянка → найдено 2 варианта (suggestions)
  - банан → НЕ найдено (suggestions = [])
  ↓
STEP 3: Поиск в рецептах пользователя
  FOR EACH item:
    SELECT * FROM recipes
    WHERE userId = current AND normalizedName LIKE '%{parsedName}%'
    LIMIT 3
  ↓
STEP 4: AI Fallback для пустых результатов
  FOR items WHERE suggestions.length == 0:
    Claude API → КБЖУ на 100г
    → aiFallback: { kcalPer100g, proteinPer100g, ... }
  ↓
STEP 5: Формирование ответа
  Response: {
    items: [
      {
        rawText: "овсянка 50г",
        parsedName: "овсянка",
        quantity: 50,
        productSuggestions: [...],  // 2 варианта
        recipeSuggestions: [],
        aiFallback: null
      },
      {
        rawText: "банан",
        parsedName: "банан",
        quantity: 100,
        productSuggestions: [],
        recipeSuggestions: [],
        aiFallback: { kcalPer100g: 89, ... }  // AI данные
      }
    ],
    needsReview: ["банан"]  // items с низким confidence
  }
```

---

## 3. Создание Meal из AI Parse

```
Frontend: пользователь выбрал варианты
  - овсянка → выбрал "Овсянка хлопья" (productId: uuid-1)
  - банан → подтвердил AI fallback
  ↓
POST /day/{date}/meals
{
  type: "breakfast",
  items: [
    { productId: "uuid-1", quantity: 50, unit: "g" },
    {
      productId: null,  // ← нет в базе
      name: "Банан",
      quantity: 100,
      _aiFallback: { kcalPer100g: 89, ... }  // для создания
    }
  ]
}
  ↓
Backend:
  FOR EACH item:

    IF productId exists:
      - Fetch product
      - Calculate: kcal = product.kcalPer100g * quantity / 100

    IF productId = null AND _aiFallback exists:
      - CREATE new product (source='ai', isVerified=false)
      - Get new productId
      - Calculate kcal
  ↓
  1. CREATE meal (totalKcal = SUM items)
  2. CREATE food_items (mealId, productId, ...)
  3. UPDATE day_entry (consumedKcal += totalKcal)
  4. UPDATE products (usageCount++, lastUsedAt)
  ↓
Response: meal with items
```

**Ключевой момент:** AI fallback автоматически создаёт новый продукт → следующий раз он будет в suggestions

---

## 4. Работа с Рецептами

### 4.1 Создание рецепта

```
User: создаёт рецепт "Овсянка на завтрак"
  ↓
POST /recipes
{
  name: "Овсянка на завтрак",
  servings: 1,
  ingredients: [
    { productId: "uuid-ovsyanka", quantity: 50, unit: "g" },
    { productId: "uuid-moloko", quantity: 200, unit: "ml" },
    { productId: "uuid-banana", quantity: 100, unit: "g" }
  ]
}
  ↓
Backend:
  1. Validate: все productId существуют
  2. Fetch products
  3. Calculate для каждого ингредиента:
     kcal = product.kcalPer100g * quantity / 100
  4. Calculate totals:
     totalKcal = SUM(ingredients.kcal)
     kcalPerServing = totalKcal / servings
  5. INSERT recipe
  6. INSERT recipe_ingredients
  7. Normalize name
  ↓
Response: recipe with ingredients
```

### 4.2 Добавление рецепта в Meal

```
User: добавляет рецепт (1.5 порции)
  ↓
POST /recipes/{id}/add-to-meal
{
  date: "2025-12-03",
  mealType: "lunch",
  servings: 1.5
}
  ↓
Backend:
  1. Fetch recipe
  2. Check ownership (userId match OR isPublic=true)
  3. Calculate:
     kcal = recipe.kcalPerServing * servings (1.5)
  4. CREATE meal
  5. CREATE food_item:
     - recipeId = recipe.id  ← важно!
     - productId = null
     - quantity = servings
     - unit = "порция"
  6. UPDATE recipe (usageCount++, lastUsedAt)
  7. UPDATE day_entry (consumedKcal += kcal)
  ↓
Response: meal with food_item (recipeId present)
```

---

## 5. State Machine для FoodItem

FoodItem может быть в одном из трёх состояний:

```
1. WITH_PRODUCT:
   - productId != null
   - recipeId = null
   - КБЖУ рассчитываются из product
   Пример: "Овсянка хлопья, 50г"

2. WITH_RECIPE:
   - productId = null
   - recipeId != null
   - КБЖУ рассчитываются из recipe
   Пример: "Овсянка на завтрак, 1.5 порции"

3. STANDALONE (legacy/import):
   - productId = null
   - recipeId = null
   - КБЖУ хранятся напрямую в item
   - source = "ai" | "manual"
   Пример: одноразовый AI fallback без сохранения продукта
```

---

## 6. Приоритеты и Оптимизация

### Приоритет в поиске продуктов:

```sql
ORDER BY
  isVerified DESC,        -- 1. Проверенные
  usageCount DESC,        -- 2. Популярные (естественная популярность)
  createdBy = currentUser,-- 3. Свои продукты
  created_at DESC         -- 4. Новые
```

### Match Score для AI Parse:

```
Exact match (p === q)           → 1.0
Starts with (p.startsWith(q))   → 0.9
Contains (p.includes(q))        → 0.8
Levenshtein distance            → 1 - (distance / maxLen)
```

### Автоматическое кэширование:

- AI fallback → создаётся product (source='ai')
- Следующий раз → находится в suggestions
- UsageCount растёт → поднимается в приоритете

---

## 7. Error Handling

### AI Parse timeout/error:

```
Response:
{
  error: "ai_timeout",
  fallback: {
    items: [{
      rawText: "весь текст пользователя",
      parsedName: null,
      note: "Распарси вручную"
    }]
  }
}
→ Frontend показывает форму ручного ввода
```

### Missing product в рецепте:

```
IF productId not found:
  - Skip ingredient
  - Log warning
  - Recalculate totals без него
  - recipe.hasMissingIngredients = true
```

---

## 8. OpenFoodFacts Integration

```
Barcode не найден в БД
  ↓
GET https://world.openfoodfacts.org/api/v2/product/{barcode}.json
  ↓
IF found:
  - Map nutriments → наша схема
  - Save to DB (source='openfoodfacts', isVerified=true)
  - Return product
IF not found:
  → 404
```

---

## Итоговая логика приложения

```
1. User вводит приём пищи (текст/сканирование)
   ↓
2. AI Parse → разбор на items
   ↓
3. Для каждого item:
   a. Ищем в products (prioritized search)
   b. Ищем в user recipes
   c. Если не найдено → AI fallback (КБЖУ)
   ↓
4. User выбирает варианты / подтверждает AI
   ↓
5. Backend создаёт:
   - Новые products (из AI fallback, source='ai')
   - Meal (totalKcal)
   - Food_items (links to products/recipes)
   - Updates day_entry (consumedKcal)
   - Updates usageCount (популярность)
   ↓
6. Следующий раз те же продукты:
   → находятся в suggestions (не нужен AI)
   → сортируются выше (usageCount вырос)
```

**Результат:** Система самообучается через использование, AI нужен всё реже.
