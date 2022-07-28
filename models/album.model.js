const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
    artistId: {
        type: mongoose.Schema.ObjectId,
        ref: 'Artist',
        required: [true, 'artistId is required']
    },
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
        ref: 'Song',
        localField: '_id',
        foreignField: 'albumId',
        required: [true, 'Album must have at least one song'],
    });
const Album = mongoose.model('album', albumSchema);
module.exports = { Album };