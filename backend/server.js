const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const FeedParser = require('feedparser');
const mongoose = require('mongoose');
const request = require('request');

const app = express();
const PORT = 4000;

const axios = require('axios');

const mongodb = require('./config/keys').mongoURI;
mongoose.connect(mongodb, { useNewUrlParser: true });

const PodcastModel = require('./models/podcast');

app.use(bodyParser());
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/api/subscriptions', (req, res) => {
    PodcastModel.find((err, subscriptions) => {
        if (subscriptions !== undefined && subscriptions.length !== 0) {
            res.json({ subscriptions })
        } else {
            res.json('{}');
        }
    });
});

/* Subscribe to a podcast. */
app.post('/api/subscriptions', (req, res) => {
    PodcastModel.create({
        _id: req.body.itunesID,
        name: req.body.name,
        artist: req.body.artist,
        genres: req.body.genres,
        artwork: req.body.artwork,
        feedUrl: req.body.feedUrl
    });
});

/* Retrieve information about a specific subscription. */
app.get('/api/subscriptions/:id', (req, res) => {
    PodcastModel.findById(req.params.id, (err, data) => {
        res.json(data);
    });
});

/* Delete a subscription i.e. unsubscribe. */
app.delete('/api/subscriptions/:id', (req, res) => {
    PodcastModel.findByIdAndDelete({ _id: req.params.id });
});

app.get('/api/top', (req, res) => {
    axios.get(`https://rss.itunes.apple.com/api/v1/us/podcasts/top-podcasts/all/50/explicit.json`)
        .then(data => {
            return data.data.feed.results;
        })
        .then(top => {
            res.status(200).send(top);
        });
});

/* Get info about a particular podcast by parsing its RSS feed.
 * The code here is based on this demo:
 * https://github.com/scripting/feedParserDemo 
 */
app.get('/api/podcast/:id', (req, res) => {
    PodcastModel.findById({ _id: req.params.id }, (err, data) => {
        const stream = request(data.feedUrl);
        const feedItems = [];
        const feedparser = new FeedParser({ addmeta: false });

        stream.on('response', function (res) {
            if (res.statusCode !== 200) {
                this.emit('error', new Error('Bad status code'));
            } else {
                stream.pipe(feedparser);
            }
        });

        stream.on('error', function (err) {
            console.log(err.message);
        });

        feedparser.on('readable', function () {
            let item;
            try {
                item = this.read();
                if (item !== null) {
                    const { title, summary, date, author, image, enclosures } = item;
                    feedItems.push({
                        title,
                        summary,
                        date,
                        author,
                        image,
                        audio: enclosures[0]
                    });
                }
            } catch (err) {
                console.log(err.message);
            }
        });

        feedparser.on('end', function () {
            res.json({
                title: this.meta.title,
                description: this.meta.description,
                link: this.meta.link,
                author: this.meta.author,
                image: this.meta.image,
                genres: this.meta.categories,
                episodes: feedItems
            });
        });

        feedparser.on('error', function (err) {
            console.log(err.message);
        });
    });
})

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));