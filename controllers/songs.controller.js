const mongoose = require('mongoose');

// Models
const { Song } = require('../models/song.model');
const { Album } = require('../models/album.model');
const { FavoriteSong } = require('../models/favoriteSong.model');
const { User } = require('../models/user.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const getAllSongs = catchAsync(async (req, res, next) => {
	const { albumId } = req.params;	

	const songs = await Song.find({ albumId, status: 'active' })	

	res.status(200).json({
		status: 'success',
		songs,
	});
});

const createSong = catchAsync(async (req, res, next) => {
	const { albumId } = req.params;
	const { title } = req.body;

	
	const albumExists = await Album.findOne({ id: albumId, status: 'active' });

	if (!albumExists) {
		return next(new AppError('Album not found', 404));
	}
	const songExists = await Song.findOne({ title });

	if (songExists) {
		return next(new AppError('Title already taken', 400));
	}

	const newSong = await Song.create({
		title,
		albumId: albumId,
	});

	res.status(201).json({
		status: 'success',
		newSong,
	});
});

const createFavoriteSong = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { sessionUser } = req;

	const userExists = await User.findOne({ id: sessionUser.id, status: 'active' });

	if (!userExists) {
		return next(new AppError('User not found', 404));
	}

	const songExists = await Song.findOne({ id: id, status: 'active' });

	if (!songExists) {
		return next(new AppError('Song not found', 404));
	}

	const newFavoriteSong = await FavoriteSong.create({
		userId: sessionUser.id,
		songId: id,
	});

	res.status(201).json({
		status: 'success',
		newFavoriteSong,
	});
})

const updateSong = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { title } = req.body;

	const song = await Song.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), { title }, { new: true });
	
	if (!song) {
		return next(new AppError('Song not found', 404));
	}
		
	res.status(204).json({ status: 'success',song });
});

const deleteSong = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const song = await Song.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), { status: 'deleted' });
	if (!song) {
		return next(new AppError('Song not found', 404));
	}
	res.status(204).json({ status: 'success' });
});

module.exports = {
	getAllSongs,
	createSong,
	updateSong,
	deleteSong,
	createFavoriteSong,
	
};
