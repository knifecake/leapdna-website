FROM ruby:2.7.2-alpine3.13 AS builder

RUN apk add --update --no-cache \
    build-base \
    curl \
    git \
    libffi-dev \
    linux-headers \
    libxml2-dev \
    libxslt-dev \
    libgcrypt-dev \
    pkgconfig \
    sqlite-dev \
    sassc \
    yarn \
    tzdata

ENV BUNDLER_VERSION=2.1.4 APP_HOME=/app

RUN mkdir -p ${APP_HOME}

WORKDIR "${APP_HOME}"

COPY ./.ruby-version "${APP_HOME}"/
COPY ./Gemfile ./Gemfile.lock "${APP_HOME}"/

RUN bundle config build.nokogiri --use-system-libraries
RUN bundle config build.sassc --use-system-libraries
RUN bundle config set deployment 'true'
RUN BUNDLE_WITHOUT="development:test" bundle install --jobs 4 --retry 5 && \
    find "${APP_HOME}"/vendor/bundle -name "*.c" -delete && \
    find "${APP_HOME}"/vendor/bundle -name "*.o" -delete

COPY . "${APP_HOME}"

RUN cp db/development.sqlite3 db/production.sqlite3

RUN RAILS_ENV=production NODE_ENV=production bundle exec rake assets:precompile

RUN rm -r .git/ node_modules test

## Production
FROM ruby:2.7.2-alpine3.13 as production

ENV APP_HOME=/app
ENV BUNDLER_VERSION=2.1.4 BUNDLE_SILENCE_ROOT_WARNING=1

RUN apk add --update --no-cache \
    tzdata \
    libxml2 \
    libxslt \
    sqlite-libs

RUN gem install -N bundler:"${BUNDLER_VERSION}"

COPY --from=builder ${BUNDLE_APP_CONFIG} ${BUNDLE_APP_CONFIG}
COPY --from=builder  ${APP_HOME} ${APP_HOME}

WORKDIR "${APP_HOME}"

ENTRYPOINT [ "bin/docker-entrypoint.sh" ]

CMD ["bin/rails", "server", "-b", "0.0.0.0", "--log-to-stdout"]