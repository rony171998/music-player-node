const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    albumId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Album',
        required: [true, 'albumId is required']
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
        ref: 'FavoriteSong',
        localField: '_id',
        foreignField: 'songId',
    });

const Song = mongoose.model('song', songSchema);
module.exports = { Song };