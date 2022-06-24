import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import flash from 'connect-flash';
import dotenv from 'dotenv';
// dotenv settings
dotenv.config();

import router from './routes/index';
import {
    authLinkedInRouter,
    authLocalRouter,
    authRouter,
    authFacebookRouter,
    authGoogleRouter,
    authGitHubRouter,
} from './routes/auth/';
import keys from './config/keys';

// passport config
import passportStrategy from './config/passport';
passportStrategy(passport);

const app = express();

// handle cors from client
app.use(
    cors({
        origin: keys.ClientURL,
        methods: 'GET,POST,PUT,DELETE',
        credentials: true, // IMPORTANT to set to true
    }),
);

// DB Config
const db = keys.MongoURI;

// Connect to Mongo
mongoose
    .connect(db, {})
    .then(() => console.log('Connected to Mongodb!'))
    .catch((err) => console.log(err));

// Allow express to parse JSON
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
    session({
        name: 'session',
        secret: 'secretcat',
        resave: false,
        saveUninitialized: true,
        // cookie: { secure: true },
    }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', router);

// Auth Routes
app.use('/auth', authRouter.default);
app.use('/auth/local', authLocalRouter.default);
app.use('/auth/google', authGoogleRouter.default);
app.use('/auth/facebook', authFacebookRouter.default);
app.use('/auth/linkedin', authLinkedInRouter.default);
app.use('/auth/github', authGitHubRouter.default);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Listening on the port ${PORT}`));
