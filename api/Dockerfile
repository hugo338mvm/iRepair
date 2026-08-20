FROM node:26-alpine

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY prisma.config.ts ./
COPY prisma ./prisma/
RUN npx prisma generate

COPY . .

EXPOSE 3000

CMD ["npm", "start"]