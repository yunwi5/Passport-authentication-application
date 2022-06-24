import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Strategy as LinkedInStrategy } from 'passport-linkedin-oauth2';
import { PassportStatic } from 'passport';
import bcrypt from 'bcryptjs';

import User from '../models/User';

const GOOGLE_CLIENT_ID: string = process.env.GOOGLE_CLIENT_ID || '';
const GOOGLE_CLIENT_SECRET: string = process.env.GOOGLE_CLIENT_SECRET || '';

const FACEBOOK_APP_ID = process.env.FACEBOOK_APP_ID || '';
const FACEBOOK_APP_SECRET = process.env.FACEBOOK_APP_SECRET || '';

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID || '';
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET || '';

const LINKEDIN_CLIENT_ID = process.env.LINKEDIN_CLIENT_ID || '';
const LINKEDIN_CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET || '';

const passportStrategy = (passport: PassportStatic) => {
    passport.use(
        new LinkedInStrategy(
            {
                clientID: LINKEDIN_CLIENT_ID,
                clientSecret: LINKEDIN_CLIENT_SECRET,
                callbackURL: '/auth/linkedin/callback',
                scope: ['r_emailaddress', 'r_liteprofile'],
            },
            function (accessToken: any, refreshToken: any, profile: any, done: any) {
                const { id, displayName, photos, emails, provider } = profile;

                const email: string = emails && emails.length > 0 && emails[0].value;
                const photo: string = photos && photos.length > 0 && photos[0].value;

                User.findOne({ linkedinId: id })
                    .then((user) => {
                        if (user) {
                            // user already exists
                            return done(null, user);
                        } else {
                            User.create(
                                { linkedinId: id, name: displayName, email, photo, provider },
                                (err: any, user: any) => {
                                    return done(err, user);
                                },
                            );
                            return;
                        }
                    })
                    .catch((err) => console.log(err));
            },
        ),
    );

    passport.use(
        new GitHubStrategy(
            {
                clientID: GITHUB_CLIENT_ID,
                clientSecret: GITHUB_CLIENT_SECRET,
                callbackURL: '/auth/github/callback',
                passReqToCallback: true,
            },
            (
                request: any,
                accessToken: any,
                refreshToken: any,
                profile: any,
                done: Function,
            ) => {
                // console.log('github profile:');
                // console.log(profile);
                // displayName is null in github, use username instead
                const { id, username, email, provider, photos } = profile;
                const photo: string = (photos && photos.length && photos[0].value) || '';

                User.findOne({ githubId: id })
                    .then((user: any) => {
                        if (user) {
                            return done(null, user);
                        } else {
                            User.create(
                                { name: username, email, githubId: id, provider, photo },
                                (err: any, user: any) => {
                                    done(err, user);
                                },
                            );
                            return;
                        }
                    })
                    .catch((err) => console.log(err));
            },
        ),
    );

    // Facebook login does not work in http
    // Need to have domain https
    passport.use(
        new FacebookStrategy(
            {
                clientID: FACEBOOK_APP_ID,
                clientSecret: FACEBOOK_APP_SECRET,
                callbackURL: '/auth/facebook/secrets',
                // passReqToCallback: true,
            },
            (accessToken: any, refreshToken: any, profile: any, done: Function) => {
                const { displayName, emails, id, name, photos, profileUrl, provider } =
                    profile;
                const userEmails: string[] = emails?.map((email: any) => email.value) || [];

                User.findOne({ facebookId: id })
                    .then((user) => {
                        if (!user) {
                            User.create(
                                {
                                    email: userEmails[0],
                                    name: displayName,
                                    provider,
                                    facebookId: id,
                                },
                                (err, user) => {
                                    return done(err, user);
                                },
                            );
                        } else {
                            return done(null, user);
                        }
                    })
                    .catch((err) => console.log(err));
            },
        ),
    );

    passport.use(
        new GoogleStrategy(
            {
                clientID: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                callbackURL: '/auth/google/callback',
                // passReqToCallback: true,
            },
            (
                // request: any,
                accessToken: any,
                refreshToken: any,
                profile: any,
                done: Function,
            ) => {
                // console.log('profile:', profile);
                const { id, email, sub, displayName, provider, picture } = profile;

                User.findOne({ googleId: id })
                    .then((user) => {
                        if (!user) {
                            User.create(
                                {
                                    email,
                                    name: displayName,
                                    password: sub,
                                    googleId: id,
                                    provider,
                                    photo: picture,
                                },
                                (err, user) => {
                                    // request.user = user;
                                    return done(err, user);
                                },
                            );
                            return;
                        } else {
                            return done(null, user);
                        }
                    })
                    .catch((err) => console.log(err));
            },
        ),
    );

    passport.use(
        new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
            console.log('email:', email, 'password:', password);
            // Match user
            User.findOne({ email })
                .then((user) => {
                    if (!user) {
                        // no Match
                        done(null, false, { message: 'This email is not registered' });
                    } else {
                        // Match password
                        bcrypt.compare(password, user.password || '', (err, isMatch) => {
                            if (err) throw err;

                            if (isMatch) {
                                return done(null, user);
                            } else {
                                return done(null, false, {
                                    message: 'Password did not match',
                                });
                            }
                        });
                    }
                })
                .catch((err) => console.log(err));
        }),
    );

    passport.serializeUser((user: any, done: Function) => {
        done(null, user);
    });

    passport.deserializeUser((id: string, done: Function) => {
        User.findById(id, (err: any, user: any) => {
            done(err, user);
        });
    });
};

export default passportStrategy;
