const mongoose = require('mongoose');

// Models
const { Artist } = require('../models/artist.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllArtists = catchAsync(async (req, res, next) => {

	const artists = await Artist.find({ status: 'active' })
		.populate({
			path: 'album',
			match: { status: 'active' },
			
		})
		.populate('songs');

	res.status(200).json({
		status: 'success',
		artists,
	});
});

const createArtist = catchAsync(async (req, res, next) => {
	const { name, genre } = req.body;

	const artistExists = await Artist.findOne({ name });

	if (artistExists) {
		return next(new AppError('Name already taken', 400));
	}
	
	const blobName = `${Date.now()}_${req.file.originalname}`;

	 await uploadImage(req.file, blobName);

	const newArtist = await Artist.create({
		name,
		genre,
		imgUrl: blobName,
	});

	res.status(201).json({
		status: 'success',
		newArtist,
	});
});

const getArtistById = catchAsync(async (req, res, next) => {
	const { artist } = req;

	res.status(200).json({
		status: 'success',
		artist,
	});
});

const updateArtist = catchAsync(async (req, res, next) => {
	const { artist } = req;
	const { name } = req.body;

	await artist.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteArtist = catchAsync(async (req, res, next) => {
	const { artist } = req;

	await artist.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllArtists,
	createArtist,
	getArtistById,
	updateArtist,
	deleteArtist,
	
};
