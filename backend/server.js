const express = require('express');
const cors = require('cors');

const app = express();
const port = 4000;

const axios = require('axios');

app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/subscriptions', (req, res) => {
    const subscriptions = JSON.parse(`{
        
    }`);

    res.status(200).json(subscriptions);
});

app.get('/api/top', (req, res) => {
    axios.get(`https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/25/explicit.json`)
        .then(data => {
            return data.data.feed.results;
        })
        .then(top => {
            res.status(200).send(top);
        });
});

app.listen(port, () => console.log(`Listening on port ${port}`));