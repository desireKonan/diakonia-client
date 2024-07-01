# Base stage
FROM node:18-alpine AS base
WORKDIR /cmci-erp-client
COPY .npmrc ./
COPY package*.json  ./
RUN npm i

# Dev stage
FROM base AS dev
COPY . .
CMD ["npm", "start"]

# Prod stage
FROM node:18-alpine AS prod
WORKDIR /cmci-erp-client
COPY .npmrc ./
COPY package*.json  ./
COPY . .
RUN npm install serve -g
RUN npm install --production
RUN npx browserslist@latest --update-db
RUN npm run build
EXPOSE 3000
CMD ["npm", "run", "start:prod"]
