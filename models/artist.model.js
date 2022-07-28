const mongoose = require('mongoose');

const artistSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
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

    artistSchema.virtual('album', {
        ref: 'Album',
        localField: '_id',
        foreignField: 'artistId',
    });

const Artist = mongoose.model('artist', artistSchema);
module.exports = { Artist };