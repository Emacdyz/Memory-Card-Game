# Multiplayer game Memory #

Multiplayer game made by 2 other students of Codaisseur Academy and myself.

Developed with:

* React/Redux
* Material UI
* Typescript
* TypeORM
* Websocket

The assisgnment consisted on building a new game from the code of Tic Tac Toe Multiplayer game, gave by the teacher. This way, we learned to understand other's code and work with it.

### 🔷 In Progress!

## Client side

It's build using `create-react-app`. You first need to `yarn` in order to get all the dependencies locally. To start the app `yarn start` can be used.

The backend (server) of this project must be running for the app to function correctly.

## Server side

The server side is composed of 3 tables: game, players, users. The endpoints are the following:

1 - Game, players:

* `GET /games`: list all games
* `GET /games/:id`: select game by id
* `POST /games`: create new game
* `POST /games/:id/players`: create new game for the second player to join 
* `PATCH /games/:id`: update an existing game (progress) 

2 - Users:

* `GET /users`: list all users
* `GET /users/:id`: select user by id
* `POST /users`: add new player to users database by signing up 





