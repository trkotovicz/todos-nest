FROM node:16

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm uninstall bcrypt

RUN npm install bcrypt

EXPOSE 3000

CMD ["bash", "-c", "sleep 10 && npm run start:dev"]
