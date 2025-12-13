# Гайд по цветовой системе

## Введение

Проект использует цветовую систему **shadcn/ui** на Tailwind CSS v4. Все цвета автоматически адаптируются к светлой и темной теме.

**Конфигурация:** `src/app/pub/globals.css`

## Палитра цветов

### Базовые цвета

| Tailwind класс                           | Назначение                      |
| ---------------------------------------- | ------------------------------- |
| `bg-background` / `text-foreground`      | Основной фон и текст приложения |
| `bg-card` / `text-card-foreground`       | Карточки и панели               |
| `bg-popover` / `text-popover-foreground` | Всплывающие окна, дропдауны     |

### Семантические цвета

| Tailwind класс                                   | Когда использовать                                  |
| ------------------------------------------------ | --------------------------------------------------- |
| `bg-primary` / `text-primary-foreground`         | Основные кнопки, активные элементы, главные акценты |
| `bg-secondary` / `text-secondary-foreground`     | Вторичные кнопки, дополнительные элементы           |
| `bg-accent` / `text-accent-foreground`           | Hover-эффекты, подсветка, выделение                 |
| `bg-muted` / `text-muted-foreground`             | Неактивные элементы, вспомогательный текст          |
| `bg-destructive` / `text-destructive-foreground` | Кнопки удаления, ошибки, предупреждения             |

### Функциональные цвета

| Tailwind класс  | Назначение                  |
| --------------- | --------------------------- |
| `border-border` | Границы всех элементов      |
| `border-input`  | Границы полей ввода         |
| `ring-ring`     | Обводка фокуса (focus ring) |

### Sidebar (боковая панель)

| Tailwind класс                                           | Назначение              |
| -------------------------------------------------------- | ----------------------- |
| `bg-sidebar` / `text-sidebar-foreground`                 | Фон и текст sidebar     |
| `bg-sidebar-primary` / `text-sidebar-primary-foreground` | Активные пункты меню    |
| `bg-sidebar-accent` / `text-sidebar-accent-foreground`   | Hover-эффекты в sidebar |
| `border-sidebar-border`                                  | Границы в sidebar       |
| `ring-sidebar-ring`                                      | Focus ring в sidebar    |

### Цвета графиков

| Tailwind класс               | Назначение                                                           |
| ---------------------------- | -------------------------------------------------------------------- |
| `bg-chart-1` до `bg-chart-5` | Цвета для графиков и диаграмм (автоматически меняются в темной теме) |

## Примеры использования

### Страницы и карточки

```tsx
// Основная страница
<div className="bg-background text-foreground">
  {/* Карточка */}
  <div className="bg-card text-card-foreground border border-border rounded-lg p-4">
    <h2>Заголовок</h2>
    <p className="text-muted-foreground">Дополнительная информация</p>
  </div>
</div>
```

### Кнопки

```tsx
// Основная кнопка
<button className="bg-primary text-primary-foreground hover:bg-primary/90">
  Сохранить
</button>

// Вторичная кнопка
<button className="bg-secondary text-secondary-foreground hover:bg-secondary/80">
  Отмена
</button>

// Кнопка удаления
<button className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
  Удалить
</button>

// Outline кнопка
<button className="border border-border hover:bg-accent hover:text-accent-foreground">
  Опции
</button>

// Ghost кнопка
<button className="hover:bg-accent hover:text-accent-foreground">
  Ссылка
</button>
```

### Поля ввода

```tsx
// Обычный input
<input
  className="border border-input bg-background text-foreground
             focus:ring-2 focus:ring-ring
             placeholder:text-muted-foreground"
  placeholder="Введите текст"
/>

// Input с ошибкой
<input
  className="border-destructive focus:ring-destructive"
  aria-invalid="true"
/>

// Disabled input
<input
  className="bg-muted text-muted-foreground cursor-not-allowed"
  disabled
/>
```

### Прозрачность

Используйте `/число` для opacity:

```tsx
<div className="bg-primary/90">     {/* 90% непрозрачности */}
<div className="bg-accent/50">      {/* 50% непрозрачности */}
<div className="bg-destructive/10"> {/* 10% непрозрачности */}
```

## Темная тема

Все цвета автоматически меняются при переключении темы. Ничего дополнительно делать не нужно:

```tsx
// Автоматически адаптируется под тему!
<div className="bg-background text-foreground">Контент</div>
```

Если нужно задать разные стили для разных тем:

```tsx
// Разные цвета
<div className="bg-white dark:bg-black">

// Показать только в светлой теме
<div className="block dark:hidden">Светлая тема</div>

// Показать только в темной теме
<div className="hidden dark:block">Темная тема</div>
```

---

**Версия**: 2.0
**Дата**: 2025-11-06
**Конфигурация**: `src/app/pub/globals.css`
