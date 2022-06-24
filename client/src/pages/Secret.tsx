import React from 'react';
import { Link } from 'react-router-dom';
import AppButton from '../components/ui/Button';

export const Secret = () => {
    return (
        <main className="d-flex flex-column gap-3 align-items-center justify-content-center">
            <h1 className="text-capitalize">Welcome to the secret page!</h1>
            <h3>The secret is vanilla icecream is the best!</h3>
            <AppButton>
                <Link className="link" to="/home">
                    Back to home
                </Link>
            </AppButton>
        </main>
    );
};
