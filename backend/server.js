const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const FeedParser = require('feedparser');
const mongoose = require('mongoose');
const path = require('path');
const request = require('request');

// Import connection string and connect to MongoDB.
const mongodb = require('./config/keys').mongoURI;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Import data model.
const PodcastModel = require('./models/podcast');

const app = express();
const PORT = 4000;

app.use(express.static(path.join(__dirname, '../build')));
app.use('/static', express.static(path.join(__dirname, 'build//static')));

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/subscriptions', (req, res) => {
    PodcastModel.find({}, (err, subscriptions) => {
        if (!subscriptions) {
            res.status(500).json({ subscriptions: [] });
        } else {
            res.status(200).json({ subscriptions });
        }
    });
});

app.get('/api/subscriptions/:id', (req, res) => {
    PodcastModel.findById({ _id: req.params.id }, (err, data) => {
        if (!data) {
            res.status(404).send({});
        } else {
            /* Get all the episodes of this podcast by parsing its RSS feed.
             * The code below uses feedparser, and is loosely based on both this demo: [https://github.com/scripting/feedParserDemo]
             * and the example included in the docs here: [https://www.npmjs.com/package/feedparser#usage].
             */
            const feedparser = new FeedParser({ addmeta: false });
            const feedItems = [];

            const stream = request(data.feedUrl);

            stream.on('response', function (response) {
                if (response.statusCode !== 200) {
                    res.status(response.statusCode).send({})
                } else {
                    this.pipe(feedparser);
                }
            });

            /* Read through each item in the feed and add it to the `feedItems` array.
             * Each feedItem contains a title, date, and an audio file.
             */
            feedparser.on('readable', function () {
                try {
                    const item = this.read();
                    if (item !== null) {
                        feedItems.push({
                            title: item.title,
                            date: item.date,
                            audio: item.enclosures[0]
                        });
                    }
                } catch (e) {
                    this.emit('error', new Error(e.message));
                }
            });

            feedparser.on('end', function () {
                // Send everything in the DB, as well as the `feedItems` array.
                res.json({
                    id: data.id,
                    title: data.title,
                    author: data.author,
                    artwork: data.artwork,
                    favourite: data.favourite,
                    description: data.description,
                    link: data.link,
                    feedUrl: data.feedUrl,
                    episodes: feedItems
                });
            });

            feedparser.on('error', function (e) {
                res.status(500).send(e.message);
            });
        }
    });
});

app.post('/api/subscriptions', (req, res) => {
    const feedparser = new FeedParser({ addmeta: false });

    try {
        // Extract the podcast's information from the RSS feed sent by the client.
        const stream = request(req.body.feedUrl);

        stream.on('response', function (response) {
            if (response.statusCode !== 200) {
                res.status(response.statusCode).send();
            } else {
                this.pipe(feedparser);
            }
        });
    } catch (e) {
        res.status(400).send(e.message);
    }

    feedparser.on('readable', function () {
        // All of the properties needed are in the `meta` section of the feed.
        PodcastModel.create({
            title: this.meta.title,
            author: this.meta.author,
            artwork: this.meta.image.url,
            description: this.meta.description,
            link: this.meta.link,
            feedUrl: req.body.feedUrl
        });

        res.status(201).send();
    });

    feedparser.on('error', function (e) {
        res.status(500).send(e.message);
    });
});

app.put('/api/subscriptions/:id', (req, res) => {
    PodcastModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }, (err, data) => {
        if (err) {
            res.status(404).send(err.message);
        } else {
            res.status(200).send(data);
        }
    });
});

app.delete('/api/subscriptions/:id', (req, res) => {
    PodcastModel.deleteOne({ _id: req.params.id }, (err, data) => {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.status(200).send(data);
        }
    });
});

app.get('/api/search', (req, res) => {
    const limit = 15;

    // Search iTunes for podcasts related to the `term` query parameter sent by the client.
    axios.get(`https://itunes.apple.com/search?term=${req.query.term}&limit=${req.query.limit || limit}&entity=podcast`)
        .then(data => {
            return data.data;
        })
        .then(data => {
            const results = data.results.map(result => {
                return {
                    title: result.collectionName,
                    author: result.artistName,
                    artwork: result.artworkUrl100,
                    feedUrl: result.feedUrl
                };
            });
            res.status(200).json({ results });
        })
        .catch(() => {
            res.status(400).json({ results: [] })
        });
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));