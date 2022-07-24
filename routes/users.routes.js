const express = require('express');


const {
	getAllUsers,
	createUser,
	login,
	getUserById,
	updateUser,
	deleteUser,
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

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.get('/', getAllUsers);

usersRouter.use(protectSession);

usersRouter
	.use('/:id', userExists)
	.route('/:id')
	.get(getUserById)
	.patch(protectUserAccount, updateUser)
	.delete(protectUserAccount, deleteUser);

module.exports = { usersRouter };
