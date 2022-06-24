import { Request } from 'express';

export interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined;
    };
}
export interface IUser {
    email: string;
    name: string;
    password?: string;
    date?: Date;
}
