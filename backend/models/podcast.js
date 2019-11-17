const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
    _id: Number,
    name: String,
    artist: String,
    genres: [String],
    artwork: String,
    feedUrl: String,
    isFavourite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('podcast', PodcastSchema);