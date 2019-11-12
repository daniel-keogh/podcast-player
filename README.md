# MERN Project

Y3S1 Data Representation & Querying Project.

## Description

Podcast player application built with the "MERN" stack.

## Scripts

**_Note_**: Before you can run the app, you'll first need to put your MongoDB connection string in the [`./backend/config/keys.js`](./backend/config/keys.js) file:

```javascript
module.exports = {
    mongoURI: 'YOUR_MONGO_URI'
};
```

---

### `npm run start`

Runs the React client in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run server`

Launches the Express server using [nodemon](https://www.npmjs.com/package/nodemon), so it will automatically reload if you modify `server.js`.
