#Secret Santa Backend NestJS Dockerfile
FROM node:18-alpine

#Set working dir to /app and copy package json and pachage-lock
WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy the rest of the app's source code into the container
COPY . . 

# Running npm run build will run nest build which will create dist folder.
# RUN instruction creates a new layer in the image. 

RUN npm run build

# Expose port 8080
EXPOSE 8080

# CMD is the default command to run inside the container.
CMD ["sh", "-c", "npm run migration:run && node dist/main.js"]




