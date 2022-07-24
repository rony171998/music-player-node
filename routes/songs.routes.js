const express = require('express');


const {
	getAllSongs,
	createSong,
	getSongById,
	updateSong,
	deleteSong,
} = require('../controllers/songs.controller');


const {
	createSongValidators
} = require('../middlewares/validators.middleware');

const { songExists } = require('../middlewares/songs.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const songsRouter = express.Router();

songsRouter.get('/', getAllSongs);

songsRouter.use(protectSession);

songsRouter.post('/', createSongValidators, createSong);

songsRouter
	.use('/:id', songExists)
	.route('/:id')
	.get(getSongById)
	.patch( updateSong)
	.delete( deleteSong);

module.exports = { songsRouter };
