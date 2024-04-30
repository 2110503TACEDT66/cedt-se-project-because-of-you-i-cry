FROM node:17-alpine
RUN mkdir -p /app
WORKDIR /app /public
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
