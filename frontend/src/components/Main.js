import { useContext } from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Card from "./Card.js";

function Main(props) {

  const userData = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile container">
        <button
          style={{ backgroundImage: `url(${userData.avatar})` }}
          className="profile__btn-edit-avatar"
          onClick={() => props.onEditAvatar(true)}>
        </button>

        <div className="profile__info">
          <div className="profile__info-wrapper">
            <h1 className="profile__title">{userData.name}</h1>
            <button
              type="button"
              className="profile__edit-btn"
              onClick={() => props.onEditProfile(true)}>
            </button>
          </div>
          <h2 className="profile__subtitle">{userData.about}</h2>
        </div>
        <button
          type="button"
          className="profile__add-btn"
          onClick={() => props.onAddPlace(true)}>
        </button>
      </section>

      <section className="cards container">
        <ul className="cards__list">
          {props.cards.map(card => (
            <Card
              key={card._id}
              id={card._id}
              ownerId={card.owner._id}
              link={card.link}
              name={card.name}
              likes={[...card.likes]}
              onCardClick={props.onCardClick}
              onCardLike={props.onCardLike}
              onCardDelete={props.onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  )
}

export default Main
