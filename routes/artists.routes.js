const express = require('express');


const {
	getAllArtists,
	createArtist,
	getArtistById,
	updateArtist,
	deleteArtist,
} = require('../controllers/artists.controller');


const {
	createArtistValidators
} = require('../middlewares/validators.middleware');

const { artistExists } = require('../middlewares/artists.middleware');
const {
	protectSession,
} = require('../middlewares/auth.middleware');

const artistsRouter = express.Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post('/', createArtistValidators, createArtist);

artistsRouter
	.use('/:id', artistExists)
	.route('/:id')
	.get(getArtistById)
	.patch( updateArtist)
	.delete( deleteArtist);

module.exports = { artistsRouter };
