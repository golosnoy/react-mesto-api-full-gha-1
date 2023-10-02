import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main(props) {
    const {onEditProfile, onAddPlace, onEditAvatar, onImagePopup, onCardLike, cards, onCardDelete} = props;
    const currentUser = React.useContext(CurrentUserContext);
    
    return(
    <main className="content">
        <section className="profile">
            <div className="profile__card">
                <div className="profile__avatar-container">
                  <img  className="profile__avatar" src={currentUser.avatar} alt={currentUser.name} />
                  <div onClick={onEditAvatar} className="profile__avatar-overlay"></div>
                </div>
                <div className="profile__info">
                    <h1 className="profile__title">{currentUser.name}</h1>
                    <button onClick={onEditProfile} className="profile__edit-button" type="button" aria-label="Редактировать профиль"></button>
                    <p className="profile__subtitle">{currentUser.about}</p>
                </div>
            </div>
            <button onClick={onAddPlace} className="profile__add-button" type="button" aria-label="Добавить контент"></button>
        </section>

        <section className="cards">
            <ul className="cards__elements">
                {
                    cards.map((card) => (
                        <Card key={card._id} onImagePopup={onImagePopup} onCardLike={onCardLike} onCardDelete={onCardDelete} {...card} />
                    ))
                }
            </ul>
        </section>
    </main>
    );
}

export default Main;