import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import PasswordInput from '@/Auth/PasswordInput';
import { useAuth } from '@hooks';

function AuthDialog(props) {
    const changeEmail = props.type === 'CHANGE_EMAIL';
    const changePassword = props.type === 'CHANGE_PASSWORD';
    const closeAccount = props.type === 'CLOSE_ACCOUNT';

    const { error, resetError, updateEmail, updatePassword, deleteAccount } = useAuth();

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        oldPassword: '',
    });

    const handleFormChanged = (e) => {
        e.persist();

        setForm((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        let response = {};

        if (changeEmail) {
            response = await updateEmail(form);
        } else if (changePassword) {
            response = await updatePassword(form);
        } else if (closeAccount) {
            response = await deleteAccount(form);
        }

        if (response.success) {
            resetError();
            props.onSubmit(response.data);
        }
    };

    const handleCancel = () => {
        setForm({
            email: '',
            password: '',
            confirmPassword: '',
            oldPassword: '',
        });

        resetError();
        props.onCancel();
    };

    return (
        <Dialog
            open={props.open}
            onClose={props.onCancel}
            fullWidth
            keepMounted
        >
            <DialogTitle>{props.title}</DialogTitle>
            <DialogContent>
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

export default AuthDialog;
