const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    genre: {
        type: String,
        required: [true, 'Genre is required'],
    },
    imgUrl: {
        type: String,
        required: [true, 'Image URL is required'],
    },
    status: {
        type: String,
        default: 'active',
    }
    },
    { 
        toJSON: { virtuals: true }, 
        toObject: { virtuals: true }
    }
);
    albumSchema.virtual('songs', {
        ref: 'song',
        localField: '_id',
        foreignField: 'albumId',
    });
const Album = mongoose.model('album', albumSchema);
module.exports = { Album };