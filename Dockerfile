# Step 1: Builder
FROM node:18-alpine AS builder
WORKDIR /app

# Install dependencies (include devDependencies for build)
COPY package*.json ./
RUN npm install

# Copy all files
COPY . .

# Build Next.js app
RUN npm run build

# Step 2: Runner (lighter image)
FROM node:18-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

# Copy only needed files
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/next.config.mjs ./next.config.mjs
COPY --from=builder /app/tsconfig.json ./tsconfig.json

EXPOSE 3000
CMD ["npm", "start"]
