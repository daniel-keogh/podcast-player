const redisClient = require('../db/redis');

exports.getCachedSubscription = (req, res, next) => {
    redisClient.get(req.params.id, (err, data) => {
        if (err) {
            err.status = 500;
            throw err;
        }

        if (data) {
            const { episodes, ...subscription } = JSON.parse(data);
            const isSubscribed = req.user.subscriptions.indexOf(subscription._id) !== -1;

            res.status(200).json({
                ...subscription,
                isSubscribed,
                episodes: episodes.slice(0, req.query.limit),
            });
        } else {
            next();
        }
    });
};
