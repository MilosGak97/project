# Stage 1: Build the app
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json files to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app source code into the container
COPY . .

# Build the NestJS app
RUN npm run build

# Stage 2: Run the app
FROM node:18-alpine

# Set the working directory for the final container
WORKDIR /usr/src/app

# Copy the built app and necessary files from the builder stage
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./

# Expose the port that your NestJS app listens on
EXPOSE 3000

# Set the default command to run the app
CMD ["sh", "-c", "node dist/main"]
