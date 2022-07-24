const mongoose = require('mongoose');

// Models
const { Album } = require('../models/album.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllAlbums = catchAsync(async (req, res, next) => {

	const albums = await Album.find({ status: 'active' })
		.populate({
			path: 'artist',
			match: { status: 'active' },
			
		})
		.populate('songs');

	res.status(200).json({
		status: 'success',
		albums,
	});
});

const createAlbum = catchAsync(async (req, res, next) => {
	const { title , genre } = req.body;

	const albumExists = await Album.findOne({ title });

	if (albumExists) {
		return next(new AppError('Title already taken', 400));
	}
	
	const blobName = `${Date.now()}_${req.file.originalname}`;

	 await uploadImage(req.file, blobName);

	const newAlbum = await Album.create({
		title,
		genre,
		imgUrl: blobName,
	});

	res.status(201).json({
		status: 'success',
		newAlbum,
	});
});

const getAlbumById = catchAsync(async (req, res, next) => {
	const { album } = req;

	res.status(200).json({
		status: 'success',
		album,
	});
});

const updateAlbum = catchAsync(async (req, res, next) => {
	const { album } = req;
	const { name } = req.body;

	await album.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteAlbum = catchAsync(async (req, res, next) => {
	const { album } = req;

	await album.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllAlbums,
	createAlbum,
	getAlbumById,
	updateAlbum,
	deleteAlbum,
	
};
