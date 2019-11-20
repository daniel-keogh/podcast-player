const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
    title: String,
    author: String,
    artwork: String,
    description: String,
    link: String,
    feedUrl: String,
    favourite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('podcast', PodcastSchema);