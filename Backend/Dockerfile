# Use official Node.js image as a base
FROM node:17-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose port 1234 to the outside world
EXPOSE 1234

# Command to run the backend server
CMD ["npm", "start"]
