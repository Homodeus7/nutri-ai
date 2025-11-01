# UiTypography

Универсальная компонента для типографики, вдохновленная shadcn/ui.

## Основные возможности

- ✨ 12 готовых вариантов типографики (h1-h4, p, blockquote, list, inline-code, lead, large, small, muted)
- 🎨 Настройка выравнивания текста (left, center, right, justify)
- 💪 Управление толщиной шрифта (normal, medium, semibold, bold, extrabold)
- 🔄 Полиморфная компонента (можно рендерить как любой HTML элемент)
- 🎯 TypeScript типизация
- 🧩 Использует class-variance-authority для управления вариантами

## Использование

### Базовые примеры

```tsx
import { UiTypography } from "@/shared/ui/ui-typography";

// Заголовки
<UiTypography variant="h1">Главный заголовок</UiTypography>
<UiTypography variant="h2">Подзаголовок</UiTypography>

// Параграф
<UiTypography variant="p">
  Обычный текст параграфа
</UiTypography>

// Цитата
<UiTypography variant="blockquote">
  "Это важная цитата"
</UiTypography>

// Список
<UiTypography variant="list">
  <li>Первый пункт</li>
  <li>Второй пункт</li>
  <li>Третий пункт</li>
</UiTypography>

// Инлайн код
<UiTypography variant="p">
  Установите зависимости с помощью{" "}
  <UiTypography variant="inline-code" as="code">
    npm install
  </UiTypography>
</UiTypography>
```

### Специальные варианты

```tsx
// Lead текст (вступительный)
<UiTypography variant="lead">
  Это вступительный текст с увеличенным размером
</UiTypography>

// Крупный текст
<UiTypography variant="large">
  Вы уверены?
</UiTypography>

// Мелкий текст
<UiTypography variant="small">
  Email адрес
</UiTypography>

// Приглушенный текст
<UiTypography variant="muted">
  Дополнительная информация
</UiTypography>
```

### Выравнивание текста

```tsx
<UiTypography variant="p" align="left">
  Текст слева (по умолчанию)
</UiTypography>

<UiTypography variant="p" align="center">
  Текст по центру
</UiTypography>

<UiTypography variant="p" align="right">
  Текст справа
</UiTypography>

<UiTypography variant="p" align="justify">
  Выровненный текст
</UiTypography>
```

### Толщина шрифта

```tsx
<UiTypography variant="p" weight="normal">
  Обычный вес
</UiTypography>

<UiTypography variant="p" weight="bold">
  Жирный текст
</UiTypography>

<UiTypography variant="p" weight="extrabold">
  Очень жирный текст
</UiTypography>
```

### Полиморфность (as prop)

```tsx
// Рендерим h2, но используем div элемент
<UiTypography variant="h2" as="div">
  Выглядит как h2, но это div
</UiTypography>

// Рендерим параграф как span
<UiTypography variant="p" as="span">
  Выглядит как параграф, но это span
</UiTypography>
```

### Кастомные стили

```tsx
<UiTypography
  variant="h1"
  className="text-blue-600 underline hover:text-blue-800"
>
  Кастомный стилизованный заголовок
</UiTypography>
```

### Комплексный пример

```tsx
<article className="max-w-3xl space-y-6">
  <UiTypography variant="h1">
    Заголовок статьи
  </UiTypography>

  <UiTypography variant="lead">
    Вступительный текст статьи с важной информацией для читателя
  </UiTypography>

  <UiTypography variant="h2">
    Раздел статьи
  </UiTypography>

  <UiTypography variant="p">
    Основной текст статьи. Lorem ipsum dolor sit amet.
  </UiTypography>

  <UiTypography variant="blockquote">
    "Важная цитата из статьи"
  </UiTypography>

  <UiTypography variant="list">
    <li>Первый ключевой момент</li>
    <li>Второй ключевой момент</li>
    <li>Третий ключевой момент</li>
  </UiTypography>

  <UiTypography variant="muted">
    Примечание или дополнительная информация
  </UiTypography>
</article>
```

## API

### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `variant` | `"h1" \| "h2" \| "h3" \| "h4" \| "p" \| "blockquote" \| "list" \| "inline-code" \| "lead" \| "large" \| "small" \| "muted"` | `"p"` | Вариант типографики |
| `align` | `"left" \| "center" \| "right" \| "justify"` | `undefined` | Выравнивание текста |
| `weight` | `"normal" \| "medium" \| "semibold" \| "bold" \| "extrabold"` | `undefined` | Толщина шрифта |
| `as` | `ElementType` | Зависит от варианта | HTML элемент для рендера |
| `className` | `string` | `undefined` | Дополнительные CSS классы |
| `children` | `ReactNode` | - | Содержимое компоненты |

### Маппинг вариантов на элементы по умолчанию

| Variant | Default Element |
|---------|----------------|
| `h1` | `<h1>` |
| `h2` | `<h2>` |
| `h3` | `<h3>` |
| `h4` | `<h4>` |
| `p` | `<p>` |
| `blockquote` | `<blockquote>` |
| `list` | `<ul>` |
| `inline-code` | `<code>` |
| `lead` | `<p>` |
| `large` | `<div>` |
| `small` | `<small>` |
| `muted` | `<p>` |

## Лучшие практики

1. **Семантическая разметка**: Используйте правильную иерархию заголовков (h1 → h2 → h3) для SEO и доступности
2. **Полиморфность**: Используйте `as` prop только когда нужна другая семантика, но те же стили
3. **Кастомизация**: Предпочитайте использование пропсов `align` и `weight` вместо className для стандартных изменений
4. **Комбинирование**: Можно комбинировать variant, align, weight и className для максимальной гибкости
