#Ruby on Rails Starter

#Update config/development.rb with correct default_url_options.
#Update config/production.rb with website.
#Update config/test.rb with correct default_url_options.
#Update config/initializers/session_store.rb with correct key.
#Update config/application.rb with correct module.
#Update this README

#Run:
    sudo service postgresql start
#Run:
    psql
    UPDATE pg_database SET datistemplate = FALSE WHERE datname = 'template1';
    DROP DATABASE template1;
    CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UNICODE';
    UPDATE pg_database SET datistemplate = TRUE WHERE datname = 'template1';
    \c template1
    VACUUM FREEZE;
    \q
#Run:
    rails db:create
    
#Create run configuration:
    rails server --binding $IP --port $PORT