const Podcast = require("../models/Podcast");

exports.getPopular = async (req, res, next) => {
  const limit = +req.query.limit || 10;
  const order = req.query.order?.toUpperCase() === "ASC" ? 1 : -1;

  try {
    const results = await Podcast.find().sort({ subscriberCount: order }).limit(limit).exec();

    res.status(200).json({ results });
  } catch (err) {
    next(err);
  }
};
