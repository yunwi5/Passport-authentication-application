import axios from 'axios';
import Properties from '../constants';
import { LoginState, RegisterState, UserReturn } from '../models/interfaces';
import qs from 'querystring';

const authConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
};

// content-type shoud be x-www-form-urlencoded for local passport authentication
const authLocalConfig = {
    withCredentials: true,
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
    },
};

export const getUser = async () => {
    try {
        // credentials: 'include' in fetch
        // withCredentials: true in axios
        // to retrieve user info from the server

        const res = await axios.get<UserReturn>(
            `${Properties.ServerDomain}/auth/login/success`,
            authConfig,
        );

        return res.data;
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Authentication failed';
        return { success: false, message };
    }
};

export const logoutUser = async () => {
    try {
        const res = await axios.get(`${Properties.ServerDomain}/auth/logout`, authConfig);
        return res.data;
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Logout failed';
        return { success: false, message };
    }
};

export const loginUserLocal = async (loginCredential: LoginState) => {
    const stringified = qs.stringify(loginCredential as any);
    try {
        const res = await axios.post<UserReturn>(
            `${Properties.ServerDomain}/auth/local/login`,
            stringified,
            authLocalConfig,
        );
        return { ...res.data, success: true };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Logout failed';
        return { success: false, message };
    }
};

export const registerUserLocal = async (registerCredential: RegisterState) => {
    const stringified = qs.stringify(registerCredential as any);
    try {
        console.log('strigified:', stringified);
        const res = await axios.post<UserReturn>(
            `${Properties.ServerDomain}/auth/local/register`,
            stringified,
            authLocalConfig,
        );
        console.log('res:', res);
        return { ...res.data };
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Logout failed';
        return { success: false, message };
    }
};
