FROM php:8.3-fpm as builder

ARG APP_VERSION
ENV APP_VERSION $APP_VERSION

ARG DOCKER_GID
ARG DOCKER_UID

COPY --chown=root:root .root-fs /

WORKDIR /app

COPY --chown=docker:docker . /app

RUN apt-get update && \
    apt-get install -y libpq-dev && \
    apt-get install zip unzip && \
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
    composer validate && \
    composer clear-cache && \
    composer install -n --no-cache --no-ansi

FROM trafex/php-nginx:3.6.0

ARG DOCKER_GID
ARG DOCKER_UID

COPY --chown=nginx --from=builder /app /var/www/html

COPY --chown=root:root .root-fs /

EXPOSE 80