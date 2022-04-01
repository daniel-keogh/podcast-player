const express = require("express");
const { body, query, param } = require("express-validator");
const {
  getAllSubscriptions,
  getSubscription,
  addSubscription,
  deleteSubscription,
  getAllEpisodes,
  getEpisode,
} = require("../controllers/subscriptions");
const {
  getCachedSubscription,
  getCachedEpisodes,
  getCachedEpisodeByGuid,
} = require("../middleware/cache");
const { authenticate } = require("../middleware/passport");
const isValid = require("../middleware/isValid");
const { isUserSubscribed } = require("../helpers/validators");

const router = express.Router();

router.get("/", authenticate, getAllSubscriptions);

router.get(
  "/:id",
  authenticate,
  [
    param("id").isMongoId().withMessage("ID is invalid"),
    query("limit")
      .isInt({ min: 1 })
      .withMessage("Limit must be a number greater than zero")
      .optional(),
  ],
  isValid,
  getCachedSubscription,
  getSubscription
);

router.post(
  "/",
  authenticate,
  [
    body("feedUrl")
      .notEmpty()
      .withMessage("Feed URL cannot be empty")
      .isURL()
      .withMessage("Feed URL must be a valid URL"),
  ],
  isValid,
  addSubscription
);

router.delete(
  "/:id",
  authenticate,
  [param("id").isMongoId().withMessage("ID is invalid").custom(isUserSubscribed)],
  isValid,
  deleteSubscription
);

router.get(
  "/:id/episodes",
  authenticate,
  [
    param("id").isMongoId().withMessage("ID is invalid"),
    query("limit").isInt({ min: 1 }).withMessage("Limit must be greater than zero").optional(),
  ],
  isValid,
  getCachedEpisodes,
  getAllEpisodes
);

router.get(
  "/:id/episodes/:guid",
  authenticate,
  [
    param("id").isMongoId().withMessage("ID is invalid"),
    param("guid")
      .notEmpty()
      .withMessage("GUID cannot be empty")
      .isString()
      .withMessage("GUID must be a string"),
  ],
  isValid,
  getCachedEpisodeByGuid,
  getEpisode
);

module.exports = router;
