FROM php:8.3-fpm as builder

ARG APP_VERSION
ENV APP_VERSION $APP_VERSION

COPY --chown=root:root .root-fs /

WORKDIR /app

COPY --chown=docker:docker . /app

RUN apt-get update && \
    apt-get install -y libpq-dev && \
    docker-php-ext-install pdo pdo_pgsql pgsql

RUN pecl install --onlyreqdeps --force redis && \
    rm -rf /tmp/pear && \
    docker-php-ext-enable redis

RUN set -ex && \
    php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');" && \
    php composer-setup.php --install-dir=/usr/local/bin --filename=composer && \
    php -r "unlink('composer-setup.php');" && \
    composer --version

RUN set -x && \
    composer install -n --no-dev --no-cache --no-ansi --no-autoloader && \
    composer dump-autoload -n --optimize --classmap-authoritative

FROM php:8.3-fpm as runtime

ARG APP_VERSION
ARG RUN_SERVICES
ENV APP_VERSION $APP_VERSION

COPY --chown=root:root .root-fs /

COPY --from=builder --chown=docker:docker /app /var/www/html

RUN set -ex && \
    chmod -R o+x /var/lib/nginx && \
    setfacl -R -d -m u::rwx -m u:nginx:rwx -m g::rwx /var/lib/nginx

WORKDIR /var/www/html

VOLUME /var/www/html/storage