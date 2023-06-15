FROM php:7.4-cli

COPY ./dist /var/www/html

WORKDIR /var/www/html

EXPOSE 80

CMD [ "php", "-S", "0.0.0.0:80" ]