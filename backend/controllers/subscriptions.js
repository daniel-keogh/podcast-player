const FeedParser = require('feedparser');
const fetch = require('node-fetch');
const { validationResult } = require('express-validator');
const Podcast = require('../models/podcast');
const redisClient = require('../db/redis');

exports.getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Podcast.find();
        res.status(200).json({ subscriptions });
    } catch (err) {
        err.status = 500;
        next(err);
    }
};

exports.getSubscription = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        throw error;
    }

    Podcast.findById(req.params.id)
        .then(sub => {
            if (!sub) {
                const error = new Error(`Subscription with ID "${req.params.id}" not found`);
                error.status = 404;
                throw error;
            }

            fetch(sub.feedUrl)
                .then(data => {
                    if (data.status !== 200) {
                        const error = new Error('Error fetching the feed');
                        error.status = data.status;
                        throw error;
                    }
                    return data.body;
                })
                .then(body => {
                    /* Get all the episodes of this podcast using feedparser.
                     * [https://www.npmjs.com/package/feedparser#usage].
                     */
                    const feedparser = new FeedParser({ addmeta: false });
                    const feedItems = [];

                    body.pipe(feedparser)
                        .on('readable', function () {
                            try {
                                // Read through each item in the feed and add it to the `feedItems` array.
                                const item = this.read();

                                if (item !== null) {
                                    feedItems.push({
                                        title: item.title,
                                        date: item.date,
                                        audio: item.enclosures[0]
                                    });
                                }
                            } catch (err) {
                                this.emit('error', err);
                            }
                        })
                        .on('end', function () {
                            // Send everything in the DB, as well as the `feedItems` array.
                            const data = {
                                _id: sub._id,
                                title: sub.title,
                                author: sub.author,
                                artwork: sub.artwork,
                                favourite: sub.favourite,
                                description: sub.description,
                                link: sub.link,
                                feedUrl: sub.feedUrl,
                            };

                            try {
                                // Cache with Redis
                                redisClient.setex(data._id + "", 600, JSON.stringify({
                                    ...data,
                                    episodes: feedItems
                                }));

                                res.status(200).json({
                                    ...data,
                                    episodes: feedItems.slice(0, req.query.limit)
                                });
                            } catch (err) {
                                this.emit('error', err);
                            }
                        })
                        .on('error', function (err) {
                            err.status = 500;
                            next(err);
                        });
                });
        })
        .catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
};

exports.addSubscription = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        throw error;
    }

    // Extract the podcast's information from the RSS feed sent by the client.
    fetch(req.body.feedUrl)
        .then(data => {
            if (data.status !== 200) {
                const error = new Error('Error fetching the feed');
                error.status = data.status;
                throw error;
            }
            return data.body;
        })
        .then(body => {
            const feedparser = new FeedParser({ addmeta: false });

            body.pipe(feedparser)
                .on('readable', async function () {
                    // All of the properties needed are in the `meta` section of the feed.
                    const podcast = new Podcast({
                        title: this.meta.title,
                        author: this.meta.author,
                        artwork: this.meta.image.url,
                        description: this.meta.description,
                        link: this.meta.link,
                        feedUrl: req.body.feedUrl
                    });

                    try {
                        const result = await podcast.save();
                        res.status(201).json({ result });
                    } catch (err) {
                        this.emit('error', err);
                    };
                })
                .on('error', function (err) {
                    err.status = 500;
                    next(err);
                });
        })
        .catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
};

exports.updateSubscription = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        throw error;
    }

    Podcast.findById(req.params.id)
        .then(podcast => {
            if (!podcast) {
                const error = new Error(`Podcast with ID "${req.params.id}" not found`);
                error.status = 404;
                throw error;
            }

            const { title, author, artwork, description, link, feedUrl, favourite } = req.body;

            podcast.title = title;
            podcast.author = author;
            podcast.artwork = artwork;
            podcast.description = description;
            podcast.link = link;
            podcast.feedUrl = feedUrl;
            podcast.favourite = favourite;

            return podcast.save();
        })
        .then(podcast => {
            res.status(200).json({ podcast });
        })
        .catch(err => {
            if (!err.status) {
                err.status = 500;
            }
            next(err);
        });
};

exports.deleteSubscription = async (req, res, next) => {
    try {
        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const error = new Error(errors.array()[0].msg);
            error.status = 422;
            throw error;
        }

        const sub = await Podcast.findByIdAndDelete(req.params.id);

        if (!sub) {
            const error = new Error(`Podcast with ID "${req.params.id}" not found`);
            error.status = 404;
            throw error;
        }

        res.status(204).send();
    } catch (err) {
        if (!err.status) {
            err.status = 500;
        }
        next(err);
    }
};
