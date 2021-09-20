# Podcast Player

A podcast player application built with the "MERN" stack, i.e. React.js, Express MongoDB, and Node.

## Installation

Run `npm install` from within the project's root to install the necessary dependencies.

## Server Setup

You'll need to create a file named `.env` with the same structure as the [`.env.example`](./backend/.env.example) file already provided in the `backend/` directory.

### MongoDB

You'll need to have MongoDB running either locally, or by entering a URL to the `MONGO_URI` key in the `.env` file.

### Redis

[Redis](https://redis.io/download) can be used for caching on the server. Once installed & added to your path, you can start the Redis server as follows.

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

## Build using Docker

To run using Docker Compose:

### Production

```sh
docker-compose up
```

### Development

```sh
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
```

## Screenshots

![Screenshot](https://user-images.githubusercontent.com/37158241/121348755-a340c700-c920-11eb-9814-0b6cf3b55161.PNG)
