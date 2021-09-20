const redisClient = require('../db/redis');

exports.getCachedSubscription = (req, res, next) => {
    if (!redisClient.connected) {
        return next();
    }

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

exports.getCachedEpisodes = (req, res, next) => {
    if (!redisClient.connected) {
        return next();
    }

    redisClient.get(req.params.id, (err, data) => {
        if (err) {
            err.status = 500;
            throw err;
        }

        if (data) {
            const { episodes } = JSON.parse(data);

            res.status(200).json({
                episodes: episodes.slice(0, req.query.limit),
            });
        } else {
            next();
        }
    });
};

exports.getCachedEpisodeByGuid = (req, res, next) => {
    if (!redisClient.connected) {
        return next();
    }

    redisClient.get(req.params.id, (err, data) => {
        if (err) {
            err.status = 500;
            throw err;
        }

        if (data) {
            const { episodes } = JSON.parse(data);
            const guid = req.params.guid;

            const result = episodes.filter((item) => item.guid === guid);

            res.status(200).json({
                episodes: result?.length > 0 ? result[0] : {},
            });
        } else {
            next();
        }
    });
};
