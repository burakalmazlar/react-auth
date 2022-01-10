import {Routes, Route} from 'react-router-dom';


import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import useAuth from "./hooks/use-auth";
import {Navigate} from "react-router-dom"
import {useEffect} from "react";

let timer;
const setLogoutTimer = (logout) => {
    const expirationDate = localStorage.getItem('expires');
    if (expirationDate) {
        const expiresIn = Date.parse(expirationDate);
        const remaining = expiresIn - Date.now();
        console.log(Math.round(remaining/1000));
        if (remaining < 20 * 1000) {
            logout();
        } else {
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(logout, remaining);
        }
    }
}

function App() {
    const {auth, logout} = useAuth();
    const {loggedIn} = auth;

    useEffect(() => {
        setLogoutTimer(logout);
    }, [logout])

    return (
        <Layout>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                {!loggedIn && <Route path='/auth' element={<AuthPage/>}/>}
                {loggedIn && <Route path='/profile' element={<UserProfile/>}/>}
                <Route path="*" element={<Navigate to="/"/>}/>
            </Routes>
        </Layout>
    );
}

export default App;
