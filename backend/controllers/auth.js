const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

/** Creates a new user. */
exports.registerUser = (req, res, next) => {
    const { email, password } = req.body;

    new User({ email, password })
        .save()
        .then((user) => {
            const { _id, email, registeredSince } = user;

            res.status(201).json({
                _id,
                email,
                registeredSince,
            });
        })
        .catch((err) => {
            err.status = 500;
            next(err);
        });
};

/** Logs a user in with their email & password and returns their auth token. */
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .select('+password +salt')
        .exec()
        .then(async (user) => {
            if (user) {
                // Validate password
                const hash = await bcrypt.hash(password, user.salt);
                if (hash === user.password) {
                    return user;
                }
            }

            // Auth error
            const error = new Error();
            error.status = 401;
            throw error;
        })
        .then((user) => {
            const { _id, email, registeredSince } = user;

            const token = jwt.sign(
                {
                    _id,
                    email,
                    registeredSince,
                },
                process.env.JWT_SECRET
            );

            res.status(200).json({
                msg: 'User logged in successfully',
                _id,
                token,
            });
        })
        .catch((err) => {
            if (err.status === 401) {
                err.message = 'User email or password is incorrect';
            } else {
                err.status = 500;
            }
            next(err);
        });
};

/** Resets the user's old password with a new one. */
exports.passwordReset = (req, res, next) => {
    const { email, password, oldPassword } = req.body;

    User.findOne({ email })
        .select('+password +salt')
        .exec()
        .then(async (user) => {
            if (user) {
                // Check if the old password is correct
                const hash = await bcrypt.hash(oldPassword, user.salt);
                if (hash === user.password) {
                    user.password = password;
                    await user.save();
                    res.status(200).json({
                        msg: 'Password reset successfully',
                    });
                }
            }

            // Auth error
            const error = new Error();
            error.status = 401;
            throw error;
        })
        .catch((err) => {
            if (err.status === 401) {
                err.message = 'User email or password is incorrect';
            } else {
                err.status = 500;
            }
            next(err);
        });
};
