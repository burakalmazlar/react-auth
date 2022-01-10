import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import classes from './AuthForm.module.css';
import useAuth from "../../hooks/use-auth";

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

    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const url = isLogin ? "authenticate" : "register"

        const response = fetch("http://localhost:8080/auth/" + url, {
            method: 'POST',
            body: new FormData(e.target)
        })
            .then(response => response.json())
            .then(result => login(result.token, result.expires))
            .catch(error => console.log('error', error));

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={onSubmit}>
                <div className={classes.control}>
                    <label htmlFor='username'>Your Username</label>
                    <input type='text' id='username' name="username" required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' name="password" required/>
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
