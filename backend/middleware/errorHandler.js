module.exports = (error, req, res, next) => {
    const status = error.status || 500;

    if (error.status === 500) {
        console.log(`[error]: ${error.stack}`);
    }

    res.status(status).json({
        msg: error.message || 'Internal Server Error',
        statusCode: status
    });
};
