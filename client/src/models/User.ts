export interface User {
    _id: string;
    name: string;
    email: string;
    date: Date;
    photo?: string;
    provider: string;
}
