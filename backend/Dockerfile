# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install && npm rebuild bcrypt --build-from-source

# If nodemon is a devDependency, install it globally
RUN npm install -g nodemon

# Copy all backend files
COPY . .

# Expose backend port
EXPOSE 4000

# Start the backend
CMD ["nodemon", "server.js"]
