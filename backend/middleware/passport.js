const { ExtractJwt, Strategy: JwtStrategy } = require("passport-jwt");
const passport = require("passport");
const User = require("../models/User");

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

/*
 * `jwt_payload` is an object literal containing the decoded JWT payload.
 * `done` is a passport error first callback accepting arguments done(error, user, info)
 *
 * Ref: http://www.passportjs.org/packages/passport-jwt/
 */
exports.jwtStrategy = new JwtStrategy(options, (jwt_payload, done) => {
  User.findById(jwt_payload._id, (err, user) => {
    if (err) {
      return done(err, false);
    }

    return done(null, user || false);
  });
});

exports.authenticate = (req, res, next) => {
  return passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      const error = new Error("Unauthorized");
      error.status = 401;
      return next(error);
    }

    // Attach user to request for next middleware to use
    req.user = user;
    next();
  })(req, res, next);
};
