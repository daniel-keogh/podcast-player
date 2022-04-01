const redis = require("redis");

const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_URL = process.env.REDIS_URL;

const RedisClient = (function () {
  const client = redis.createClient({
    host: REDIS_URL,
    port: REDIS_PORT,
  });

  client.on("connect", () => {
    console.log(`[info]: Connected to Redis on port ${REDIS_PORT}`);
  });

  client.on("error", (err) => {
    console.warn("[warning]: Unable to connect to Redis\n\t" + err);
    client.quit();
  });

  return client;
})();

module.exports = RedisClient;
