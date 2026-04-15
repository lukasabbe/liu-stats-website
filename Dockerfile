FROM node:20-alpine AS base
RUN apk add --no-cache pnpm

FROM base AS deps
WORKDIR /app
COPY pnpm-lock.yaml package.json ./
COPY .npmrc ./
RUN pnpm install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/node_modules/.pnpm/liu-tentor-package@1.2.0/node_modules/liu-tentor-package ./node_modules/liu-tentor-package
COPY . .

RUN pnpm build

FROM base AS runner
WORKDIR /app
ENV HOST=0.0.0.0
ENV PORT=3000

COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000

CMD ["node", "build/index.js"]