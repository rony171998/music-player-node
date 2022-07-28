const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Models
const { User } = require('../models/user.model');


// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: './config.env' });

const getAllUsers = catchAsync(async (req, res, next) => {
	
	const users = await User.find({ status: 'active' }, '-password')
		
	res.status(200).json({
		status: 'success',
		users,
	});
});

const createUser = catchAsync(async (req, res, next) => {
	const { name, age, email, password } = req.body;

	const userExists = await User.findOne({ email });

	if (userExists) {
		return next(new AppError('Email already taken', 400));
	}

	// Hash password
	const salt = await bcrypt.genSalt(12);
	const hashPassword = await bcrypt.hash(password, salt);

	const newUser = await User.create({
		name,
		age,
		email,
		password: hashPassword,
	});

	// Remove password from response
	newUser.password = undefined;

	// Send welcome email
	// await new Email(email).sendWelcome(name);

	res.status(201).json({
		status: 'success',
		newUser,
	});
});

const updateUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;
	const { name } = req.body;

	const user = await User.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), {name} , { new: true });
	if (!user) {
		return next(new AppError('User not found', 404));
	}
	res.status(204).json({ status: 'success' });

	
});

const deleteUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findByIdAndUpdate(id.match(/^[0-9a-fA-F]{24}$/), { status: 'deleted' });
	if (!user) {
		return next(new AppError('User not found', 404));
	}
	res.status(204).json({ status: 'success' });
});

const login = catchAsync(async (req, res, next) => {
	const { email, password } = req.body;

	// Validate credentials (email)
	const user = await User.findOne({
		email,
		status: 'active',
	});

	if (!user) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Validate password
	const isPasswordValid = await bcrypt.compare(password, user.password);

	if (!isPasswordValid) {
		return next(new AppError('Credentials invalid', 400));
	}

	// Generate JWT (JsonWebToken) ->
	const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
		expiresIn: '30d',
	});

	// Send response
	res.status(200).json({
		status: 'success',
		token,
		user,
	});
});

const getUser = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const user = await User.findById(id.match(/^[0-9a-fA-F]{24}$/), { status: 'active' });

	/*if (!user) {
		return next(new AppError('User not found', 404));
	}*/

	res.status(200).json({
		status: 'success',
		user,
	});
});

module.exports = {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
	getUser,
};
