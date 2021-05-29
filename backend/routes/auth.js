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
            .withMessage('email must be a valid email address')
            .normalizeEmail()
            .custom(isUniqueEmail),
        body('password')
            .isLength({ min: 6 })
            .withMessage('password must be at least 6 characters long')
            .isString()
            .withMessage('password must be a string'),
    ],
    isValid,
    registerUser
);

router.post(
    '/login',
    [
        body('email')
            .isEmail()
            .withMessage('email must be a valid email address'),
        body('password')
            .notEmpty()
            .withMessage('password cannot be empty')
            .isString()
            .withMessage('password must be a string'),
    ],
    isValid,
    login
);

router.put(
    '/password_reset',
    [
        body('email')
            .isEmail()
            .withMessage('email must be a valid email address'),
        body('password')
            .isLength({ min: 6 })
            .withMessage('password must be at least 6 characters long'),
        body('old_password')
            .notEmpty()
            .withMessage('old_password cannot be empty')
            .isString()
            .withMessage('old_password must be a string'),
    ],
    isValid,
    passwordReset
);

module.exports = router;
