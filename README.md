# Ruby on Rails Starter

1. Update config/development.rb with correct default_url_options.
1. Update config/production.rb with website.
1. Update config/test.rb with correct default_url_options.
1. Update config/initializers/session_store.rb with correct key.
1. Update config/application.rb with correct module.
1. Update this README

1. Run:
    ```
    sudo service postgresql start
    ```
1. Run:
    ```
    psql
    UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
    DROP DATABASE template1;
    CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
    UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
    \c template1
    VACUUM FREEZE;
    \q
    ```
1. Run:
    ```
    rails db:create
    ```
1. Create run configuration:
    ```
    rails server --binding $IP --port $PORT
    ```
