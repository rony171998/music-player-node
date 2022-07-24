const { body, validationResult, param } = require('express-validator');

const { AppError } = require('../utils/appError.util');

const checkResult = (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		
		const errorMsgs = errors.array().map(err => err.msg);

		const message = errorMsgs.join('. ');

		return next(new AppError(message, 400));
	}

	next();
};

const createUserValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('email').isEmail().withMessage('Must provide a valid email'),
	body('password')
		.isLength({ min: 8 })
		.withMessage('Password must be at least 8 characters long')
		.isAlphanumeric()
		.withMessage('Password must contain letters and numbers'),
	checkResult,
];

const createArtistValidators = [
	body('name').notEmpty().withMessage('Name cannot be empty'),
	body('genre').notEmpty().withMessage('Genre cannot be empty'),
	body('imgUrl').notEmpty().withMessage('Image URL cannot be empty'),
	checkResult,
];

const createSongValidators = [
	body('title').notEmpty().withMessage('Title cannot be empty'),
]



module.exports = { 
	createUserValidators  ,
	createArtistValidators,
	createSongValidators,
};
