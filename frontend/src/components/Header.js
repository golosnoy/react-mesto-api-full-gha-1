import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../src/images/logo.svg';

function Header(props) {
    const {loggedIn, onSignOut, email} = props;
    const path = window.location.pathname;
    const [text, setText] = React.useState("");
    const [link, setLink] = React.useState("");

    React.useEffect(() => {
        if (!loggedIn) {
            if (path=== "/sign-in"){
                setText("Регистрация");
                setLink("/sign-up");
            }
            else {
                setText("Войти");
                setLink("/sign-in")
            }
        }
        else {
            setText("Выйти");
            setLink("/sign-in");
        }
    })

    return(
        <header className="header">
            <Link to="/">
            <img src={logo} alt="Логотип" className="header__logo"/>
            </Link>
            <div className="header__user-block">
            <p className="header__text header__email">{email}</p>
            <a href={link} onClick={loggedIn ? onSignOut : null } className="header__text">{text}</a>
            </div>
        </header>
    );
}

export default Header;