const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const PodcastSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    author: {
        type: String,
        required: true,
        trim: true
    },
    artwork: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    link: {
        type: String,
        required: true,
        trim: true
    },
    feedUrl: {
        type: String,
        required: true,
        trim: true,
    },
    favourite: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('podcast', PodcastSchema);
