# ── Stage 1: Builder ──────────────────────────────────────
FROM node:24 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY tsconfig.json ./
COPY src/ ./src/

RUN ./node_modules/.bin/tsc --project tsconfig.json

# ── Stage 2: Production ───────────────────────────────────
FROM node:24-alpine AS production

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
