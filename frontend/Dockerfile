# Stage 1: build
FROM node:24.22.1-alpine3.24 AS build

WORKDIR /app

# Install dependencies using the lock file.
COPY package*.json ./
RUN npm ci

# Copy source code and build the application.
COPY . .
RUN npm run build


# Stage 2: final build
FROM nginx/nginx-unprivileged:1.30.6-alpine3.24

# Copy only the built website, not Node.js or development files.
COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080