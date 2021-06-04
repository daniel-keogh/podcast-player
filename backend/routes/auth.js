const express = require('express');
const { body } = require('express-validator');
const { login, passwordReset, registerUser } = require('../controllers/auth');
const { isUniqueEmail } = require('../helpers/validators');
const isValid = require('../middleware/isValid');

const router = express.Router();

router.post(
    '/register',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email address')
            .normalizeEmail()
            .custom(isUniqueEmail),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long')
            .isString()
            .withMessage('Password must be a string'),
    ],
    isValid,
    registerUser
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email address'),
        body('password')
            .notEmpty()
            .withMessage('Password cannot be empty')
            .isString()
            .withMessage('Password must be a string'),
    ],
    isValid,
    login
);

router.put(
    '/password_reset',
    [
        body('email')
            .isEmail()
            .withMessage('Email must be a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('Password must be at least 6 characters long'),
        body('oldPassword')
            .notEmpty()
            .withMessage('Old password cannot be empty')
            .isString()
            .withMessage('Old password must be a string'),
    ],
    isValid,
    passwordReset
);

module.exports = router;
