module.exports = (error, req, res, next) => {
  const statusCode = error.status || 500;
  let msg = error.message;

  if (statusCode === 500) {
    console.error(`[error]: ${error.stack}`);
    msg = "Internal Server Error";
  }

  res.status(statusCode).json({
    msg,
    statusCode,
  });
};
