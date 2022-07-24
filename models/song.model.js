const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    status: {
        type: String,
        default: 'active',

    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);   
    songSchema.virtual('favoriteSongs', {
        ref: 'favoriteSong',
        localField: '_id',
        foreignField: 'songId',
    });

const Song = mongoose.model('song', songSchema);
module.exports = { Song };