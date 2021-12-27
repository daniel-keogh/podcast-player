import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PasswordInput from '@/components/Auth/PasswordInput';
import { useAuth, useForm } from '@/hooks';

export const dialogTypes = {
    CHANGE_EMAIL: 'CHANGE_EMAIL',
    CHANGE_PASSWORD: 'CHANGE_PASSWORD',
    CLOSE_ACCOUNT: 'CLOSE_ACCOUNT',
};

function AuthDialog({
    type,
    title,
    message,
    open,
    onSubmit,
    onCancel,
    ...props
}) {
    const changeEmail = type === dialogTypes.CHANGE_EMAIL;
    const changePassword = type === dialogTypes.CHANGE_PASSWORD;
    const closeAccount = type === dialogTypes.CLOSE_ACCOUNT;

    const { error, resetError, ...auth } = useAuth();

    const [form, handleFormChanged, handleFormReset] = useForm({
        email: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
    });

    const handleSubmit = async () => {
        const fn = changeEmail ? auth.updateEmail
                : changePassword ? auth.updatePassword
                : auth.deleteAccount;

        const response = await fn(form);

        if (response.success) {
            resetError();
            onSubmit(response.data);
        }
    };

    const handleCancel = () => {
        handleFormReset();
        resetError();
        onCancel();
    };

    return (
        <Dialog open={open} onClose={onCancel} fullWidth keepMounted>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{message}</DialogContentText>

                {changeEmail || closeAccount ? (
                    <TextField
                        autoFocus
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        onChange={handleFormChanged}
                        value={form.email}
                        error={error.length > 0}
                        helperText={changeEmail ? error : ''}
                    />
                ) : null}
                {changePassword ? (
                    <PasswordInput
                        autoFocus
                        id="oldPassword"
                        label="Old Password"
                        value={form.oldPassword}
                        onChange={handleFormChanged}
                        error={error.length > 0}
                    />
                ) : null}
                {changePassword || closeAccount ? (
                    <PasswordInput
                        id="password"
                        label={`${changePassword ? 'New ' : ''}Password`}
                        value={form.password}
                        onChange={handleFormChanged}
                        error={error.length > 0}
                        helperText={closeAccount ? error : ''}
                    />
                ) : null}
                {changePassword ? (
                    <PasswordInput
                        id="confirmPassword"
                        label="Confirm Password"
                        value={form.confirmPassword}
                        onChange={handleFormChanged}
                        error={error.length > 0}
                        helperText={error}
                    />
                ) : null}
            </DialogContent>
            <DialogActions>
                <Button onClick={handleCancel} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                    Submit
                </Button>
            </DialogActions>
        </Dialog>
    );
}

AuthDialog.propTypes = {
    type: PropTypes.oneOf([...Object.values(dialogTypes)]),
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};

export default AuthDialog;
