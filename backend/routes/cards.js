const cardRouter = require('express').Router();
const {
  validateCreateCard,
  validateDeleteCard,
  validateLikeCard,
  validateRemoveLikeCard,
} = require('../middlewares/celebrate');
const {
  getCards,
  createCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', validateCreateCard, createCard);
cardRouter.delete('/:cardId', validateDeleteCard, deleteCard);
cardRouter.put('/:cardId/likes', validateLikeCard, likeCard);
cardRouter.delete('/:cardId/likes', validateRemoveLikeCard, removeLikeCard);

module.exports = cardRouter;
