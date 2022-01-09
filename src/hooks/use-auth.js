import {useDispatch, useSelector} from "react-redux";
import {authActions} from "../store/auth";
import {useCallback} from "react";

const useAuth = (props) => {
    const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);

    const login = (token, expiresIn) => {
        dispatch(authActions.login({token, expiresIn}));
    }
    const logout = useCallback(() => {
        dispatch(authActions.logout());
    }, [dispatch]);

    return {auth, login, logout}
}

export default useAuth;