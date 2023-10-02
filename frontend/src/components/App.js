import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom'
import '../../src/index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import { api } from '../utils/api';
import { auth } from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import { Register } from './Register';
import { Login } from './Login';
import InfoTooltip from "./InfoTooltip";
import {ProtectedRoute} from "./ProtectedRoute";
 
function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isConfirmationPopupOpen, setIsConfirmationPopupOpen] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [email, setEmail] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInited, setIsInited] = useState(false);
    const navigate = useNavigate();
    const [isRegistrationOk, setIsRegistrationOk] = useState(false);

    React.useEffect(() => {
        const jwt = localStorage.getItem('token');
            if (jwt){
                auth.validation(jwt)
                .then((res) => {
                    if (res){
                        setLoggedIn(true);
                        setEmail(res.email);
                        navigate('/', {replace: true});
                    }
                })
                .catch((err) =>{console.log(err)})
                .finally(() => {
                    setIsInited(true);
                  });
            }
            else {
                setIsInited(true)
            }
    }, [loggedIn])
       
    
    React.useEffect(() => {
        api.getUserInfo().then((res) => {
            setCurrentUser(res)
        })
        .catch((err) =>{console.log(err)});
    }, [loggedIn]);

    React.useEffect(() => {
        api.getCardsData().then((cards) => {setCards(cards)})
        .catch((err) =>{console.log(err)});
    }, [loggedIn]);

    const signOut= () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
      }
     
    const handleEditProfileClick = () => {
        setIsEditProfilePopupOpen(true)
    };

    const handleAddPlaceClick = () => {
        setIsAddPlacePopupOpen(true)
    };

    const handleEditAvatarClick = () => {
        setIsEditAvatarPopupOpen(true)
    };

    const handleDeleteContentClick = () => {
        setIsConfirmationPopupOpen(true)
    };

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setIsInfoTooltipOpen(false);
    };

    const closeImagePopup = () => {
        setSelectedCard(null);
    };

    const handleCardClick = (card) => {
        setSelectedCard(card);
    };

    const handleCardLike = (card) => {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
        })
        .catch((err) =>{console.log(err)});
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id).then(() => {
            const newCards = cards.filter(function (c) {
                if (c._id !== card._id) {
                    return c;
                } 
            })
            setCards(newCards)
        })
        .catch((err) =>{console.log(err)}); 
    }

    const handleAddPlaceSubmit = (card) => {
        api.postCard(card).then((res) => {
            setCards([res, ...cards]); 
            closeAllPopups();
        })
        .catch((err) =>{console.log(err)});  
    };

    const handleUpdateUser = (newUserData) => {
        api.patchUserInfo(newUserData).then((res) => {
            console.log(res);
            const user = currentUser;
            user.name = res.name;
            user.about = res.about;
            setCurrentUser(user);
            closeAllPopups();
        })
        .catch((err) =>{console.log(err)});
    };

    const handleUpdateAvatar = (newAvatar) => {
        api.updateAvatar(newAvatar).then((res) => {
            setCurrentUser(res);
            closeAllPopups();
        })
        .catch((err) =>{console.log(err)});
    };

    const handleRegister = (data) => {
        auth.register(data)
        .then(() => {
            setIsRegistrationOk(true);
        })
        .catch((err) =>{
            console.log(err);
            setIsRegistrationOk(false);
        })
        .finally(() => {
            setIsInfoTooltipOpen(true);
            return {InfoTooltip}
        });
    }

    const handleLogin = (data) => {
        auth.authorization(data)
        .then((res) => {
           setLoggedIn(true);
           
        })
        .catch((err) =>{console.log(err)});
    }

    const handleCloseInfoTooltip = () => {
        setIsInfoTooltipOpen(false);
        if (isRegistrationOk) {
            navigate('/sign-in', {replace: true});
        }
    }

    if (!isInited) {
        return null
      }

    return (
        < CurrentUserContext.Provider value={currentUser} >
            <div className="App">
                <div className="page__container">
                    <Header loggedIn={loggedIn} email={email} onSignOut={signOut} />
                    <Routes>
                        <Route path="/" element={<ProtectedRoute element={Main} onEditProfile={handleEditProfileClick}
                            onAddPlace={handleAddPlaceClick}
                            onEditAvatar={handleEditAvatarClick}
                            onConfirmation={handleDeleteContentClick}
                            onImagePopup={handleCardClick}
                            onCardLike={handleCardLike}
                            cards={cards}
                            onCardDelete={handleCardDelete} loggedIn={loggedIn}/>} 
                        />
                        <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
                        <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
                    </Routes>
                    <Footer loggedIn={loggedIn} />
                    <EditProfilePopup isOpened={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} /> 
                    <EditAvatarPopup isOpened={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
                    <AddPlacePopup isOpened={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
                    <PopupWithForm onClose={closeAllPopups} isOpened={isConfirmationPopupOpen} styleClass="delete_confirmation" title="Вы уверены?" name="edit_delete_confirmation" buttonText="Да" />
                    <ImagePopup onClose={closeImagePopup} card={selectedCard} /> 
                    <InfoTooltip isRegistrationOk={isRegistrationOk} isOpened={isInfoTooltipOpen} onClose={handleCloseInfoTooltip} />
                </div> 
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
