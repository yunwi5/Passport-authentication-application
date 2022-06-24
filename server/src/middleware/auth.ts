import { Request, Response, NextFunction } from 'express';

const ensureAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    if (req.isAuthenticated()) {
        console.log('User authenticated!');
        return next();
    }
    console.log('User NOT authenticated');
    req.flash('error_msg', 'Please log in to view this resource');

    // redirect to just home route - can be changed later on
    res.redirect('/');
};

export default { ensureAuthenticated };
