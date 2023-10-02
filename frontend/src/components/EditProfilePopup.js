import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const {isOpened} = props;
  const {onClose} = props;
  const {onUpdateUser} = props;
  const [name, setName] = useState('');
  const [description, setDescription ] = useState('');
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name ?? '');
    setDescription(currentUser.about ?? '');
  }, [isOpened, currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return(
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpened={isOpened} styleClass="profile" title="Редактировать профиль" name="edit_profile" buttonText="Сохранить">
    <>
    <input value={name} onChange={handleChangeName} className="popup__input" type="text" name="name" placeholder="Имя" id="name" minLength={2} maxLength={40} required />
    <span className="popup__input-error popup__input-error_name"></span>
    <input value={description} onChange={handleChangeDescription} className="popup__input" type="text" name="about" placeholder="О себе" id="about" minLength={2} maxLength={200} required />
    <span className="popup__input-error popup__input-error_about"></span>
    </>
    </PopupWithForm>
  );
}

export default EditProfilePopup
