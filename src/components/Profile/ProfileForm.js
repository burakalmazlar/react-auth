import classes from './ProfileForm.module.css';
import useAuth from "../../hooks/use-auth";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom"

const ProfileForm = () => {
    const [passwordChanged, setPasswordChanged] = useState(false);
    const navigate = useNavigate();

    const newPasswordRef = useRef();

    const {auth, login} = useAuth();

    useEffect(() => {
        if (passwordChanged) {
            navigate("/", {replace: true})
        }
    }, [passwordChanged, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch(process.env.REACT_APP_DOMAIN + "/user/change-password", {
            method: "POST", body: JSON.stringify({
                password: newPasswordRef.current.value
            }),
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + auth.token
            }
        })
        const data = await response.json();
        if (response.ok) {
            setPasswordChanged(true);
        } else {
            console.log(data.error)
        }

    }

    return (
        <form onSubmit={onSubmit} className={classes.form}>
            <div className={classes.control}>
                <label htmlFor='new-password'>New Password</label>
                <input type='password' id='new-password' required ref={newPasswordRef}/>
            </div>
            <div className={classes.action}>
                <button type="submit">Change Password</button>
            </div>
        </form>
    );
}

export default ProfileForm;
