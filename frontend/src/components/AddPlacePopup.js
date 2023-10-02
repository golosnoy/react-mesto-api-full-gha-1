import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const {isOpened} = props;
  const {onClose} = props;
  const {onAddPlace} = props;
  const [placeName, setPlaceName] = useState('');
  const [placeImg, setPlaceImg ] = useState('');

  React.useEffect(() => {
    if (isOpened) {
      setPlaceName('');
      setPlaceImg('');
    }
  }, [isOpened])

  function handleChangePlaceName(e) {
    setPlaceName(e.target.value);
  }

  function handleChangePlaceImg(e) {
    setPlaceImg(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
        name: placeName,
        link: placeImg,
    });
  } 

  return(
    <PopupWithForm onClose={onClose} onSubmit={handleSubmit} isOpened={isOpened} styleClass="content" title="Новое место" name="new_content" buttonText="Создать">
    <>
    <input value={placeName} onChange={handleChangePlaceName} className="popup__input" type="text" name="place_name" placeholder="Название" id="place_name" minLength={2} maxLength={30} required/>
    <span className="popup__input-error popup__input-error_place_name"></span>
    <input value={placeImg} onChange={handleChangePlaceImg} className="popup__input" type="url" name="img_url" placeholder="Ссылка на картинку" id="img_url" required/>
    <span className="popup__input-error popup__input-error_img_url"></span>
    </>
    </PopupWithForm>
  );
}

export default AddPlacePopup