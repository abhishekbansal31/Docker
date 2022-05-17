#Stage 1: We are copying our app code in the “app” folder and installing app dependencies from package.json file 
#         and creating production build using Node image.
FROM node:14.16.0 AS build-step

# Set working directory.
RUN mkdir -p /client
WORKDIR /client

# Copy app dependencies.
COPY package.json package-lock.json ./

# Install app dependencies.
RUN npm install

# Remove old src code if exists to copy latest src, just in case
RUN rm -rf src

# Copy app files.
COPY ./ ./

# Build app
RUN npm run build

#Stage 2: We are using the Nginx server image to create the Nginx server and 
#         deploy our app on it by copying build items from /app/dist/ui to Nginx server at /usr/share/Nginx/HTML location.
FROM nginx:1.19.7

# Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

# Copy output directory from builder to nginx image.
COPY --from=build-step /client/dist/client/* /usr/share/nginx/html/

# Copy nginx configuration file.
# COPY nginx.conf /etc/nginx/conf.d/default.conf
RUN mv /etc/nginx/nginx.conf /etc/nginx/nginx.conf.bkup
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE ${NGINX_PORT}