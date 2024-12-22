# Stage 1: Build Angular app
FROM node:22-alpine as build-stage

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Serve Angular app with NGINX
FROM nginx:alpine

WORKDIR /usr/share/nginx/html
RUN rm -rf ./*

# Copy Angular build files from the previous stage
COPY --from=build-stage /app/dist/frontend/browser ./

# Copy custom NGINX configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
