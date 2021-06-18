const fetch = require('node-fetch');
const FeedParser = require('feedparser');
const Podcast = require('../models/Podcast');
const redisClient = require('../db/redis');

/** Gets all the user's subscriptions. */
exports.getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Podcast
            .where('_id')
            .in(req.user.subscriptions)
            .exec();

        res.status(200).json({ subscriptions });
    } catch (err) {
        next(err);
    }
};

/**
 * Gets a single subscription by its ID.
 * The parsed feed will be cached for 10 minutes.
 */
exports.getSubscription = (req, res, next) => {
    Podcast.findById(req.params.id)
        .then((sub) => {
            if (!sub) {
                const error = new Error(`Subscription with ID "${req.params.id}" not found`);
                error.status = 404;
                throw error;
            }

            fetch(sub.feedUrl)
                .then((data) => {
                    if (data.status !== 200) {
                        const error = new Error('Error fetching the feed');
                        error.status = data.status;
                        throw error;
                    }
                    return data.body;
                })
                .then((body) => {
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
                                        audio: item.enclosures[0],
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
                                subscriberCount: sub.subscriberCount,
                                description: sub.description,
                                link: sub.link,
                                feedUrl: sub.feedUrl,
                                isSubscribed: req.user.subscriptions.indexOf(sub._id) !== -1
                            };

                            try {
                                // Cache with Redis
                                redisClient.setex(
                                    data._id + '',
                                    600,
                                    JSON.stringify({
                                        ...data,
                                        episodes: feedItems,
                                    })
                                );

                                res.status(200).json({
                                    ...data,
                                    episodes: feedItems.slice(
                                        0,
                                        req.query.limit
                                    ),
                                });
                            } catch (err) {
                                this.emit('error', err);
                            }
                        })
                        .on('error', function (err) {
                            next(err);
                        });
                });
        })
        .catch(next);
};

/**
 * Adds a new subscription for the current user.
 * If the podcast already exists then that one is returned instead of creating a new one.
 */
exports.addSubscription = async (req, res, next) => {
    // Handle the scenario where the feed already exists in the DB
    try {
        const existingPodcast = await Podcast.findOne({
            feedUrl: req.body.feedUrl,
        });

        if (existingPodcast) {
            // Make sure the user isn't already subscribed
            if (req.user.subscriptions.indexOf(existingPodcast._id) === -1) {
                req.user.subscriptions.push(existingPodcast._id);

                existingPodcast.subscriberCount++;
                
                await Promise.all([
                    req.user.save(), 
                    existingPodcast.save(),
                ]);

                return res.status(200).json({ result: existingPodcast });
            } else {
                const error = new Error('Already subscribed to that feed');
                error.status = 409;
                throw error;
            }
        }
    } catch (err) {
        return next(err);
    }

    // Extract the podcast's information from the RSS feed sent by the client.
    fetch(req.body.feedUrl)
        .then((data) => {
            if (data.status !== 200) {
                const error = new Error('Error fetching the feed');
                error.status = data.status;
                throw error;
            }
            return data.body;
        })
        .then((body) => {
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
                        feedUrl: req.body.feedUrl,
                        subscriberCount: 1,
                    });

                    try {
                        const result = await podcast.save();

                        req.user.subscriptions.push(result._id);
                        await req.user.save();

                        res.status(201).json({ result });
                    } catch (err) {
                        this.emit('error', err);
                    }
                })
                .on('error', function (err) {
                    next(err);
                });
        })
        .catch(next);
};

/**
 * Removes a feed from the user's subscriptions.
 */
exports.deleteSubscription = async (req, res, next) => {
    try {
        const sub = await Podcast.findById(req.params.id);

        if (!sub) {
            const error = new Error(`Podcast with ID "${req.params.id}" not found`);
            error.status = 404;
            throw error;
        } else {
            const index = req.user.subscriptions.indexOf(req.params.id);
            req.user.subscriptions.splice(index, 1);

            sub.subscriberCount--;

            await Promise.all([
                req.user.save(),
                sub.save(),
            ]);

            res.status(204).send();
        }
    } catch (err) {
        next(err);
    }
};
