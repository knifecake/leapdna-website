#!/bin/sh

# fail fast
set -e

# remove pid file so that it does not interfere with server start
if [ -f tmp/pids/server.pid ]; then
  rm tmp/pids/server.pid
fi

echo "Environment: $RAILS_ENV"

exec "$@"
