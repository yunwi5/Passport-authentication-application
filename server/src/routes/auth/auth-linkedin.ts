import { Router } from 'express';
import passport from 'passport';
import keys from '../../config/keys';

const linkedInRouter: Router = Router();

// Linkedin Authentication
linkedInRouter.route('/login').get(
    passport.authenticate('linkedin', {
        scope: ['r_emailaddress', 'r_liteprofile'],
    }),
);

linkedInRouter.get(
    '/callback',
    passport.authenticate('linkedin', {
        successRedirect: keys.ClientRedirectURL,
        failureRedirect: '/auth/login/failure',
        successMessage: true,
        failureMessage: true,
    }),
);

export default linkedInRouter;
