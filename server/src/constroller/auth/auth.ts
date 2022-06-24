import { NextFunction, Request, Response } from 'express';

const getLogout = (req: Request, res: Response, next: NextFunction) => {
    // logout function now takes callback function
    req.logout((err: any) => {
        if (err) next(err);
        req.flash('success_msg', 'You are logged out');
        res.status(200).json({ message: 'Logout successful' });
    });
};

const getAuthSuccess = (req: Request, res: Response) => {
    console.log('user:', req.user);
    // DO NOT SET HEADERS TWICE (CORS ERROR)
    if (req.user) {
        res.status(200).json({
            success: true,
            message: 'Authentication successful!',
            user: req.user,
            cookies: req.cookies,
        });
        return;
    }
    res.status(404).json({ success: false, message: 'User not found', cookies: req.cookies });
};

const getAuthFailure = (req: Request, res: Response) => {
    const statusCode = req.statusCode ?? 401;
    res.status(statusCode).json({
        success: false,
        message: 'Authentication failed...',
    });
};

const controller = {
    getLogout,
    getAuthSuccess,
    getAuthFailure,
};

export default controller;
