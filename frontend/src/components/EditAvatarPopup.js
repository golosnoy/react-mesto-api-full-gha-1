import React from "react";
import { createRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const {isOpened} = props;
  const {onClose} = props;
  const {onUpdateAvatar} = props;
  const input = createRef();

  React.useEffect(() => {
    if (isOpened) {
      input.current.value = "";
    }
  }, [isOpened])

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar(input.current.value);
  } 

  return(
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpened={isOpened} styleClass="avatar" title="Обновить аватар" name="edit_avatar" buttonText="Сохранить">
    <>
    <input ref={input} className="popup__input" type="url" name="profile_avatar" placeholder="Ссылка на аватар" id="profile_avatar" minLength={2} required />
    <span className="popup__input-error popup__input-error_profile_avatar"></span>
    </>
    </PopupWithForm>
  );
}

export default EditAvatarPopup