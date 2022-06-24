import React from 'react';
import { Container } from 'react-bootstrap';
import LoginForm from './form/LoginForm';
import AuthProviders from './parts/AuthProviders';
import AuthSectionDivider from './parts/AuthSectionDivider';

const Login = () => {
    return (
        <main className="flex-center">
            <Container className="auth-container shadow d-flex flex-column gap-3 align-items-center bg-body rounded">
                <h2 className="auth-heading">Log In to Passport Authentication</h2>
                <div className="auth-body h-100 w-100 d-flex gap-3 justify-content-around">
                    <LoginForm />
                    <AuthSectionDivider />
                    <AuthProviders />
                </div>
            </Container>
        </main>
    );
};

export default Login;
