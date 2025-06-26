FROM node:24-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . . 

EXPOSE 8080

CMD ["npm", "run", "dev"]
