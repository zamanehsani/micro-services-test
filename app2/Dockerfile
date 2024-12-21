# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the app port
EXPOSE 3002

RUN npx prisma generate

# Run the app
CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
