FROM node:17-alpine
WORKDIR /
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 1234
CMD ["npm", "start"]
