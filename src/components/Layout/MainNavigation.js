import {Link} from 'react-router-dom';

import classes from './MainNavigation.module.css';
import useAuth from "../../hooks/use-auth";

const MainNavigation = () => {
    const {auth, logout} = useAuth();
    const {loggedIn} = auth;
    return (
        <header className={classes.header}>
            <Link to='/'>
                <div className={classes.logo}>React Auth</div>
            </Link>
            <nav>
                {loggedIn ?
                    <ul>
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout</button>
                        </li>
                    </ul> :
                    <ul>
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                    </ul>}
            </nav>
        </header>
    );
};

export default MainNavigation;
