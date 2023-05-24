const userSchema = require('../models/user');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  dafaultErrorMessage,
} = require('../utils/constants');

module.exports.getUsers = (req, res) => {
  userSchema
    .find({})
    .then((users) => res.send(users))
    .catch(() => res.status(errCodeDefault).send({ message: dafaultErrorMessage }));
};

module.exports.getUserById = (req, res) => {
  const { id } = req.params;
  userSchema.findById(id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when get user' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errCodeNotFound)
          .send({ message: `User Id: ${id} is not found` });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.postUsers = (req, res) => {
  const { name, about, avatar } = req.body;

  userSchema.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when post user' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;

  userSchema.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid user id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errCodeNotFound)
          .send({ message: `User Id: ${req.user._id} is not found` });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};
