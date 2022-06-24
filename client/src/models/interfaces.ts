import { User } from './User';

export interface LoginState {
    email: string;
    password: string;
}

export interface RegisterState {
    name: string;
    email: string;
    password: string;
}

export interface UserReturn {
    success: boolean;
    message: string;
    user?: User;
    cookies?: any;
}
