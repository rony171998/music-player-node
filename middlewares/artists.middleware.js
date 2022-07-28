// Models
const { Artist } = require('../models/artist.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const artistExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const artist = await Artist.findById(id.match(/^[0-9a-fA-F]{24}$/), { status: 'active' });
	
	if (!artist) {
		return next(new AppError('Artist not found', 404));
	}

	req.artist = artist;
	next();
});

module.exports = { artistExists };
