const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/subscriptions', (req, res) => {
    const subscriptions = JSON.parse(`{

    `);

    res.status(200).json({ subscriptions });
});

app.listen(port, () => console.log(`Listening on port ${port}`));