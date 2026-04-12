from node:22-alpine

Workdir /app

copy package*.json ./

RUN rm -rf node_modules package-lock.json && npm cache clean --force && npm install

copy . .

expose 5173

cmd ["npm", "run", "dev", "--", "--host"]