import React, { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import PasswordInput from './PasswordInput';
import { useAuth } from '../../hooks';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(12),
        marginBottom: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(2),
    },
    form: {
        width: '100%',
        maxWidth: '650px',
        marginTop: theme.spacing(4),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

function AuthForm(props) {
    const classes = useStyles();

    const { error, sendAuthRequest } = useAuth(props.isLogin);

    const [form, setForm] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleFormChanged = (e) => {
        e.persist();

        setForm((state) => ({
            ...state,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await sendAuthRequest(form);

        if (success) {
            props.onAuthorized();
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar
                    className={classes.avatar}
                    src="/logo512.png"
                    alt="Podcast Player"
                />
                <Typography component="h1" variant="h5">
                    {props.isLogin ? 'Welcome Back.' : 'Create Your Account.'}
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <TextField
                        autoFocus
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        id="email"
                        name="email"
                        type="email"
                        label="Email Address"
                        onChange={handleFormChanged}
                        value={form.email}
                        error={error.length > 0}
                    />

                    <PasswordInput
                        id="password"
                        label="Password"
                        value={form.password}
                        onChange={handleFormChanged}
                        error={error.length > 0}
                        helperText={props.isLogin ? error : ''}
                    />

                    {!props.isLogin ? (
                        <PasswordInput
                            id="confirmPassword"
                            label="Confirm Password"
                            value={form.confirmPassword}
                            onChange={handleFormChanged}
                            error={error.length > 0}
                            helperText={error}
                        />
                    ) : null}

                    <Button
                        fullWidth
                        disableElevation
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        {props.isLogin ? 'Login' : 'Register'}
                    </Button>

                    <Grid container justify="flex-end">
                        {props.isLogin ? (
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/auth/register"
                                    variant="body2"
                                >
                                    Don't have an account? Register...
                                </Link>
                            </Grid>
                        ) : (
                            <Grid item>
                                <Link
                                    component={RouterLink}
                                    to="/auth/login"
                                    variant="body2"
                                >
                                    Already have an account? Login...
                                </Link>
                            </Grid>
                        )}
                    </Grid>
                </form>
            </div>
        </Container>
    );
}

export default AuthForm;
