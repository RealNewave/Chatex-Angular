

FROM node:latest as build

WORKDIR /dist/src/app

COPY . .
RUN npm install
RUN npm run build

FROM nginx:latest

COPY --from=build /dist/src/app/chatex-angular /usr/share/nginx/html
COPY /nginx.conf  /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
