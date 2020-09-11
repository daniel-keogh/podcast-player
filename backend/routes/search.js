const express = require('express');
const { query } = require('express-validator');
const { search } = require('../controllers/search');
const isValid = require('../middleware/isValid');

const router = express.Router();

router.get('/', [
    query('limit')
        .isInt({ min: 1 })
        .withMessage('limit must be greater than zero')
        .optional(),
    query('term')
        .notEmpty()
        .withMessage('term cannot be empty')
        .isString()
        .withMessage('term must be a string')
], isValid, search);

module.exports = router;
