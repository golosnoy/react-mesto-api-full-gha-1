import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card(card) {
    const {onImagePopup} = card;
    const {onCardLike} = card;
    const {onCardDelete} = card;
    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);
    const cardLikeButtonClassName = ( 
        `cards__like ${isLiked && 'cards__like_active'}` 
      );

    const handleLikeClick = () => {
        onCardLike(card);
    };
    
    return(
        <li className="cards__element">
            <img onClick={onImagePopup.bind(null, card)} className="cards__image" src={card.link} alt={card.name} />
            <div className="cards__desc">
                <h2 className="cards__title">{card.name}</h2>
                <div className="cards__likes_block">
                    <button onClick={handleLikeClick} type="button" aria-label="Нравится" className={cardLikeButtonClassName}></button>
                    <p className="cards__likes_counter">{card.likes.length}</p>
                </div>
                {isOwn && <button onClick={() => onCardDelete(card)} type="button" aria-label="Корзина" className="cards__trash" />}
            </div>
        </li>
    );
}

export default Card

