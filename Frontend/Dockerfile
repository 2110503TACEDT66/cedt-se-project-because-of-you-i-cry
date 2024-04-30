# Use official Node.js image as a base
FROM node:17-alpine as build

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the src directory into the working directory
COPY ./src ./src

# Set NODE_ENV to production and build the React app
RUN npm run build

# Stage 2: Use lightweight nginx image to serve the React app
FROM nginx:alpine

# Copy the build output from stage 1 into the nginx web root directory
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

# Command to run nginx
CMD ["nginx", "-g", "daemon off;"]
