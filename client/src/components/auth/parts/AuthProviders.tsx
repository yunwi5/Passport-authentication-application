import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from 'react-bootstrap';
import { GoogleIcon, FacebookIcon, GitHubIcon } from '../../icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import Properties from '../../../constants';
import './AuthProviders.scss';

const AuthProviders: React.FC = () => {
    const handleGoogleLogin = () => {
        window.open(`${Properties.ServerDomain}/auth/google/login`, '_self');
    };

    const handleGitHubLogin = () => {
        window.open(`${Properties.ServerDomain}/auth/github/login`, '_self');
    };

    const handleLinkedInLogin = () => {
        window.open(`${Properties.ServerDomain}/auth/linkedin/login`, '_self');
    };

    return (
        <div className="auth-providers">
            <Button
                variant="light"
                className="btn-custom btn-provider"
                onClick={handleGoogleLogin}
            >
                <GoogleIcon width="30px" height="30px" />
                Continue with Google
            </Button>
            <Button variant="primary" className="btn-custom btn-provider">
                <FacebookIcon width="32px" height="32px" />
                Continue with Facebook
            </Button>
            <Button
                variant="dark"
                className="btn-custom btn-provider"
                onClick={handleGitHubLogin}
            >
                <GitHubIcon width="30px" height="30px" />
                Continue with GitHub
            </Button>
            <Button
                className="btn-custom btn-provider btn-linkedin"
                onClick={handleLinkedInLogin}
            >
                <FontAwesomeIcon icon={faLinkedin} className="btn-provider__icon" />
                Continue with LinkedIn
            </Button>
        </div>
    );
};

export default AuthProviders;
