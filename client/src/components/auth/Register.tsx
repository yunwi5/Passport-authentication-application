import React from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import AuthProviders from './parts/AuthProviders';
import AuthSectionDivider from './parts/AuthSectionDivider';
import './Auth.scss';
import RegisterForm from './form/RegisterForm';

const Register: React.FC = () => {
    return (
        <main className="flex-center my-4">
            <Container className="auth-container shadow d-flex flex-column gap-3 align-items-center bg-body rounded">
                <h2 className="auth-heading">Sign up and get started</h2>
                <div className="auth-body h-100 w-100 d-flex gap-3 justify-content-around">
                    <RegisterForm />
                    <AuthSectionDivider />
                    <AuthProviders />
                </div>
            </Container>
        </main>
    );
};

export default Register;
