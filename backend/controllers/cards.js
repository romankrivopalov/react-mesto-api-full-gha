const cardSchema = require('../models/card');
const {
  errCodeInvalidData,
  errCodeNotFound,
  errCodeDefault,
  dafaultErrorMessage,
} = require('../utils/constants');

module.exports.getCards = (req, res) => {
  cardSchema
    .find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(errCodeDefault).send({ message: dafaultErrorMessage }));
};

module.exports.postCard = (req, res) => {
  const { name, link } = req.body;

  cardSchema
    .create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when post card' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.deleteCard = (req, res) => {
  const { cardId } = req.params;

  cardSchema
    .findByIdAndRemove(cardId)
    .orFail()
    .then((card) => res.status(200).send(card))
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid card id passed' });

        return;
      }

      if (err.name === 'DocumentNotFoundError') {
        res
          .status(errCodeNotFound)
          .send({ message: `Card Id: ${cardId} is not found` });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.likeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res
          .status(errCodeNotFound)
          .send({ message: `Card Id: ${req.params.cardId} is not found` });

        return;
      }

      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when like card' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};

module.exports.removeLikeCard = (req, res) => {
  cardSchema.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        return res
          .status(errCodeNotFound)
          .send({ message: `Card Id: ${req.params.cardId} is not found` });
      }

      return res.status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError' || err.name === 'ValidationError') {
        res
          .status(errCodeInvalidData)
          .send({ message: 'Invalid data when delete card like' });

        return;
      }

      res
        .status(errCodeDefault)
        .send({ message: dafaultErrorMessage });
    });
};
