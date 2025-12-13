# Flow Documentation - Products & Recipes

## 1. Поиск/Создание Продуктов

### Flow A: Пользователь ищет продукт

```
GET /products/search?q=гречка

Backend Logic:
1. Поиск в БД по normalizedName (LIKE '%гречка%')
2. Сортировка:
   - verified = true (сначала)
   - usageCount DESC (популярные выше)
   - createdBy = currentUserId (свои выше)
3. Лимит 10 результатов

Response:
[
  { id, name, kcalPer100g, source, isVerified, usageCount }
]
```

### Flow B: Пользователь сканирует штрихкод

```
GET /products/barcode/4607065597009

Backend Logic:
1. Поиск в БД по barcode
2. Если найден → return product
3. Если НЕ найден:
   a. Вызвать OpenFoodFacts API
   b. Если найден → сохранить в БД (source='openfoodfacts')
   c. Если нет → return 404

Response:
{ id, name, kcalPer100g, barcode, brand, source }
```

### Flow C: Пользователь создает вручную

```
POST /products
{
  "name": "Гречка варёная",
  "kcalPer100g": 110,
  "proteinPer100g": 4.2,
  "fatPer100g": 1.1,
  "carbsPer100g": 21.3
}

Backend Logic:
1. Нормализация name → normalizedName
   - toLowerCase()
   - transliterate() если русский
   - trim()
2. Проверка дубликатов (опционально)
3. Сохранение:
   - source = 'manual'
   - createdBy = currentUserId
   - isVerified = false

Response:
{ id, name, kcalPer100g, ... }
```

---

## 2. AI Parse Flow

### Main Flow

```
POST /ai/parse-meal
{ "text": "завтрак: овсянка 50г с бананом" }

Backend Logic:

STEP 1: Разбор текста через Claude API
────────────────────────────────────────
Prompt:
"""
Распарси текст приёма пищи в JSON.
Верни массив items с полями:
- parsedName: название продукта (нормализованное)
- quantity: число
- unit: "g" | "ml" | "шт"
- rawText: исходный текст

Текст: "завтрак: овсянка 50г с бананом"
"""

Claude Response:
{
  "type": "breakfast",
  "items": [
    { "parsedName": "овсянка", "quantity": 50, "unit": "g", "rawText": "овсянка 50г" },
    { "parsedName": "банан", "quantity": 100, "unit": "g", "rawText": "банан" }
  ]
}


STEP 2: Поиск каждого item в базе
────────────────────────────────────────
For each item:
  1. SELECT * FROM products
     WHERE normalizedName LIKE '%{parsedName}%'
     ORDER BY usageCount DESC, isVerified DESC
     LIMIT 3

  2. Если найдено:
     → suggestions = [{ productId, name, kcalPer100g, matchScore }]

  3. Если НЕ найдено:
     → aiFallback = null (на этом этапе)


STEP 3: Поиск в рецептах пользователя
────────────────────────────────────────
For each item:
  SELECT * FROM recipes
  WHERE userId = currentUserId
    AND normalizedName LIKE '%{parsedName}%'
  ORDER BY usageCount DESC
  LIMIT 3

  Если найдено:
  → recipeSuggestions = [{ recipeId, name, kcalPerServing, matchScore }]


STEP 4: AI Fallback для пустых результатов
────────────────────────────────────────
For items where suggestions.length == 0:

  Вызвать Claude API повторно:
  """
  Для продукта "{parsedName}" верни КБЖУ на 100г в JSON:
  {
    "name": "...",
    "kcalPer100g": ...,
    "proteinPer100g": ...,
    "fatPer100g": ...,
    "carbsPer100g": ...,
    "confidence": 0.0-1.0
  }
  """

  → aiFallback = { ...response }


STEP 5: Формирование ответа
────────────────────────────────────────
Response:
{
  "parsed": {
    "type": "breakfast",
    "items": [
      {
        "rawText": "овсянка 50г",
        "parsedName": "овсянка",
        "quantity": 50,
        "unit": "g",
        "productSuggestions": [
          { "productId": "uuid-1", "name": "Овсянка хлопья", "kcalPer100g": 343, "matchScore": 0.95 },
          { "productId": "uuid-2", "name": "Овсяная каша", "kcalPer100g": 88, "matchScore": 0.7 }
        ],
        "recipeSuggestions": [],
        "aiFallback": null
      },
      {
        "rawText": "банан",
        "parsedName": "банан",
        "quantity": 100,
        "unit": "g",
        "productSuggestions": [],
        "recipeSuggestions": [],
        "aiFallback": {
          "name": "Банан",
          "kcalPer100g": 89,
          "proteinPer100g": 1.1,
          "fatPer100g": 0.3,
          "carbsPer100g": 22.8,
          "confidence": 0.9
        }
      }
    ]
  },
  "needsReview": ["банан"]  // items с aiFallback и confidence < 0.8
}
```

---

## 3. Создание Meal из AI Parse

### Frontend → Backend Flow

