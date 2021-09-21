const fetch = require('node-fetch');
const FeedParser = require('feedparser');
const redisClient = require('../db/redis');

exports.parseSubscription = (subscription) => {
    return new Promise((resolve, reject) => {
        fetch(subscription.feedUrl)
            .then((data) => {
                if (data.status !== 200) {
                    const error = new Error('Error fetching the feed');
                    error.status = data.status;
                    return reject(error);
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

                            if (!!item) {
                                feedItems.push({
                                    guid: item.guid,
                                    title: item.title,
                                    author: item.author,
                                    description: item.description,
                                    date: item.date,
                                    audio: item.enclosures[0],
                                    image: item.image,
                                });
                            }
                        } catch (err) {
                            this.emit('error', err);
                        }
                    })
                    .on('end', function () {
                        try {
                            cacheSubscription(subscription, feedItems);
                            resolve(feedItems);
                        } catch (err) {
                            this.emit('error', err);
                        }
                    })
                    .on('error', function (err) {
                        reject(err);
                    });
            })
            .catch(reject);
    });
};

exports.parseMeta = (feedUrl) => {
    return new Promise((resolve, reject) => {
        fetch(feedUrl)
            .then((data) => {
                if (data.status !== 200) {
                    const error = new Error('Error fetching the feed');
                    error.status = data.status;
                    return reject(error);
                }
                return data.body;
            })
            .then((body) => {
                const feedparser = new FeedParser({ addmeta: false });

                body.pipe(feedparser)
                    .on('readable', function () {
                        // All of the properties needed are in the `meta` section of the feed.
                        resolve({
                            title: this.meta.title,
                            author: this.meta.author,
                            artwork: this.meta.image.url,
                            description: this.meta.description,
                            link: this.meta.link,
                        });
                    })
                    .on('error', function (err) {
                        reject(err);
                    });
            })
            .catch(reject);
    });
};

function cacheSubscription(subscription, episodes) {
    // Cache with Redis
    if (redisClient.connected) {
        const {
            _id,
            title,
            author,
            artwork,
            subscriberCount,
            description,
            link,
            feedUrl,
        } = subscription;

        redisClient.setex(
            _id + '',
            process.env.CACHE_DURATION || 600,
            JSON.stringify({
                _id,
                title,
                author,
                artwork,
                subscriberCount,
                description,
                link,
                feedUrl,
                episodes,
            })
        );
    }
}
