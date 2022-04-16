const fetch = require("node-fetch");
const User = require("../models/User");

exports.search = (req, res, next) => {
  const term = "term=" + req.query.term;
  const limit = "limit=" + (req.query.limit || 10);

  User.findFeedsByUserId(req.user._id)
    .then((feeds) => {
      // Search iTunes for podcasts related to the `term` query parameter sent by the client.
      fetch(`https://itunes.apple.com/search?${term}&${limit}&entity=podcast`)
        .then((data) => data.json())
        .then((data) => {
          const results = [];
          const set = new Set();

          for (const result of data.results) {
            if (!set.has(result.feedUrl)) {
              set.add(result.feedUrl);

              results.push({
                title: result.collectionName,
                author: result.artistName,
                artwork: result.artworkUrl100,
                feedUrl: result.feedUrl,
                subscriptionId: feeds[result.feedUrl],
              });
            }
          }

          res.status(200).json({ results });
        });
    })
    .catch(next);
};
