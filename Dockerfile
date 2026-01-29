# ========================================
# Этап 1: base
# Базовый образ с Node.js 22 на Alpine Linux
# ========================================
FROM node:22-alpine AS base
WORKDIR /app

# ========================================
# Этап 2: deps
# Установка зависимостей из lock-файла
# npm ci гарантирует воспроизводимую установку
# ========================================
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ========================================
# Этап 3: builder
# Сборка Next.js приложения для production
# output: "standalone" в next.config.ts создаёт
# автономную сборку без node_modules
# ========================================
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# ========================================
# Этап 4: runner
# Финальный минимальный образ для запуска
# Копируем только необходимое для работы приложения
# ========================================
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Создаём непривилегированного пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Копируем статические файлы
COPY --from=builder /app/public ./public

# Копируем standalone-сборку и статику Next.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Запуск standalone-сервера Next.js
CMD ["node", "server.js"]
