# Redis-base Nodejs App

## Run Application

    $ cd ./docker
    $ docker-compose up --build

For get initial ping connect to address below

    $ curl http://localhost:3010/ping


## API 

A) get specific id

    $ curl http://localhost:3010/vote/3

B) increse value

    $ curl -i -H "Content-Type: application/json" -XPOST http://localhost:3010/vote/3/incr

C) decrese value

    $ curl -i -H "Content-Type: application/json" -XPOST http://localhost:3010/vote/3/dcr

D) delete value

    $ curl -i -H "Content-Type: application/json" -XDELETE http://localhost:3010/vote/3