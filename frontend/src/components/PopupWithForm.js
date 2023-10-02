import React from "react";

function PopupWithForm(props) {
    const {onSubmit, onClose, isOpened, styleClass, buttonText, children} = props;

    return (
        <div className={`popup popup_${styleClass} ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <form  onSubmit={onSubmit} className="popup__form" name={props.name}>
                    <h2 className="popup__title">{props.title}</h2>
                    {children}
                    <button className="popup__submit-button" type="submit">{buttonText}</button>
                    <button onClick={onClose} className="popup__close-button" type="button"></button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm