const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'Name is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	password: {
		type: String,
		required: [true, 'Password is required'],
	},
	status: {
		type: String,
		default: 'active',
	},

	}, 
	{ 
		toJSON: { virtuals: true }, 
		toObject: { virtuals: true }
	}
);

userSchema.virtual('favoriteSongs', {
	ref: 'FavoriteSong',
	localField: '_id',
	foreignField: 'userId',
});

const User = mongoose.model('user', userSchema);

module.exports = { User };
