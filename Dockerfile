# Base stage
FROM node:18-alpine AS builder

WORKDIR /app

COPY .npmrc ./

COPY package*.json  ./

COPY . .

RUN npm install serve -g

RUN npm ci --production

RUN npx browserslist@latest --update-db

RUN npm run build

# Prod stage
FROM nginx:alpine

WORKDIR /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/build /usr/share/nginx/html

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
