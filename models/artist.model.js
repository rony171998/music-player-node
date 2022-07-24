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
        ref: 'album',
        localField: '_id',
        foreignField: 'artistId',
    });

const Artist = mongoose.model('artist', artistSchema);
module.exports = { Artist };