
FROM node:18-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

EXPOSE 4000

cmd npm run db:migrate:dev
cmd npm run start
