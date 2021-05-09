#Stage 1: We are copying our app code in the “app” folder and installing app dependencies from package.json file 
#         and creating production build using Node image.
FROM node:14.16.0 AS build-step
RUN mkdir -p /uiApp
WORKDIR /uiApp
COPY package.json /uiApp
#RUN npm install
COPY . /uiApp
RUN npm install
#RUN npm install -g @angular/cli
RUN npm run build --prod
#RUN ng serve

#Stage 2: We are using the Nginx server image to create the Nginx server and 
#         deploy our app on it by copying build items from /app/dist/ui to Nginx server at /usr/share/Nginx/HTML location.
FROM nginx:1.19.7
COPY --from=build-step /uiApp/dist/client /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80