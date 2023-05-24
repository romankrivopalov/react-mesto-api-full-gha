import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../utils/useFormValidation';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const {
    values,
    errors,
    isValid,
    handleChange,
    resetValues,
    formRef,
    errorClassName } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();

    onAddPlace({
      name: values['placeName'],
      link: values['placeLink']
    });

    resetValues();
  }

  return (
    <PopupWithForm
      ref={formRef}
      name='card'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <label className="popup__input-wrapper">
          <input
          type="text"
          id="input-img-title"
          name="placeName"
          className="popup__input popup__input_type_name"
          placeholder="Название"
          minLength="2"
          maxLength="30"
          onChange={handleChange}
          value={values['placeName'] ?? ''}
          required />
          <span className={errorClassName('placeName')}>{errors['placeName']}</span>
        </label>

        <label className="popup__input-wrapper">
          <input
          type="url"
          id="input-link"
          name="placeLink"
          className="popup__input popup__input_type_about"
          placeholder="Ссылка на картинку"
          onChange={handleChange}
          value={values['placeLink'] ?? ''}
          required/>
          <span className={errorClassName('placeLink')}>{errors['placeLink']}</span>
        </label>
        <button
          type="submit"
          className={`popup__submit-btn ${isValid ? '' : 'popup__submit-btn_inactive'}`}
          disabled={isValid ? false : true}>
            {isLoading ? 'Сохранение...' : 'Создать'}
        </button>
    </PopupWithForm>
  )
}

export default AddPlacePopup
