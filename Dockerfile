# syntax=docker/dockerfile:1

# Build the static web export
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npx expo export --platform web --output-dir dist \
    && node scripts/finalize-web-export.mjs dist

# Serve it with nginx
FROM nginx:1.27-alpine
COPY deploy/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
# Fail the build, not the deploy, if the server config is invalid
RUN nginx -t
EXPOSE 8080
