
# Use the official Node.js image as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /restful-photo

# Copy the application files into the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

COPY . .

EXPOSE 3000

# Define the entry point for the container
CMD ["npm", "start"]


