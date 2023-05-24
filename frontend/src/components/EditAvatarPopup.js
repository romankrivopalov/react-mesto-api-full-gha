import PopupWithForm from './PopupWithForm';
import { useFormValidation } from '../utils/useFormValidation';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
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

    onUpdateAvatar({
      avatar: values['profileAvatarLink'],
    });

    resetValues();
  }

  return (
    <PopupWithForm
      ref={formRef}
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
        <label className="popup__input-wrapper">
          <input
          type="url"
          id="input-link-avatar"
          name="profileAvatarLink"
          className="popup__input popup__input_type_avatar"
          placeholder="Ссылка на картинку"
          value={values['profileAvatarLink'] ?? ''}
          onChange={handleChange}
          required />
          <span className={errorClassName('profileAvatarLink')}>
            {errors['profileAvatarLink']}
          </span>
        </label>
        <button
          type="submit"
          className={`popup__submit-btn ${isValid ? '' : 'popup__submit-btn_inactive'}`}
          disabled={isValid ? false : true}>
            {isLoading ? 'Сохранение...' : 'Сохранить'}
        </button>
    </PopupWithForm>
  )
}

export default EditAvatarPopup
