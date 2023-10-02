import React from "react";
import { useState } from "react";

export function Login(props) {
    const {onLogin} = props;
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    React.useEffect(() => {
          setEmail('');
          setPassword('');
      }, [])
    
      function handleChangeEmail(e) {
        setEmail(e.target.value);
      }
    
      function handleChangePassword(e) {
        setPassword(e.target.value);
      }
    
      function handleSubmit(e) {
        e.preventDefault();
        onLogin({
            email: email,
            password: password,
        });
      } 

    return(
        <div className={"auth"}>
            <div className="auth__container">
                <form onSubmit={handleSubmit} className="auth__form" name="auth">
                    <h2 className="auth__title">Вход</h2>
                    <input value={email} onChange={handleChangeEmail} className="auth__input" type="email" name="email" placeholder="Email" id="email" minLength={2} required />
                    <input value={password} onChange={handleChangePassword} className="auth__input" type="password" name="password" placeholder="Пароль" id="password" minLength={8} maxLength={200} required />
                    <button className="auth__submit-button" type="submit">Войти</button>
                </form>
            </div>
        </div>
    )
}