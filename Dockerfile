# Use an official Node.js runtime as the base image
FROM node:16

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm i

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Run unit tests
RUN npm test

RUN mkdir csv_files
ARG NODE_ENV=production
ARG MAE_API_PORT=3000
ARG MAE_FILE_PATH=/app/csv_files
ARG MAE_LOG_LEVEL=info

# Start the application
CMD ["npm", "start"]
