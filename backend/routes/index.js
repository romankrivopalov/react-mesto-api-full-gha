const router = require('express').Router();
const { errors } = require('celebrate');
const { validateLogin, validateCreateUser } = require('../middlewares/celebrate');
const { validateToken } = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { BadRequestError } = require('../utils/error/index');

router.post('/signin', validateLogin, login);
router.post('/signup', validateCreateUser, createUser);

router.use('/users', validateToken, usersRouter);
router.use('/cards', validateToken, cardsRouter);
router.use('/*', validateToken, (req, res, next) => next(new BadRequestError('This page not found')));
router.use(errors());

module.exports = router;
