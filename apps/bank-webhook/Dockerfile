FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npx prisma generate --schema=packages/db/prisma/schema.prisma

WORKDIR /app/apps/bank-webhook
RUN npm run build

EXPOSE 3003

CMD ["npm","run","start"]