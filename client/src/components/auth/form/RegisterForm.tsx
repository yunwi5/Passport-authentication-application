import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import {
    faEnvelope,
    faIdBadge,
    faUnlockAlt,
    faUserLock,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import FormSection from './FormSection';
import { RegisterState } from '../../../models/interfaces';
import { validateEmail, validateName, validatePassword } from '../../../utils/validation';
import { useAuthContext } from '../../../store/auth-context';

interface RegisterStateConfirm extends RegisterState {
    passwordConfirm: string;
}

interface ErrorState {
    name: string | null;
    email: string | null;
    password: string | null;
    passwordConfirm: string | null;
}

enum RegisterName {
    EMAIL = 'email',
    PASSWORD = 'password',
    NAME = 'name',
    PASSWORD_CONFIRM = 'passwordConfirm',
}

const RegisterForm = () => {
    const { registerLocal } = useAuthContext();

    const [registerState, setRegisterState] = useState<RegisterStateConfirm>({
        name: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [errorState, setErrorState] = useState<ErrorState>({
        email: null,
        password: null,
        name: null,
        passwordConfirm: null,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === RegisterName.NAME) {
            const { isValid, message } = validateName(e.target.value);
            if (isValid) {
                setErrorState((ps) => ({ ...ps, name: null }));
            } else {
                setErrorState((ps) => ({ ...ps, name: message }));
            }
        } else if (e.target.name === RegisterName.EMAIL) {
            const newEmail = e.target.value;
            const { isValid, message } = validateEmail(newEmail);
            if (isValid) {
                setErrorState((ps) => ({ ...ps, email: null }));
            } else {
                setErrorState((ps) => ({ ...ps, email: message }));
            }
        } else if (e.target.name === RegisterName.PASSWORD) {
            const newPass = e.target.value;
            const { isValid, message } = validatePassword(newPass);
            if (isValid) {
                setErrorState((ps) => ({ ...ps, password: null }));
            } else {
                setErrorState((ps) => ({ ...ps, password: message }));
            }
        } else if (e.target.name === RegisterName.PASSWORD_CONFIRM) {
            const pc = e.target.value;
            const isValid = pc.trim() && pc === registerState.password;
            if (isValid) {
                setErrorState((ps) => ({ ...ps, passwordConfirm: null }));
            } else {
                setErrorState((ps) => ({ ...ps, passwordConfirm: 'Password does not match' }));
            }
        }
        setRegisterState((ps) => ({ ...ps, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // check if any field has error
        const hasError = Object.values(errorState).some((err) => !!err);
        if (hasError) {
            console.log('form has error!');
            return;
        }
        const hasEmpty = Object.values(registerState).some((field) => !field);
        if (hasEmpty) {
            setErrorState({
                email: !registerState[RegisterName.EMAIL] ? 'Email should not be empty' : null,
                password: !registerState[RegisterName.PASSWORD]
                    ? 'Password should not be empty'
                    : null,
                name: !registerState[RegisterName.NAME] ? 'Name should not be empty' : null,
                passwordConfirm: !registerState[RegisterName.PASSWORD_CONFIRM]
                    ? 'Password confirm should not be empty'
                    : null,
            });
            return;
        }
        registerLocal(registerState);
        // loginLocal(loginState);
    };

    return (
        <Form className="form" onSubmit={handleSubmit}>
            <FormSection
                controlId="formEmail"
                label="Email address"
                type="email"
                placeholder="Enter your email"
                icon={faEnvelope}
                name={RegisterName.EMAIL}
                error={errorState[RegisterName.EMAIL]}
                onChange={handleChange}
            />
            <FormSection
                controlId="formName"
                label="Full Name"
                type="text"
                placeholder="Enter your preferred name"
                icon={faIdBadge}
                name={RegisterName.NAME}
                error={errorState[RegisterName.NAME]}
                onChange={handleChange}
            />
            <FormSection
                controlId="formPassword"
                label="Password"
                type="password"
                placeholder="Enter your password"
                icon={faUnlockAlt}
                name={RegisterName.PASSWORD}
                error={errorState[RegisterName.PASSWORD]}
                onChange={handleChange}
            />
            <FormSection
                controlId="formPasswordConfirm"
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                icon={faUserLock}
                name={RegisterName.PASSWORD_CONFIRM}
                error={errorState[RegisterName.PASSWORD_CONFIRM]}
                onChange={handleChange}
            />
            <Button variant="dark" className="form-btn py-2 fs-5" type="submit">
                Confirm
            </Button>
            <p className="nav-message">
                Already have an account? <Link to="/login">Log In!</Link>
            </p>
        </Form>
    );
};

export default RegisterForm;
function setLoginState(arg0: (ps: any) => any) {
    throw new Error('Function not implemented.');
}
