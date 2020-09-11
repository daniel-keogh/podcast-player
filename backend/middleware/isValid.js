const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error(errors.array()[0].msg);
        error.status = 422;
        throw error;
    } else {
        next();
    }
};
