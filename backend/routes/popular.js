const express = require('express');
const { query } = require('express-validator');
const { getPopular } = require('../controllers/popular');
const { authenticate } = require('../middleware/passport');
const isValid = require('../middleware/isValid');

const router = express.Router();

router.get(
    '/',
    authenticate,
    [
        query('limit')
            .isInt({ min: 1 })
            .withMessage('Limit must be greater than zero')
            .optional(),
        query('order')
            .matches(/^(DESC|ASC)$/i)
            .withMessage('Order must be either DESC or ASC')
            .optional(),
    ],
    isValid,
    getPopular
);

module.exports = router;
