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
		minlength: [8, 'Password must be at least 8 characters long'],
		select: false,
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
	ref: 'favoriteSong',
	localField: '_id',
	foreignField: 'userId',
});

const User = mongoose.model('user', userSchema);

module.exports = { User };
