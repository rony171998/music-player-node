// Models
const { Song } = require('../models/song.model');

// Utils
const { AppError } = require('../utils/appError.util');
const { catchAsync } = require('../utils/catchAsync.util');

const songExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const song = await Song.findOne({ where: { id ,status:"active"  }  });

	if (!song) {
		return next(new AppError('Song not found', 404));
	}

	req.song = song;
	next();
});

module.exports = { songExists };
