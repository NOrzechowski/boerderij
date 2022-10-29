# Boerderij

Boerderij is a loved and orally passed down family game.

## Installation

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

## Project Goals

One potential goal is to transition this game to be running on Elixir & Pheonix w/ LiveView.
The LiveView features of socket based server side rendered templates seems like it would be a good fit for this simple card game.
It should allow fast interplay between different users on the website via the socket based functionality.

The main concern of eschewing a game engine is all the nice features like flip rendering, etc.
Another option is to combine both servers somehow and switch back and forth with sometime of passing mechanism.
Also, we can use the pheonix app to be a lobby and once there are four players or whatever we can have a "join game" button and transition to the express/nodejs game
