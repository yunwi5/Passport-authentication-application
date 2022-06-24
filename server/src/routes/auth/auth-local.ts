import { Router } from 'express';
import passport from 'passport';
import keys from '../../config/keys';
import controller from '../../constroller/auth/auth-local';
import catchAsync from '../../utils/catchAsync';

const router: Router = Router();

// login handle
router
    .route('/login')
    .get(controller.getLogin)
    .post(
        passport.authenticate('local', {
            // successRedirect: keys.ClientRedirectURL,
            successMessage: true,
            failureMessage: true,
            failureFlash: true,
        }),
        catchAsync(controller.postLogin),
    );

// register handle
router
    .route('/register')
    .get(controller.getRegister)
    .post(catchAsync(controller.postRegister));

export default router;
