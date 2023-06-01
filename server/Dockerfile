# Use the official Node.js 14 image from the Docker Hub
FROM node:14

# Create a new directory in the container to store the application's code
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the application's directory in the container
COPY package*.json ./

# Install the application's dependencies inside the container
RUN npm install

# Copy the rest of the application's code to the application's directory in the container
COPY . .

# Expose the port the application runs on
EXPOSE 8080

# Define the command to start the application
CMD [ "npm", "start" ]
