FROM node:18-alpine as build

WORKDIR /app

# Set memory limit for Node
ENV NODE_OPTIONS="--max-old-space-size=400"

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy source code and build
COPY . .
RUN npm run build

# Production stage: serve static files
FROM nginx:alpine

# Copy built files to nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
