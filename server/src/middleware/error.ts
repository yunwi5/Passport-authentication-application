import { NextFunction, Request, Response } from 'express';

// Error handling middleware
// Instead of redirect, it sends error message and error stack (if in development mode)
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode ? res.statusCode : 500;

    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export default errorHandler;
