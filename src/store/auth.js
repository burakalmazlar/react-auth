import {createSlice} from "@reduxjs/toolkit";

const storageToken = localStorage.getItem('token');

const authSlice = createSlice({
    name: "auth",
    initialState: {token: storageToken, loggedIn: !!storageToken},
    reducers: {
        login: (state, action) => {
            const token = action.payload.token;
            state.token = token;
            state.loggedIn = true;
            localStorage.setItem('token', token);
            localStorage.setItem('expires',
                new Date(new Date().getTime() + (+action.payload.expiresIn)));
        },
        logout: (state, action) => {
            state.token = null;
            state.loggedIn = false;
            localStorage.removeItem('token')
            localStorage.removeItem('expires')
        }
    }
});

export const authActions = authSlice.actions;
export default authSlice.reducer;