const fetch = require('node-fetch');
const { validationResult } = require('express-validator');

exports.search = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        throw error;
    }

    const term = 'term=' + req.query.term;
    const limit = 'limit=' + (req.query.limit || 15);

    // Search iTunes for podcasts related to the `term` query parameter sent by the client.
    fetch(`https://itunes.apple.com/search?${term}&${limit}&entity=podcast`)
        .then(data => data.json())
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
        .catch(next);
};
