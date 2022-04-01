const User = require("../models/User");

exports.isUniqueEmail = async (value, { req }) => {
  const user = await User.findOne({ email: value });

  if (user) {
    if (req.params.id && user._id === req.params.id) {
      return Promise.resolve();
    }

    return Promise.reject("A user with that email already exists");
  }
};

exports.isUserSubscribed = async (value, { req }) => {
  if (req.user.subscriptions.indexOf(value) === -1) {
    return Promise.reject("User is not subscribed to that feed");
  }
};
