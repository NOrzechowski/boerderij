# Boerderij

Boerderij is a loved and orally passed down family game.

## Installation

**Warning**

> These instructions haven't been updated to reflect the migration to Elixir/Phoenix yet.

Ensure you have Node and NPM installed.
E.g. https://docs.npmjs.com/downloading-and-installing-node-js-and-npm

Install dependencies from base directory.

```
npm install
```

Run server from base directory

```
node server.js
```

Run site from client directory in another terminal

```
npm run start
```

## Project Parking Lot

One potential goal is to transition this game to be running on Elixir & Phoenix w/ LiveView.
The LiveView features of socket based server side rendered templates seems like it would be a good fit for this simple card game.
It should allow fast interplay between different users on the website via the socket based functionality.

The main concern of eschewing a game engine is all the nice features like flip rendering, etc.
Another option is to combine both servers somehow and switch back and forth with sometime of passing mechanism.
Also, we can use the phoenix app to be a lobby and once there are four players or whatever we can have a "join game" button and transition to the express/nodejs game.

I plan to roll out new features under the main branch, and will be under my personal DNS endpoint.
Branching strategy will be discussed as needed, as will feature flags.

When connected to postgres/ecto, the overall architecture and flow will work something like:

- A user navigates to a landing page.
- There, they can login.
- Once logged in, they are presented with an option to start a new game or join an existing one.
- If they opt to start a new game, they are taken to a _pending lobby_ screen that shows other users waiting to join.
  - Behind the scenes, the schema will be initialized and linked to the current user.
  - Candidate data models might be:

| Model/Table   | Description                                                                                                                  |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| users         | dynamic, not sure how I want to handle provisioning, OAuthing, logging in yet                                                |
| game_instance | dynamic, with fks, game_id                                                                                                   |
| cards         | static, just a table with 52 entries :)                                                                                      |
| shuffled_deck | dynamic, fk to game_instance, 52 entries per game basically?                                                                 |
| game_hand     | dynamic, fks to user, game_instance, cards. #-of-cards-dealt entries per game?                                               |
| game_moves    | dynamic, fks to game_instance, users, game_hand. Will basically hold every move played, including # of chips in the pot, etc |

    - With the database models initialized, the game id is available to share to friends
    - As friends (users) join the game, they're linked with the current game_instance
    - Finally, when the "start game" button is clicked with enough users in the lobby the game play commences

- Game play is controlled in the client through phaser & js & websockets that communicate back to the server.
- Any logged in players can join any game if they are given a valid game id
- (Future Feature) Users will be able to chat when in lobby or game
