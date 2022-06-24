import { NextFunction, Router, Response, Request } from 'express';
import passport from 'passport';
import keys from '../../config/keys';

const router: Router = Router();

// Google Authentication
router.route('/login').get(
    passport.authenticate('google', {
        scope: ['email', 'profile'],
    }),
);

router.get(
    '/callback',
    passport.authenticate('google', {
        successRedirect: `${keys.ClientRedirectURL}`,
        failureMessage: true,
    }),
);

export default router;
