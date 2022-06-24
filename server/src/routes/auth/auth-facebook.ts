import { Router } from 'express';
import { Request, Response } from 'express';
import passport from 'passport';
import keys from '../../config/keys';

const router: Router = Router();

// Facebook Authentication
router.route('/login').get(
    passport.authenticate('facebook', {
        scope: ['email', 'profile'],
    }),
);

router.get(
    '/callback',
    passport.authenticate(
        'facebook',
        {
            successRedirect: keys.ClientRedirectURL,
            successMessage: true,
            failureMessage: true,
        },
        (req: Request, res: Response) => {
            console.log('Facebook authenticatin success');
        },
    ),
);

export default router;
