import React, { useEffect, useState } from 'react';
import { IconDefinition as BrandIconDefinition } from '@fortawesome/free-brands-svg-icons';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form } from 'react-bootstrap';
import './FormSection.scss';

interface Props {
    type: string;
    label: string;
    placeholder: string;
    controlId: string;
    value?: string;
    name?: string;
    error?: string | null;
    icon?: IconDefinition | BrandIconDefinition;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checkValid?: () => string | null;
}

const FormSection: React.FC<Props> = (props) => {
    const { label, type, name, error, placeholder, controlId, icon, onChange } = props;

    const [hasError, setHasError] = useState<boolean>(false);
    const [hasBlur, setHasBlur] = useState<boolean>(false);

    const handleBlur = (e: React.ChangeEvent) => {
        onChange && onChange(e as any);
        setHasBlur(true);
    };

    useEffect(() => {
        setHasError(!!error);
    }, [error]);

    return (
        <Form.Group className="mb-3 form-section" controlId={controlId}>
            <Form.Label className="d-flex align-items-center gap-2 form-label">
                {icon && <FontAwesomeIcon icon={icon} className="section-icon" />}
                {label}
            </Form.Label>
            <Form.Control
                name={name}
                onBlur={handleBlur}
                type={type}
                isValid={!error && hasBlur}
                isInvalid={!!error && hasBlur}
                placeholder={placeholder}
                onChange={onChange}
            />
            {hasError && (
                <Form.Text className="d-inline-block mt-1 text-danger">{error}</Form.Text>
            )}
        </Form.Group>
    );
};

export default FormSection;
