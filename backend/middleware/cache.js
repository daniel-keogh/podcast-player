const redisClient = require('../db/redis');

const getCachedJSON = async (key) => {
    return new Promise((resolve, reject) => {
        if (!redisClient.connected) {
            return reject();
        }

        redisClient.get(key, (err, data) => {
            if (err) {
                err.status = 500;
                throw err;
            }

            if (data) {
                resolve(JSON.parse(data));
            } else {
                reject();
            }
        });
    });
};

exports.getCachedSubscription = async (req, res, next) => {
    const { id } = req.params;
    const { limit } = req.query;
    const user = req.user;

    try {
        const { episodes, ...subscription } = await getCachedJSON(id);

        const isSubscribed = user.subscriptions.indexOf(subscription._id) !== -1;

        res.status(200).json({
            ...subscription,
            isSubscribed,
            episodes: episodes.slice(0, limit),
        });
    } catch (err) {
        next(err);
    }
};

exports.getCachedEpisodes = async (req, res, next) => {
    const { id } = req.params;
    const { limit } = req.query;

    try {
        const { episodes } = await getCachedJSON(id);

        res.status(200).json({
            episodes: episodes.slice(0, limit),
        });
    } catch (err) {
        next(err);
    }
};

exports.getCachedEpisodeByGuid = async (req, res, next) => {
    const { guid, id } = req.params;

    try {
        const { episodes } = await getCachedJSON(id);

        const result = episodes.filter((item) => item.guid === guid);

        res.status(200).json({
            episode: result?.length > 0 ? result[0] : {},
        });
    } catch (err) {
        next(err);
    }
};
