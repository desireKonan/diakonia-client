FROM node:20.14-alpine AS builder

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm run build

FROM node:20.14-alpine

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/build ./build

EXPOSE 3015

CMD ["npm", "run", "start:prod"]
