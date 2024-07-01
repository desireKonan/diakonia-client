FROM node:18-alpine

WORKDIR /cmci-erp-app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
