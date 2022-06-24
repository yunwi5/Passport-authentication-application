import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastType } from '../models/ToastType';

import { getUser, loginUserLocal, logoutUser, registerUserLocal } from '../api/auth-apis';
import { User } from '../models/User';
import { LoginState, RegisterState } from '../models/interfaces';
import { useNavigate } from 'react-router-dom';

interface IAuthContext {
    user: User | null;
    logout(): void;
    loginBySession(): void;
    loginLocal(loginState: LoginState): void;
    registerLocal(registerState: RegisterState): void;
}

// indicate isLoggedIn if the user is not null!
export const AuthContext = React.createContext<IAuthContext>({
    user: null,
    logout: () => {},
    loginBySession: () => {},
    loginLocal: () => {},
    registerLocal: () => {},
});

// custom hook
export const useAuthContext = () => useContext(AuthContext);

interface Props {
    children: JSX.Element;
}

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState<User | null>(null);
    const notify = (message: string, type?: ToastType) => {
        // add toastId to prevent multiple rendering
        type
            ? toast[type](message, {
                  toastId: 'toast1',
              })
            : toast(message, {
                  toastId: 'toast2',
              });
    };

    const loginBySession = async () => {
        const result = await getUser();
        const { success, user } = result;
        if (user) setUser(user);
        if (success) {
            notify('Login successful!', ToastType.SUCCESS);
        }
    };

    const registerLocal = async (registerState: RegisterState) => {
        const { success, message, user } = await registerUserLocal(registerState);
        console.log(success, message, user);
        if (user) {
            setUser(user);
            loginLocal({ email: registerState.email, password: registerState.password });
        } else {
            notify(message || 'Sign up went wrong...', ToastType.ERROR);
        }
    };

    const loginLocal = async (loginState: LoginState) => {
        const { success, message, user } = await loginUserLocal(loginState);
        console.log(success, message, user);
        if (user) {
            setUser(user);
            navigate('/');
            notify('Login successful!', ToastType.SUCCESS);
        } else {
            notify(message || 'Login went wrong...', ToastType.ERROR);
        }
    };

    const logout = () => {
        setUser(null);
        // send http request to the server to logout
        logoutUser();
    };

    const value = { loginBySession, registerLocal, loginLocal, logout, user };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
