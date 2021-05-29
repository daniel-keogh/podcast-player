const redisClient = require('../db/redis');

exports.getCachedSubscription = (req, res, next) => {
    redisClient.get(req.params.id, (err, data) => {
        if (err) {
            err.status = 500;
            throw err;
        }

        if (data) {
            const { episodes, ...subscription } = JSON.parse(data);

            res.status(200).json({
                ...subscription,
                episodes: episodes.slice(0, req.query.limit),
            });
        } else {
            next();
        }
    });
};
