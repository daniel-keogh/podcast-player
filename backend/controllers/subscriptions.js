const Podcast = require("../models/Podcast");
const { parseSubscription, parseMeta } = require("../helpers/feedParsing");

/** Gets all the user's subscriptions. */
exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Podcast.where("_id").in(req.user.subscriptions).exec();

    res.status(200).json({ subscriptions });
  } catch (err) {
    next(err);
  }
};

/**
 * Gets a single subscription by its ID.
 * The parsed feed will be cached for 10 minutes.
 */
exports.getSubscription = async (req, res, next) => {
  try {
    const sub = await Podcast.findById(req.params.id);

    if (!sub) {
      const error = new Error(`Subscription with ID "${req.params.id}" not found`);
      error.status = 404;
      throw error;
    }

    const episodes = await parseSubscription(sub);

    // Send everything in the DB, as well as the `episodes` array.
    res.status(200).json({
      _id: sub._id,
      title: sub.title,
      author: sub.author,
      artwork: sub.artwork,
      subscriberCount: sub.subscriberCount,
      description: sub.description,
      link: sub.link,
      feedUrl: sub.feedUrl,
      isSubscribed: req.user.subscriptions.indexOf(sub._id) !== -1,
      episodes: episodes
        .map((item) => ({
          title: item.title,
          audio: item.audio,
          date: item.date,
          guid: item.guid,
        }))
        .slice(0, req.query.limit),
    });
  } catch (err) {
    next(err);
  }
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

        await Promise.all([req.user.save(), existingPodcast.save()]);

        return res.status(200).json({ result: existingPodcast });
      } else {
        const error = new Error("Already subscribed to that feed");
        error.status = 409;
        throw error;
      }
    }
  } catch (err) {
    return next(err);
  }

  // Extract the podcast's information from the RSS feed sent by the client.
  try {
    const data = await parseMeta(req.body.feedUrl);

    const podcast = new Podcast({
      ...data,
      feedUrl: req.body.feedUrl,
      subscriberCount: 1,
    });

    const result = await podcast.save();

    req.user.subscriptions.push(result._id);
    await req.user.save();

    res.status(201).json({ result });
  } catch (err) {
    next(err);
  }
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

      await Promise.all([req.user.save(), sub.save()]);

      res.status(204).send();
    }
  } catch (err) {
    next(err);
  }
};

/** Gets all episodes for a given subscription. */
exports.getAllEpisodes = async (req, res, next) => {
  try {
    const sub = await Podcast.findById(req.params.id);

    if (!sub) {
      const error = new Error(`Subscription with ID "${req.params.id}" not found`);
      error.status = 404;
      throw error;
    }

    const episodes = await parseSubscription(sub);

    res.status(200).json({
      episodes: episodes.slice(0, req.query.limit),
    });
  } catch (err) {
    next(err);
  }
};

/** Gets a single episode by its UUID. */
exports.getEpisode = async (req, res, next) => {
  try {
    const sub = await Podcast.findById(req.params.id);

    if (!sub) {
      const error = new Error(`Subscription with ID "${req.params.id}" not found`);
      error.status = 404;
      throw error;
    }

    const episodes = await parseSubscription(sub);
    const result = episodes.filter((item) => item.guid === req.params.guid);

    res.status(200).json({
      episode: result?.length > 0 ? result[0] : {},
    });
  } catch (err) {
    next(err);
  }
};
