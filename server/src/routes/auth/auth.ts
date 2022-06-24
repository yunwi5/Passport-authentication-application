import { Request, Router, Response } from 'express';
import controller from '../../constroller/auth/auth';

const router: Router = Router();

router.get('/logout', controller.getLogout);

router.get('/login/success', controller.getAuthSuccess);

router.get('/login/failure', controller.getAuthFailure);

export default router;
