# Build bosqichi
FROM node:20-alpine as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

# Production server (nginx)
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html

# nginx default config bilan ishlasa ham bo‘ladi, agar kerak bo‘lsa custom config qo‘shamiz
EXPOSE 80
