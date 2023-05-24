const cardRouter = require('express').Router();
const {
  getCards,
  postCard,
  deleteCard,
  likeCard,
  removeLikeCard,
} = require('../controllers/cards');

cardRouter.get('/', getCards);
cardRouter.post('/', postCard);
cardRouter.delete('/:cardId', deleteCard);
cardRouter.put('/:cardId/likes', likeCard);
cardRouter.delete('/:cardId/likes', removeLikeCard);

module.exports = cardRouter;
