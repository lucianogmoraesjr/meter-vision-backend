FROM node:20-alpine

RUN npm install -g pnpm

WORKDIR /app

COPY package.json pnpm-lock.yaml* ./

RUN pnpm fetch

COPY . .

RUN pnpm install

RUN pnpm build

RUN pnpm prisma generate

EXPOSE 3333
