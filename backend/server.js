const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const FeedParser = require('feedparser');
const mongoose = require('mongoose');
const request = require('request');
const axios = require('axios');

const app = express();
const PORT = 4000;

const mongodb = require('./config/keys').mongoURI;
mongoose.connect(mongodb, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const PodcastModel = require('./models/podcast');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/search', (req, res) => {
    const defaultLimit = 15;

    // Search iTunes using the query parameters sent by the client.
    axios.get(`https://itunes.apple.com/search?term=${req.query.term}&limit=${req.query.limit || defaultLimit}&entity=podcast`)
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
                }
            });
            res.status(200).json({ results });
        })
        .catch(() => {
            res.status(400).json({ results: [] })
        });
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

/* Get all the episodes of a particular subscription by parsing its RSS feed.
 * The code below uses feedparser [https://www.npmjs.com/package/feedparser], 
 * and is loosely based on this demo: https://github.com/scripting/feedParserDemo
 */
app.get('/api/subscriptions/:id', (req, res) => {
    PodcastModel.findById({ _id: req.params.id }, (err, data) => {
        if (!data) {
            res.status(404).send({});
        } else {
            const stream = request(data.feedUrl);
            const feedparser = new FeedParser({ addmeta: false });
            const feedItems = [];

            stream.on('response', function (response) {
                if (response.statusCode !== 200) {
                    res.status(response.statusCode).send({})
                } else {
                    this.pipe(feedparser);
                }
            });

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
    //  Using feedparser, extract the info from the RSS feed sent by the client.
    const feedparser = new FeedParser({ addmeta: false });

    try {
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

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));