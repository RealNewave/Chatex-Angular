

FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build


FROM nginx:latest

RUN rm-rf /etc/nginx/conf.d/default.conf

COPY --from=build /usr/local/app/dist/sample-angular-app /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
