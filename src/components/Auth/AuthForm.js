import {useState, useRef, useEffect} from 'react';

import classes from './AuthForm.module.css';
import useAuth from "../../hooks/use-auth";
import {useNavigate} from "react-router-dom"

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);

    const {auth, login} = useAuth();

    const {loggedIn} = auth;
    useEffect(() => {
        if (loggedIn) {
            navigate("/", {replace: true})
        }
    }, [loggedIn, navigate])

    const emailRef = useRef();
    const passwordRef = useRef();

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        const url = isLogin ? "authenticate" : "register"

        const response = await fetch("http://localhost:8080/" + url, {
            method: "POST", body: JSON.stringify({
                username: emailRef.current.value,
                password: passwordRef.current.value
            }),
            mode: 'cors',
            headers: {"Content-Type": "application/json"}
        })
        const data = await response.json();
        if (response.ok) {
            login(data.token,data.expiresIn);
        } else {
            console.log(data.error)
        }

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={onSubmit}>
                <div className={classes.control}>
                    <label htmlFor='email'>Your Email</label>
                    <input type='text' id='email' required ref={emailRef}/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordRef}/>
                </div>
                <div className={classes.actions}>
                    <button>{isLogin ? 'Login' : 'Create Account'}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default AuthForm;
