const express = require('express');


const {
	getAllUsers,
	createUser,
	login,
	updateUser,
	deleteUser,
	getUser,
} = require('../controllers/users.controller');

const {
	createUserValidators
} = require('../middlewares/validators.middleware');

const { userExists } = require('../middlewares/users.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.get(getUser)
	.patch(protectUserAccount, updateUser)
	.delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
