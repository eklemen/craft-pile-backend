# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install required system dependencies
RUN apk add --no-cache --update \
    build-base \
    gcc \
    g++ \
    make

# Install the app dependencies
RUN yarn install --frozen-lockfile --production=false

# Copy the rest of the application
COPY . .

# Build the application
RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
