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

# Import the secret file
RUN --mount=type=secret,id=env source=.env target=.env \
    echo "source .env" >> ~/.bashrc

# Set environment variables from the secret file
RUN --mount=type=secret,id=env source=.env target=.env \
    set -a && . ./.env && set +a && \
    yarn build
#
#ARG DB_HOST
#ENV DB_HOST=${DB_HOST}
#
#ARG NODE_ENV
#ENV NODE_ENV=${NODE_ENV}
#
#ARG DB_PORT
#ENV DB_PORT=${DB_PORT}
#
#ARG DB_NAME
#ENV DB_NAME=${DB_NAME}
#
#ARG DB_USERNAME
#ENV DB_USERNAME=${DB_USERNAME}
#
#ARG DB_PASSWORD
#ENV DB_PASSWORD=${DB_PASSWORD}
#
#ARG SSL_CERT
#ENV SSL_CERT=${SSL_CERT}


# Build the application
#RUN yarn build

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["yarn", "start:prod"]
