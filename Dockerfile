

FROM node:latest as build

WORKDIR /dist/src/app

RUN npm cache clean --force
COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /dist/src/app/dist/chatex-angular /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
