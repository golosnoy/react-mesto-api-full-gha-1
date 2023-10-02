import imageRegOk from '../../src/images/Union.png';
import imageRegNotOk from '../../src/images/Union2.png';

export function InfoTooltip(props) {
    const {onClose, isOpened, isRegistrationOk} = props;

    return(
        <div className={`popup ${isOpened ? 'popup_opened' : ''}`}>
            <div className="popup__container">
                <div className="popup__reg" name="popup">
                    <img className="popup__reg-image" src={ isRegistrationOk? imageRegOk : imageRegNotOk } />
                    <p className="popup__reg-text">{ isRegistrationOk? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз." }</p>
                    <button onClick={onClose} className="popup__close-button" type="button"></button>
                </div>
            </div>
        </div>
    )
}

export default InfoTooltip