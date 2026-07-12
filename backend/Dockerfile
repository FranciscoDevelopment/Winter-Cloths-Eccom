# Stage 1: Build

FROM node:22-alpine AS builder

WORKDIR /app

# Habilita pnpm via corepack (incluido en Node 20)
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm build


# Stage 2: Production

FROM node:22-alpine AS production

WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
COPY --from=builder /app/pnpm-workspace.yaml ./pnpm-workspace.yaml

RUN pnpm install --prod --frozen-lockfile

EXPOSE 3000

CMD ["node", "dist/main"]


