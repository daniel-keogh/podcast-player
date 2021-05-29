const express = require('express');
const { body, param } = require('express-validator');
const { deleteUser, getUser, updateUser } = require('../controllers/users');
const { isUniqueEmail } = require('../helpers/validators');
const { authenticate } = require('../middleware/passport');
const isValid = require('../middleware/isValid');

const router = express.Router();

router.get(
    '/:id',
    authenticate,
    [
        param('id')
            .isMongoId()
            .withMessage('id is invalid')
    ],
    isValid,
    getUser
);

router.put(
    '/:id',
    authenticate,
    [
        param('id')
            .isMongoId()
            .withMessage('id is invalid'),
        body('email')
            .isEmail()
            .withMessage('email must be a valid email address')
            .custom(isUniqueEmail),
    ],
    isValid,
    updateUser
);

router.delete(
    '/:id',
    authenticate,
    [
        param('id')
            .isMongoId()
            .withMessage('id is invalid')
    ],
    isValid,
    deleteUser
);

module.exports = router;
