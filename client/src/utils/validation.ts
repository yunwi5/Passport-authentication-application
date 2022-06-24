export const validateEmail = (email: string) => {
    if (!email)
        return {
            isValid: false,
            message: 'Email should not be empty!',
        };
    else if (email.trim().length < 5) {
        return { isValid: false, message: 'Email should be at least 5 characters!' };
    } else if (!email.includes('@')) {
        return { isValid: false, message: "Email should include '@'" };
    }
    return { isValid: true, message: 'Valid' };
};

export const validateName = (name: string) => {
    if (!name)
        return {
            isValid: false,
            message: 'Name should not be empty!',
        };
    else if (name.trim().length < 3)
        return { isValid: false, message: 'Name should be at least 3 characters' };
    return { isValid: true, message: 'Valid' };
};

export const validatePassword = (password: string) => {
    if (!password) return { isValid: false, message: 'Password should not be empty!' };
    if (password.trim().length < 5)
        return { isValid: false, message: 'Password should be at least 5 characters' };
    if (!/\w/.test(password))
        return { isValid: false, message: 'Password should include alphabets' };
    if (!/\d/.test(password))
        return { isValid: false, message: 'Password should include digits' };
    return { isValid: true, message: 'Valid' };
};
