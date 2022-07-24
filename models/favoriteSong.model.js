const mongoose = require('mongoose');

const favoriteSongSchema = new mongoose.Schema({
    favorite: {
        type: Boolean,
        default: true,
    },
},{
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
);   

const FavoriteSong = mongoose.model('favoriteSong', favoriteSongSchema);
module.exports = { FavoriteSong };