const redis = require('redis');

const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient();

client.on('connect', (err) => {
    console.log(err || `[info] Connected to Redis on port ${REDIS_PORT}`);
});

module.exports = client;
