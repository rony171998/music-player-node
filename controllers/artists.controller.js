const mongoose = require('mongoose');
const { ref, uploadBytes, getDownloadURL } = require('firebase/storage');

// Models
const { Artist } = require('../models/artist.model');
const { Album } = require('../models/album.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');
const { storage } = require('../utils/firebase.util');

const getAllArtists = catchAsync(async (req, res, next) => {

	const artists = await Artist.find({ status: 'active' })	// Find all artists with status active	

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
	
	const imgRef = ref(storage, `artists/${Date.now()}_${req.file.originalname}`);
	const imgRes = await uploadBytes(imgRef, req.file.buffer);

	const newArtist = await Artist.create({
		name,
		genre,
		imgUrl: imgRes.metadata.fullPath,
	});
		

	res.status(201).json({
		status: 'success',
		newArtist,
	});
});

const createAlbum = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;
	const { artistId } = req.params;

	const titleAlbulmExists = await Album.findOne({ title });

	if (titleAlbulmExists) {
		return next(new AppError('Title already taken', 400));
	}
	
	const imgRef = ref(storage, `albums/${Date.now()}_${req.file.originalname}`);
	const imgRes = await uploadBytes(imgRef, req.file.buffer);

	const newAlbum = await Album.create({
		artistId,
		title,
		genre,
		imgUrl: imgRes.metadata.fullPath,
	});
		

	res.status(201).json({
		status: 'success',
		newAlbum,
	});
});

const updateArtist = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	const artist = await Artist.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), { name }, { new: true });
	
	if (!artist) {
		return next(new AppError('Artist not found', 404));
	}
		
	res.status(204).json({ status: 'success',song });

});

const deleteArtist = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const artist = await Artist.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), { status: 'deleted' });
	
	if (!artist) {
		return next(new AppError('Artist not found', 404));
	}
		
	res.status(204).json({ status: 'success',song });
});

module.exports = {
	getAllArtists,
	createArtist,
	createAlbum,
	updateArtist,
	deleteArtist,
	
};
