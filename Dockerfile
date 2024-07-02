# Base stage
FROM node:18-alpine AS base
WORKDIR /cmci-erp-client
COPY .npmrc ./
COPY package*.json  ./
RUN npm i
COPY . .
RUN npm install serve -g
RUN npm install --production
RUN npx browserslist@latest --update-db
RUN npm run build

# Prod stage
FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=base /cmci-erp-client/build /usr/share/nginx/html
EXPOSE 3000
ENTRYPOINT ["nginx", "-g", "deamon off;"]
