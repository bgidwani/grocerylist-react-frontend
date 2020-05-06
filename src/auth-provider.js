import React, { createContext, useState, useEffect, useContext } from 'react';
import AuthService from './auth/auth.service';

export const AuthDataContext = createContext(null);

const initialUser = null;

const AuthDataProvider = (props) => {
    const [user, setUser] = useState(initialUser);

    /* The first time the component is rendered, it tries to
     * fetch the auth data from a source, like a cookie or
     * the localStorage.
     */
    useEffect(() => {
        const currentUser = AuthService.getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
    }, []);

    const onLogout = () => {
        AuthService.logout();
        setUser(initialUser);
    };

    const onLogin = (newUser) => setUser(newUser);

    return (
        <AuthDataContext.Provider
            value={{ user, onLogin, onLogout }}
            {...props}
        />
    );
};

export const useAuthDataContext = () => useContext(AuthDataContext);

export default AuthDataProvider;
