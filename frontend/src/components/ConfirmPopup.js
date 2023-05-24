import PopupWithForm from './PopupWithForm';

function ConfirmPopup({ isOpen, onClose, onConfirm, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault()

    onConfirm();
  }

  return (
    <PopupWithForm
      name='confirm'
      title='Вы уверены?'
      btnText='Да'
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}>
      <button
        type="submit"
        className={`popup__submit-btn ${isLoading ? 'popup__submit-btn_inactive' : ''}`}
        disabled={isLoading ? true : false}>
        {isLoading ? 'Сохранение...' : 'Сохранить'}
      </button>
    </PopupWithForm>
  )
}

export default ConfirmPopup