```
Frontend получил response от /ai/parse-meal

User Actions:
- Выбрал "Овсянка хлопья" (productId: uuid-1)
- Подтвердил "Банан" из aiFallback

Frontend отправляет:
POST /day/2025-12-03/meals
{
  "type": "breakfast",
  "time": "08:30",
  "source": "ai",
  "items": [
    {
      "productId": "uuid-1",
      "name": "Овсянка хлопья",
      "quantity": 50,
      "unit": "g"
      // kcal будет рассчитан на беке
    },
    {
      "productId": null,  // ← важно! нет в базе
      "name": "Банан",
      "quantity": 100,
      "unit": "g",
      "kcal": 89,  // из aiFallback
      "protein": 1.1,
      "fat": 0.3,
      "carbs": 22.8,
      "_aiFallback": {  // временное поле для создания продукта
        "kcalPer100g": 89,
        "proteinPer100g": 1.1,
        "fatPer100g": 0.3,
        "carbsPer100g": 22.8
      }
    }
  ]
}

Backend Logic:
────────────────────────────────────────

1. For each item:

   IF productId exists:
     - Fetch product from DB
     - Calculate: kcal = product.kcalPer100g * quantity / 100
     - Calculate: protein, fat, carbs аналогично

   IF productId is null AND _aiFallback exists:
     - Create new product:
       INSERT INTO products (
         name,
         normalizedName,
         kcalPer100g,
         proteinPer100g,
         fatPer100g,
         carbsPer100g,
         source = 'ai',
         createdBy = currentUserId,
         isVerified = false
       )
     - Get new productId
     - Calculate kcal based on quantity

2. Create meal:
   INSERT INTO meals (type, time, dayEntryId, source, totalKcal)
   totalKcal = SUM(items.kcal)

3. Create food_items:
   INSERT INTO food_items (mealId, productId, name, quantity, unit, kcal, ...)

4. Update day_entry:
   UPDATE day_entries
   SET consumedKcal = consumedKcal + meal.totalKcal

5. Update product usage:
   UPDATE products
   SET usageCount = usageCount + 1,
       lastUsedAt = NOW()
   WHERE id IN (...)

Response:
{ meal with items }
```

---

## 4. Создание Рецепта

```
POST /recipes
{
  "name": "Овсянка на завтрак",
  "servings": 1,
  "category": "breakfast",
  "ingredients": [
    { "productId": "uuid-ovsyanka", "quantity": 50, "unit": "g" },
    { "productId": "uuid-moloko", "quantity": 200, "unit": "ml" },
    { "productId": "uuid-banana", "quantity": 100, "unit": "g" }
  ]
}

Backend Logic:
────────────────────────────────────────

1. Validate:
   - Все productId существуют в БД
   - servings > 0

2. Fetch products:
   SELECT * FROM products WHERE id IN (...)

3. Calculate totals:
   For each ingredient:
     ingredient.kcal = product.kcalPer100g * quantity / 100
     ingredient.protein = product.proteinPer100g * quantity / 100
     ...

   recipe.totalKcal = SUM(ingredients.kcal)
   recipe.totalProtein = SUM(ingredients.protein)
   ...

   recipe.kcalPerServing = totalKcal / servings
   recipe.proteinPerServing = totalProtein / servings
   ...

4. Insert recipe:
   INSERT INTO recipes (userId, name, servings, totalKcal, kcalPerServing, ...)

5. Insert ingredients:
   INSERT INTO recipe_ingredients (recipeId, productId, quantity, kcal, ...)

6. Normalize name:
   UPDATE recipes SET normalizedName = normalize(name)

Response:
{ recipe with ingredients }
```

---

## 5. Добавление Рецепта в Meal

```
POST /recipes/{recipeId}/add-to-meal
{
  "date": "2025-12-03",
  "mealType": "lunch",
  "servings": 1.5,  // можно дробное
  "time": "13:00"
}

Backend Logic:
────────────────────────────────────────

1. Fetch recipe:
   SELECT * FROM recipes WHERE id = recipeId

2. Check ownership:
   IF recipe.userId != currentUserId AND recipe.isPublic = false:
     → return 403 Forbidden

3. Calculate for given servings:
   kcal = recipe.kcalPerServing * servings
   protein = recipe.proteinPerServing * servings
   ...

4. Create meal:
   INSERT INTO meals (type, time, dayEntryId, source='manual', totalKcal)

5. Create single food_item (representing recipe):
   INSERT INTO food_items (
     mealId,
     recipeId,           // ← важно! ссылка на рецепт
     productId = null,
     name = recipe.name,
     quantity = servings,
     unit = "порция",
     kcal,
     protein,
     ...
   )

6. Update recipe usage:
   UPDATE recipes
   SET usageCount = usageCount + 1,
       lastUsedAt = NOW()
   WHERE id = recipeId

7. Update day_entry:
   UPDATE day_entries
   SET consumedKcal = consumedKcal + kcal

Response:
{ meal with food_item containing recipeId }
```

---

## 6. Приоритеты Поиска Продуктов

### При поиске учитывать:

