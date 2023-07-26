

FROM node:14.17.6

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "node dist/simulator.js & npm start"]