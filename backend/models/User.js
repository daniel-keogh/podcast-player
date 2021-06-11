const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Podcast = require('./Podcast');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
        minlength: 6,
    },
    salt: {
        type: String,
        select: false,
    },
    registeredSince: {
        type: Date,
        default: Date.now,
    },
    subscriptions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Podcast',
        },
    ],
});

/** Returns an array of all the feeds the user is subscribed to. */
UserSchema.statics.findFeedsByUserId = async function (id) {
    const user = await this.findById(id).populate('subscriptions', 'feedUrl');
    return user.subscriptions.map((n) => n.feedUrl);
};

UserSchema.pre('save', async function (next) {
    // If the password has been updated, always make sure the
    // new password is hashed before saving to the database
    if (!this.isModified('password')) {
        next();
    }

    try {
        this.salt = await bcrypt.genSalt();
        this.password = await bcrypt.hash(this.password, this.salt);
        next();
    } catch (err) {
        next(err);
    }
});

UserSchema.pre('deleteOne', { document: true }, async function (next) {
    try {
        // Decrement subscriber count
        await Podcast.updateMany(
            { _id: { $in: this.subscriptions } },
            { $inc: { subscriberCount: -1 } }
        );
        next();
    } catch (err) {
        next(err);
    }
});

module.exports = mongoose.model('User', UserSchema);
