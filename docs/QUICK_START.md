# Quick Start Guide

## Запуск за 3 шага

### 1. Установка зависимостей
```bash
npm install
```

### 2. Проверка конфигурации
Файл `.env` уже настроен для работы с mock API:
```bash
NEXT_PUBLIC_USE_MOCK_API=true
```

### 3. Запуск dev сервера
```bash
npm run dev
```

Открой `http://localhost:3000/sign-in` - готово!

---

## Тестирование Sign-In

Mock API принимает любые email и password. Попробуй:

```
Email: test@example.com
Password: password123
```

Увидишь:
- Валидацию форм (Zod)
- Loading states
- Toast уведомления
- Редирект после успешного входа

---

## Переключение на Real API

Обнови `.env`:
```bash
NEXT_PUBLIC_USE_MOCK_API=false
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333/api
```

Перезапусти dev сервер:
```bash
npm run dev
```

---

## Команды разработки

```bash
npm run dev              # Запуск dev сервера
npm run build            # Production build
npm run generate:api     # Генерация API из OpenAPI schema
npm run test             # Unit тесты
npm run test:e2e         # E2E тесты
npm run storybook        # Storybook UI документация
```

---

## Troubleshooting

**MSW не работает?**
- Hard refresh: `Cmd+Shift+R` (Mac) или `Ctrl+Shift+R` (Windows)
- Проверь `.env`: `NEXT_PUBLIC_USE_MOCK_API=true`
- Перезапусти dev сервер

**Нужна помощь?**
- [MSW Setup Guide](./MSW_SETUP.md) - детали про mock API
- [Architecture](./ARCHITECTURE.md) - архитектура проекта
- [Testing Guide](./TESTING.md) - тестирование
