const mongoose = require('mongoose');

const favoriteSongSchema = new mongoose.Schema({
    favorite: {
        type: Boolean,
        default: true,
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: [true, 'userId is required']
    },
    songId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Song',
        required: [true, 'songId is required']
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);   

const FavoriteSong = mongoose.model('favoriteSong', favoriteSongSchema);
module.exports = { FavoriteSong };