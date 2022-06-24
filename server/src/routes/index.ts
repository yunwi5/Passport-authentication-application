import { Request, Router, Response } from 'express';
import authConfig from '../config/auth';
import keys from '../config/keys';

const ensureAuthenticated = authConfig.ensureAuthenticated;

const router: Router = Router();

// Welcome route
router.get('/', (req: Request, res: Response) => {
    res.send(
        `<html>
            <body>
                <h1>Welcome</h1>
                <div>
                    <a href="/auth/google/login">Authenticate with Google</a>
                </div>
                <div>
                    <a href="/auth/github/login">Authenticate with GitHub</a>
                </div>
                <div>
                    <a href="/auth/linkedin/login">Authenticate with LinkedIn!</a>
                </div>
                <div>
                    <a href="/auth/facebook/login">Authenticate with Facebook</a>
                </div>
            </body>
        </html>`,
    );
});

router.get('/protected', ensureAuthenticated, (req: Request, res: Response) => {
    res.json({
        message: `Welcome to protected route!\nThe secret is you are dumb!`,
        user: req.user,
    });
});
// dashboard
router.get('/dashboard', ensureAuthenticated, (req: Request, res: Response) => {
    res.send('Welcome to the dashbaord!');
});

export default router;
