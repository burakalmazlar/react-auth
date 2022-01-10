import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom"
import classes from './AuthForm.module.css';
import useAuth from "../../hooks/use-auth";
import LoadingSpinner from "../UI/LoadingSpinner";

const AuthForm = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

        setLoading(true);
        const response = fetch(process.env.REACT_APP_DOMAIN + "/auth/" + url, {
            method: 'POST',
            body: new FormData(e.target)
        })
            .then(response => response.json())
            .then(result => {
                setLoading(false);
                if (result.error) {
                    const trace = result.trace;
                    const a = trace.indexOf(":")
                    const b = trace.indexOf("\n")
                    throw new Error(trace.substr(a + 1, (b - a)));
                } else {
                    login(result.token, result.expires)
                }
            })
            .catch(error => {
                setError((error.message))
            });

    }

    return (
        <section className={classes.auth}>
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={onSubmit}>
                <div className={classes.control}>
                    <label htmlFor='username'>Your Username</label>
                    <input type='email' id='username' name="username" required/>
                </div>
                <div className={classes.control}>
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' name="password" required min="4" max="8"/>
                </div>
                <div className={classes.actions}>
                    <button>{!loading ? (isLogin ? 'Login' : 'Create Account') : <LoadingSpinner/>}</button>
                    <button
                        type='button'
                        className={classes.toggle}
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
                {error && <div className={classes.error}>
                    <p>{error}</p>
                </div>}

            </form>
        </section>
    );
};

export default AuthForm;
