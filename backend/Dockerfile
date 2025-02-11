FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install prisma -g

RUN npx prisma generate


COPY . .

EXPOSE 4000

CMD ["npm", "start"]