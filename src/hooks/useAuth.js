import { useState, useContext } from 'react';

import AuthContext from '../store/authContext';
import AuthService from '../services/AuthService';

function useAuth() {
    const [error, setError] = useState('');

    const ctx = useContext(AuthContext);

    const resetError = () => setError('');

    const _isValidForm = ({ email, password, confirmPassword }) => {
        if (
            password === '' ||
            (confirmPassword !== undefined && confirmPassword === '') ||
            (email !== undefined && email.trim().length === 0)
        ) {
            setError('All fields are required.');
            return false;
        } else if (
            confirmPassword !== undefined &&
            password !== confirmPassword
        ) {
            setError("Passwords don't match.");
            return false;
        }
        return true;
    };

    const _authHandler = async (fields, callback) => {
        if (!_isValidForm(fields)) {
            return {
                success: false,
                data: null,
            };
        }

        try {
            return await callback();
        } catch (err) {
            if (err.response) {
                setError(err.response.data.msg + '.');
            } else {
                setError('An error occurred. Try again later.');
            }

            return {
                success: false,
                data: null,
            };
        }
    };

    const login = async ({ email, password }) => {
        return _authHandler({ email, password }, async () => {
            const data = await AuthService.login({ email, password });

            ctx.login(data.token);

            return {
                success: ctx.isAuthorized,
                data,
            };
        });
    };

    const register = async ({ email, password, confirmPassword }) => {
        return _authHandler({ email, password, confirmPassword }, async () => {
            const data = await AuthService.register({ email, password });

            ctx.login(data.token);

            return {
                success: ctx.isAuthorized,
                data,
            };
        });
    };

    const updateEmail = async ({ email }) => {
        return _authHandler({ email }, async () => {
            const data = await AuthService.updateEmail({
                email,
                userId: ctx.userId,
            });

            return {
                success: data.status === 200,
                data,
            };
        });
    };

    const updatePassword = async ({
        oldPassword,
        password,
        confirmPassword,
    }) => {
        return _authHandler({ password, confirmPassword }, async () => {
            const data = await AuthService.updatePassword({
                oldPassword,
                password,
            });

            return {
                success: data.status === 200,
                data,
            };
        });
    };

    const deleteAccount = async ({ email, password }) => {
        return _authHandler({ email, password }, async () => {
            const data = await AuthService.deleteAccount({
                email,
                password,
                userId: ctx.userId,
            });

            return {
                success: data.status === 204,
                data,
            };
        });
    };

    return {
        error,
        resetError,
        login,
        register,
        updateEmail,
        updatePassword,
        deleteAccount,
    };
}

export default useAuth;
