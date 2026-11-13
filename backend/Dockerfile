#stage 1
FROM node:24.22.2-alpine3.24 As dependencies

WORKDIR /app

COPY package*.json ./

# Install locked production dependencies.
RUN npm ci --omit=dev

#stage 2
FROM node:24.22.2-alpine3.24

WORKDIR /app

ENV NODE_ENV=production

# Copy installed dependencies.
COPY --from=dependencies /app/node_modules ./node_modules

# Copy backend source code.
COPY --chown=node:node . .

# Run as the non-root Node user.
USER node

EXPOSE 5000

CMD ["node", "server.js"]