```sql
SELECT * FROM products
WHERE normalizedName LIKE '%{query}%'
ORDER BY
  isVerified DESC,        -- 1. Проверенные
  usageCount DESC,        -- 2. Популярные
  CASE                    -- 3. Свои продукты
    WHEN createdBy = currentUserId THEN 0
    ELSE 1
  END,
  created_at DESC         -- 4. Новые
LIMIT 10
```

### Match Score для AI Parse:

```javascript
function calculateMatchScore(productName, parsedName) {
  const p = normalize(productName);
  const q = normalize(parsedName);

  if (p === q) return 1.0;
  if (p.startsWith(q) || q.startsWith(p)) return 0.9;
  if (p.includes(q) || q.includes(p)) return 0.8;

  // Levenshtein distance
  const distance = levenshtein(p, q);
  const maxLen = Math.max(p.length, q.length);
  return 1 - distance / maxLen;
}
```

---

## 7. Кэширование и Оптимизация

### Автоматическое создание продуктов

```
Правило:
Если product использован из aiFallback и пользователь не отредактировал -
создать product автоматически при создании meal.

Преимущества:
- База пополняется автоматически
- Следующий раз продукт найдётся в suggestions
- Меньше запросов к AI
```

### Пересчёт КБЖУ в рецептах

```
Trigger: UPDATE products

IF product используется в рецептах:
  1. Найти все recipes содержащие этот product
  2. Пересчитать totalKcal, totalProtein, ...
  3. Пересчитать perServing значения
  4. UPDATE recipes

Опционально:
Пересчитать meals содержащие эти recipes (если актуальность важна)
```

### Индексы для производительности

```sql
-- Products
CREATE INDEX idx_products_normalized ON products(normalizedName);
CREATE INDEX idx_products_barcode ON products(barcode);
CREATE INDEX idx_products_usage ON products(usageCount DESC);

-- Recipes
CREATE INDEX idx_recipes_user ON recipes(userId);
CREATE INDEX idx_recipes_normalized ON recipes(normalizedName);
CREATE INDEX idx_recipes_usage ON recipes(usageCount DESC);

-- Food Items
CREATE INDEX idx_food_items_product ON food_items(productId);
CREATE INDEX idx_food_items_recipe ON food_items(recipeId);
```

---

## 8. OpenFoodFacts Integration

### Wrapper Logic

```javascript
async function findProductByBarcode(barcode) {
  // 1. Check local DB
  const local = await db.products.findByBarcode(barcode);
  if (local) return local;

  // 2. Query OpenFoodFacts
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
    { headers: { "User-Agent": "NutriAI/1.0 (contact@nutri-ai.app)" } },
  );

  if (response.status === 404) {
    return null;
  }

  const data = await response.json();
  if (data.status !== 1) {
    return null;
  }

  // 3. Map to our schema
  const product = {
    name: data.product.product_name || data.product.product_name_ru,
    barcode: barcode,
    kcalPer100g: data.product.nutriments["energy-kcal_100g"],
    proteinPer100g: data.product.nutriments.proteins_100g,
    fatPer100g: data.product.nutriments.fat_100g,
    carbsPer100g: data.product.nutriments.carbohydrates_100g,
    brand: data.product.brands,
    source: "openfoodfacts",
    isVerified: true,
  };

  // 4. Save to DB
  await db.products.create(product);

  return product;
}
```

---

## 9. Error Handling

### AI Parse Failures

```
IF Claude API timeout or error:
  Response:
  {
    "error": "ai_timeout",
    "fallback": {
      "parsed": {
        "type": "other",
        "items": [
          {
            "rawText": "весь текст пользователя",
            "parsedName": null,
            "aiFallback": null,
            "note": "Распарси вручную"
          }
        ]
      }
    }
  }

Frontend: показать форму ручного ввода
```

### Missing Products in Recipe

```
IF productId in recipe.ingredients not found:
  - Skip this ingredient
  - Log warning
  - Recalculate totals без него
  - Добавить поле recipe.hasMissingIngredients = true
```

---

## 10. State Machine для FoodItem

```
FoodItem может быть в одном из состояний:

1. WITH_PRODUCT:
   - productId != null
   - recipeId = null
   - КБЖУ рассчитываются из product

2. WITH_RECIPE:
   - productId = null
   - recipeId != null
   - КБЖУ рассчитываются из recipe

3. STANDALONE (legacy/import):
   - productId = null
   - recipeId = null
   - КБЖУ хранятся напрямую в item
   - source = "ai" | "manual"
```

---

## Summary

**Ключевые принципы:**

1. Всегда ищем в базе ПЕРЕД AI
2. AI результаты автоматически кэшируются
3. Рецепты = набор ссылок на products
4. FoodItem может ссылаться на product ИЛИ recipe
5. UsageCount = естественная популярность
6. Normalize для улучшения поиска

**Оптимизации:**

- Batch запросы к AI (несколько items за раз)
- Кэширование popular products в Redis
- Background job для OpenFoodFacts sync
- Denormalization для быстрого расчёта
