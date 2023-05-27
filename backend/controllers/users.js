const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userSchema = require('../models/user');
const {
  NotFoundError,
  UnathorizedError,
  BadRequestError,
  ConflictError,
} = require('../utils/error');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return userSchema
    .findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnathorizedError('incorrect email or password'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return next(new UnathorizedError('incorrect email or password'));
          }

          const token = jwt.sign({ _id: user._id }, 'secret-person-key', { expiresIn: '7d' });
          res.cookie('jwt', token, { maxAge: 3600000 * 24 * 7, httpOnly: true, sameSite: true });

          return res.status(200).send(user.toJSON());
        });
    })
    .catch(next);
};

module.exports.getUsers = (req, res, next) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  let userId;

  if (req.params.id) {
    userId = req.params.id;
  } else {
    userId = req.user._id;
  }

  console.log(userId);

  userSchema
    .findById(userId)
    .orFail()
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid data when get user'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new BadRequestError(`User Id: ${userId} is not found`));
      }

      return next(res);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    about,
    avatar,
    email,
    password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => userSchema.create({
      name,
      about,
      avatar,
      email,
      password: hash,
    }))
    .then((user) => {
      const userObj = user.toObject();
      delete userObj.password;
      res.status(201).send(userObj);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return next(new ConflictError('A user with such a email is already registered'));
      }

      if (err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid data when post user'));
      }

      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        return next(new NotFoundError('Invalid user id passed'));
      }

      return next(err);
    });
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.status(200).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        return next(new NotFoundError('Invalid user id passed'));
      }

      if (err.name === 'DocumentNotFoundError') {
        return next(new BadRequestError(`User Id: ${req.user._id} is not found`));
      }

      return next(err);
    });
};
