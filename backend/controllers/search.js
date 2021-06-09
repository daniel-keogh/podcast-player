const fetch = require('node-fetch');
const User = require('../models/User');

exports.search = (req, res, next) => {
    const term = 'term=' + req.query.term;
    const limit = 'limit=' + (req.query.limit || 15);

    User.findFeedsByUserId(req.user._id)
        .then((feeds) => {
            // Search iTunes for podcasts related to the `term` query parameter sent by the client.
            fetch(`https://itunes.apple.com/search?${term}&${limit}&entity=podcast`)
                .then((data) => data.json())
                .then(async (data) => {
                    const results = data.results.map((result) => {
                        return {
                            title: result.collectionName,
                            author: result.artistName,
                            artwork: result.artworkUrl100,
                            feedUrl: result.feedUrl,
                            isSubscribed: feeds.indexOf(result.feedUrl) !== -1,
                        };
                    });

                    res.status(200).json({ results });
                });
        })
        .catch((err) => {
            err.status = 500;
            next(err);
        });
};
