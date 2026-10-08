# Portal auth backend — Express + MongoDB + JWT.
FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY . .

EXPOSE 5001
CMD ["node", "server.js"]
