import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import './Button.scss';

interface Props {
    children: JSX.Element;
    variant?: string;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    className?: string;
}

const AppButton: React.FC<Props> = (props) => {
    const { children, variant, type, onClick, className } = props;
    return (
        <Button
            variant={variant ?? 'dark'}
            className={`px-4 py-2 fs-5 app-btn ${className ?? ''}`}
            type={type ?? 'button'}
            onClick={onClick}
        >
            {children}
        </Button>
    );
};

export default AppButton;
