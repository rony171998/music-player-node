const express = require('express');


const {
	getAllArtists,
	createArtist,
	createAlbum,
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

// Utils
const { upload } = require('../utils/upload.util');

const artistsRouter = express.Router();

artistsRouter.get('/', getAllArtists);

artistsRouter.use(protectSession);

artistsRouter.post('/',upload.single('imgUrl'),createArtistValidators, createArtist);

artistsRouter.post('/albums/:id',upload.single('imgUrl'), createAlbum);

artistsRouter
	.use('/:id', artistExists)
	.route('/:id')
	.patch( updateArtist)
	.delete( deleteArtist);

module.exports = { artistsRouter };
