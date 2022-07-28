const express = require('express');


const {
	getAllSongs,
	createSong,
	updateSong,
	deleteSong,
	createFavoriteSong,
} = require('../controllers/songs.controller');


const {
	createSongValidators
} = require('../middlewares/validators.middleware');

const { songExists ,albumExists } = require('../middlewares/songs.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const songsRouter = express.Router();

songsRouter.get('/:albumId', getAllSongs);

songsRouter.use(protectSession);

songsRouter.post('/:albumId',albumExists, createSongValidators, createSong);

songsRouter.post('/favoriteSong/:id', songExists, createFavoriteSong);

songsRouter
	.use('/:id', songExists)
	.route('/:id')
	.patch( updateSong)
	.delete( deleteSong);

module.exports = { songsRouter };
