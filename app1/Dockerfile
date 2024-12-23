# Use Node.js base image
FROM node:18

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

RUN npx prisma generate
# Expose the app port
EXPOSE 3001

# Run the app
# CMD ["sh", "-c", "npx prisma migrate deploy && node server.js"]
CMD ["sh", "-c", "node server.js"]
