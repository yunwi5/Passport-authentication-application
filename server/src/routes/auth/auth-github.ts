import { Router } from 'express';
import passport from 'passport';
import keys from '../../config/keys';

const router: Router = Router();

// GitHub Authentication
router.route('/login').get(
    passport.authenticate('github', {
        scope: ['user:email', 'profile'],
    }),
);

router.get(
    '/callback',
    passport.authenticate('github', {
        successRedirect: keys.ClientRedirectURL,
        successMessage: true,
        failureMessage: true,
    }),
);

export default router;
