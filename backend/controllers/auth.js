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
        .catch(next);
};

/** Logs a user in with their email & password and returns their auth token. */
exports.login = (req, res, next) => {
    const { email, password } = req.body;

    User.findOne({ email })
        .select('+password')
        .exec()
        .then(async (user) => {
            if (user) {
                // Validate password
                if (await bcrypt.compare(password, user.password)) {
                    return user;
                }
            }

            // Auth error
            const error = new Error('User email or password is incorrect');
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
        .catch(next);
};

/** Resets the user's old password with a new one. */
exports.passwordReset = (req, res, next) => {
    const { password, oldPassword } = req.body;

    User.findOne({ _id: req.user._id })
        .select('+password')
        .exec()
        .then(async (user) => {
            if (user) {
                // Check if the old password is correct
                if (await bcrypt.compare(oldPassword, user.password)) {
                    user.password = password;

                    await user.save();
                    
                    res.status(200).json({
                        msg: 'Password reset successfully',
                    });
                }
            }

            // Auth error
            const error = new Error('User email or password is incorrect');
            error.status = 401;
            throw error;
        })
        .catch(next);
};
