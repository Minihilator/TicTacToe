import React, {useState, useRef, useEffect} from 'react';
import s from './style.css';

export default function LoginForm (props) {
    const [errorText, setErrorText] = useState("");
    const errors = [
        "Login/Password is required!",
        "Login/Password are not verified"
    ];
    const login = useRef(null);
    const pass = useRef(null);

    useEffect(() => {
        let pressEnter = e => {
            e = e || window.event;
            e.keyCode === 13 && signIn();
        }
        document.addEventListener('keyup', pressEnter, false);
        return () => document.removeEventListener('keyup', pressEnter, false);
    }, [signIn]);
    
    function signIn () {
        let userLogin = login.current.value;
        let userPass = pass.current.value;
        if (!userLogin || !userPass) {
            setErrorText(errors[0]);
            login.current.style.borderColor = "#ff0000";
            pass.current.style.borderColor = "#ff0000";
        }
        else {
            fetch("http://localhost:8421/api.authentication.signin", {
                method: 'POST',
                credentials: "include",
                body: JSON.stringify({
                    username: userLogin,
                    password: userPass
                })
            })
            .then(res => {
                login.current.style.borderColor = "#ccc";
                pass.current.style.borderColor = "#ccc";
                setErrorText("");
                props.isLogin(true);
            })
            .catch(err => {
                setErrorText(errors[1]);
                login.current.style.borderColor = "#ff0000";
                pass.current.style.borderColor = "#ff0000";
            });
        }
    }
    function changeHandler () {
        login.current.style.borderColor = "#ccc";
        pass.current.style.borderColor = "#ccc";
        setErrorText("");
    }
    return (
        <div className={s.loginForm}>
            <h2>Please, Sign In</h2>
            <input type="text" name="login" ref={login} placeholder="Your Login" onChange={changeHandler} />
            <input type="password" name="pwd" ref={pass} placeholder="Your Password" onChange={changeHandler} />
            <p className={s.error}>{errorText}</p>
            <button type="submit" onClick={signIn}>Sign In</button>
        </div>
    );
}