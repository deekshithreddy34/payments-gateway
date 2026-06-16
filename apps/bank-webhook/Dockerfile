FROM node:20-alpine

WORKDIR /app

COPY . .

RUN npm install

RUN ./node_modules/.bin/prisma generate --schema=packages/db/prisma/schema.prisma

WORKDIR /app/apps/bank-webhook
RUN npm run build

EXPOSE 3003

CMD ["npm","run","start"]
