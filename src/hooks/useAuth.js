import { useState, useContext } from 'react';
import axios from '../config/axios';

import AuthContext from '../store/authContext';

function useAuth() {
    const [error, setError] = useState('');

    const ctx = useContext(AuthContext);

    const resetError = () => setError('');

    const isValidForm = ({ email, password, confirmPassword }) => {
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

    const login = ({ email, password }) => {
        if (!isValidForm({ email, password })) {
            return Promise.resolve({
                success: false,
                data: null,
            });
        }

        return axios
            .post(`/api/login`, {
                email,
                password,
            })
            .then((data) => {
                ctx.login(data.data.token);
                return {
                    success: ctx.isAuthorized,
                    data,
                };
            })
            .catch(handleError);
    };

    const register = ({ email, password, confirmPassword }) => {
        if (!isValidForm({ email, password, confirmPassword })) {
            return Promise.resolve({
                success: false,
                data: null,
            });
        }

        return axios
            .post('/api/register', {
                email,
                password,
            })
            .then(() => {
                return axios.post('/api/login', {
                    email,
                    password,
                });
            })
            .then((data) => {
                ctx.login(data.data.token);
                return {
                    success: ctx.isAuthorized,
                    data,
                };
            })
            .catch(handleError);
    };

    const updateEmail = ({ email }) => {
        if (!isValidForm({ email })) {
            return Promise.resolve({
                success: false,
                data: null,
            });
        }

        return axios
            .put(`/api/users/${ctx.userId}`, {
                email,
            })
            .then((data) => ({
                success: data.status === 200,
                data,
            }))
            .catch(handleError);
    };

    const updatePassword = ({ oldPassword, password, confirmPassword }) => {
        if (!isValidForm({ password, confirmPassword })) {
            return Promise.resolve({
                success: false,
                data: null,
            });
        }

        return axios
            .put(`/api/password_reset`, {
                oldPassword,
                password,
            })
            .then((data) => ({
                success: data.status === 200,
                data,
            }))
            .catch(handleError);
    };

    const deleteAccount = ({ email, password }) => {
        if (!isValidForm({ email, password })) {
            return Promise.resolve({
                success: false,
                data: null,
            });
        }

        return login({ email, password })
            .then(() => {
                return axios
                    .delete(`/api/users/${ctx.userId}`, {
                        email,
                        password,
                    })
                    .then((data) => ({
                        success: data.status === 204,
                        data,
                    }));
            })
            .catch(handleError);
    };

    const handleError = (err) => {
        if (err.response) {
            setError(err.response.data.msg + '.');
        } else {
            setError('An error occurred. Try again later.');
        }

        return {
            success: false,
            data: null,
        };
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
