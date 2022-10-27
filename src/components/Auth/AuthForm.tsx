import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import GitHubIcon from "@mui/icons-material/GitHub";

import PasswordInput from "@/components/Auth/PasswordInput";
import { useAuth, useForm } from "@/hooks";
import Routes from "@/utils/routes";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(2),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function AuthForm({ isLogin = false, onAuthorized }) {
  const classes = useStyles();

  const { error, login, register } = useAuth();

  const [form, handleFormChanged] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { success } = isLogin ? await login(form) : await register(form);

    if (success) {
      onAuthorized();
    }
  };

  const link = isLogin
    ? { text: "Don't have an account? Register...", to: Routes.register }
    : { text: "Already have an account? Login...", to: Routes.login };

  return (
    <Container component="main" maxWidth="xs">
      <Box display="flex" flexDirection="column" alignItems="center" mt={12} mb={4}>
        <Avatar className={classes.avatar} src="/logo512.png" alt="Podcast Player" />
        <Typography component="h1" variant="h5">
          {isLogin ? "Welcome Back." : "Create Your Account."}
        </Typography>

        <Box mt={4}>
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
              helperText={isLogin ? error : ""}
            />

            {!isLogin ? (
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
              {isLogin ? "Login" : "Register"}
            </Button>

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to={link.to} variant="body2" underline="hover">
                  {link.text}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center">
        <IconButton
          href="https://github.com/daniel-keogh/podcast-player"
          target="_blank"
          size="large"
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Container>
  );
}

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
  onAuthorized: PropTypes.func.isRequired,
};

export default AuthForm;
