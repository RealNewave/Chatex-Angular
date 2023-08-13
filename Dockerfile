FROM nginx:latest

RUN rm-rf /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d
COPY dist/chatex-angular /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
