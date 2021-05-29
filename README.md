# Podcast Player

A podcast player application built with the MERN stack.

## Installation

Run `npm install` in the project's root to install the necessary dependencies.

## Server Setup

You should create a file named `.env` with the same structure as the [`.env.example`](./backend/.env.example) file already provided.

### MongoDB

You'll need to have Mongo running either locally, or by entering a URL to the `MONGO_URI` key in the `.env` file.

### Redis

[Redis](https://redis.io/download) is used for caching on the server. Once installed & added to your path, you should start the Redis server as follows.

```sh
$ redis-server
```

## Scripts

### `npm start`

Runs the React client in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Launches the Express server using nodemon, so it will automatically reload if you modify the server code.

### `npm run dev`

Runs the client and server concurrently.

### `npm run build`

Generates a production build of the React app inside the `build` directory.
