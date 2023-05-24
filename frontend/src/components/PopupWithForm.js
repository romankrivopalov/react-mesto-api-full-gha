import { forwardRef } from 'react';

const PopupWithForm = forwardRef(({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  children,
  }, ref) => {

  return (
    <section
      data-type={`${name}-popup`}
      className={`popup ${!isOpen ? '' : 'popup popup_opened'}`}
      onClick={({ target }) => {
        if (target.classList.contains('popup_opened') || target.classList.contains('popup__close')) {
          onClose();
        }
      }}>
      <div className="popup__container">
        <button type="button" className="popup__close">
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          ref={ref}
          className="popup__form"
          name={`${name}-form`}
          onSubmit={onSubmit}
          noValidate>
          {children}
        </form>
      </div>
    </section>
  )
})

export default PopupWithForm
