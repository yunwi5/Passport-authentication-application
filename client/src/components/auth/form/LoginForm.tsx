import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { faEnvelope, faUnlockAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FormSection from './FormSection';
import { validateEmail, validatePassword } from '../../../utils/validation';
import { useAuthContext } from '../../../store/auth-context';

interface ErrorState {
    email: string | null;
    password: string | null;
}

enum LoginName {
    EMAIL = 'email',
    PASSWORD = 'password',
}

const LoginForm = () => {
    const { loginLocal } = useAuthContext();
    const [loginState, setLoginState] = useState({ email: '', password: '' });
    const [errorState, setErrorState] = useState<ErrorState>({ email: '', password: '' });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === LoginName.EMAIL) {
            const newEmail = e.target.value;
            const { isValid, message } = validateEmail(newEmail);
            if (isValid) {
                setErrorState((ps) => ({ ...ps, email: null }));
            } else {
                setErrorState((ps) => ({ ...ps, email: message }));
            }
        } else if (e.target.name === LoginName.PASSWORD) {
            const newPass = e.target.value;
            const { isValid, message } = validatePassword(newPass);
            if (isValid) {
                setErrorState((ps) => ({ ...ps, password: null }));
            } else {
                setErrorState((ps) => ({ ...ps, password: message }));
            }
        }
        setLoginState((ps) => ({ ...ps, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // check if any field has error
        const hasError = Object.values(errorState).some((err) => !!err);
        if (hasError) return;
        const hasEmpty = Object.values(loginState).some((field) => !field);
        if (hasEmpty) {
            setErrorState({
                email: !loginState[LoginName.EMAIL] ? 'Email should not be empty' : null,
                password: !loginState[LoginName.PASSWORD]
                    ? 'Password should not be empty'
                    : null,
            });
            return;
        }
        console.log('loginState:', loginState);
        loginLocal(loginState);
        // const result = await loginUserLocal(loginState);
    };

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <FormSection
                controlId="formEmail"
                label="Email address"
                type="email"
                name={LoginName.EMAIL}
                placeholder="Enter your email"
                error={errorState[LoginName.EMAIL]}
                value={loginState[LoginName.EMAIL]}
                icon={faEnvelope}
                onChange={handleChange}
            />
            <FormSection
                controlId="formPassword"
                label="Password"
                type="password"
                name={LoginName.PASSWORD}
                error={errorState[LoginName.PASSWORD]}
                value={loginState[LoginName.PASSWORD]}
                placeholder="Enter your password"
                icon={faUnlockAlt}
                onChange={handleChange}
            />
            <Button variant="dark" className="form-btn py-2 fs-5" type="submit">
                Log In
            </Button>
            <p className="nav-message">
                Do not have accout yet? <Link to="/register">Register!</Link>
            </p>
        </Form>
    );
};

export default LoginForm;
