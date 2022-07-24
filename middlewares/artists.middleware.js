// Models
const { Artist } = require('../models/artist.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const artistExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const artist = await Artist.findOne({ where: { id ,status:"active"  }  });

	if (!artist) {
		return next(new AppError('Artist not found', 404));
	}

	req.artist = artist;
	next();
});

module.exports = { artistExists };
