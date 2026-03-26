# Base image — Node.js 24 on Alpine Linux (minimal size)
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first (layer caching optimization)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000 to the host
EXPOSE 3000

# Command to start the application
CMD ["node", "app.js"]
