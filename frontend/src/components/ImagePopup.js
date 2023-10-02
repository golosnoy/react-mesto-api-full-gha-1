function ImagePopup(props) {
    const {card, onClose} = props;

    return(
        <div className={`popup popup_image ${ card? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <img className="popup__image" src={card?.link} alt={card?.name} />
                <p className="popup__image-title">{card?.name}</p>
                <button onClick={onClose} className="popup__close-button popup__close-button_image" type="button" aria-label="Закрыть окно"></button>
            </div>
        </div>
    );
}

export default ImagePopup