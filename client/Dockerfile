# Stage 1: Build the React application
FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm run build

# Stage 2: Serve the app using nginx
FROM nginx:stable-alpine

COPY --from=build /app/build /usr/share/nginx/html

# Use a custom nginx.conf (optional)
# COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
