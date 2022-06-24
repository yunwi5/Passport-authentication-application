import { Request, Response, NextFunction } from 'express';

function catchAsync(func: Function) {
    return (req: Request, res: Response, next: NextFunction) => {
        func(req, res, next).catch((err: Error) => next(err));
    };
}

export default catchAsync;
