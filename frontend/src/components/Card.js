import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card(card) {
  const currentUser = useContext(CurrentUserContext),
        cardOwner = currentUser._id === card.ownerId,
        isLiked = card.likes.some(i => i._id === currentUser._id),
        cardLikeButtonClassName = !isLiked ? 'card__like-icon' : 'card__like-icon card__like-icon_active';

  function handleClick() {
    card.onCardClick(card);
  }

  function handleLikeClick() {
    card.onCardLike(card);
  }

  function handleDeleteClick() {
    card.onCardDelete(card.id)
  }

  return (
    <li className="card">
      <img
        src={card.link}
        alt={card.name}
        className="card__img"
        onClick={handleClick}/>
      <h2 className="card__title">{card.name}</h2>
      {cardOwner &&
        <button
          type="button"
          className="card__delete"
          onClick={handleDeleteClick}/>}
      <div className="card__like-container">
        <button
          type="button"
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}/>
        <div className={'card__like-counter'}>{card.likes.length}</div>
      </div>
    </li>
  )
}

export default Card
