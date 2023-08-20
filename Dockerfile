FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD [ "bash", "-c", "npm run migration:run && npm run start:dev" ]