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
RUN yarn install --production=false

# Copy the rest of the application
COPY . .
COPY .env .env

RUN yarn add dotenv

# Import the secret file
RUN --mount=type=secret,id=env source=.env target=.env \
    echo "source .env" >> ~/.bashrc

# Set environment variables from the secret file
RUN --mount=type=secret,id=env source=.env target=.env \
    set -a && . ./.env && set +a && \
    yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
