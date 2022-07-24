const mongoose = require('mongoose');

// Models
const { Song } = require('../models/song.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllSongs = catchAsync(async (req, res, next) => {

	const songs = await Song.find({ status: 'active' })
		.populate({
			path: 'album',
			match: { status: 'active' },
			
		})
		.populate('artist');

	res.status(200).json({
		status: 'success',
		songs,
	});
});

const createSong = catchAsync(async (req, res, next) => {
	const { title } = req.body;

	const songExists = await Song.findOne({ title });

	if (songExists) {
		return next(new AppError('Title already taken', 400));
	}

	const newSong = await Song.create({
		title,		
	});

	res.status(201).json({
		status: 'success',
		newSong,
	});
});

const getSongById = catchAsync(async (req, res, next) => {
	const { song } = req;

	res.status(200).json({
		status: 'success',
		song,
	});
});

const updateSong = catchAsync(async (req, res, next) => {
	const { song } = req;
	const { title } = req.body;

	await song.update({ title });

	res.status(204).json({ status: 'success' });
});

const deleteSong = catchAsync(async (req, res, next) => {
	const { song } = req;

	await song.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllSongs,
	createSong,
	getSongById,
	updateSong,
	deleteSong,
	
};
