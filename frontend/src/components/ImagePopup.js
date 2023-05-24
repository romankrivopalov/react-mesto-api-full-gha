function ImagePopup({ card, onClose }) {

  return (
    <section
      data-type="img-popup"
      className={`popup popup_type_show-img ${card.link ? 'popup_opened' : ''}`}
      onClick={({ target }) => {
        if (target.classList.contains('popup_opened') || target.classList.contains('popup__close')) {
          onClose();
        }
      }}>
      <div className="popup__container-img">
        <button
          type="button"
          className="popup__close">
        </button>
        <img src={card.link} alt={card.name} className="popup__img" />
        <h2 className="popup__title popup__title_type_show-img">{card.name}</h2>
      </div>
    </section>
  )
}

export default ImagePopup
