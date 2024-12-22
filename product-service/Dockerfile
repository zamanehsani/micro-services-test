

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
EXPOSE 3004

RUN npx prisma generate

# Run the app
CMD ["sh", "-c", "npx prisma generate && npx prisma migrate deploy && node src/app.js"]

