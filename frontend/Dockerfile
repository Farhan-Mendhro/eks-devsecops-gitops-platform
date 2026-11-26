# Stage 1: build the frontend app
FROM node:24.22.1-alpine3.24 AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build


# Stage 2: serve with nginx
FROM nginx/nginx-unprivileged:1.30.6-alpine3.24

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080