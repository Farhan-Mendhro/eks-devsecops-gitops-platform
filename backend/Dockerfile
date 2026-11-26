# Build stage - install dependencies
FROM node:24.22.2-alpine3.24 AS dependencies

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

# Final stage
FROM node:24.22.2-alpine3.24

WORKDIR /app

ENV NODE_ENV=production

# Copy only node_modules from the dependencies stage
COPY --from=dependencies /app/node_modules ./node_modules

# Copy all source code (as non-root user is not needed for startup)
COPY . .

EXPOSE 5000

CMD ["node", "server.js"]