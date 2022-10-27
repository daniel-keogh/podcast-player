import React from "react";
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

// @ts-expect-error TS(2307): Cannot find module '@/components/Auth/PasswordInpu... Remove this comment to see the full error message
import PasswordInput from "@/components/Auth/PasswordInput";
// @ts-expect-error TS(2307): Cannot find module '@/hooks' or its corresponding ... Remove this comment to see the full error message
import { useAuth, useForm } from "@/hooks";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

const useStyles = makeStyles((theme) => ({
    avatar: {
        margin: (theme as any).spacing(2),
    },
    submit: {
        margin: (theme as any).spacing(3, 0, 2),
    },
}));

type Props = {
    isLogin?: boolean;
    onAuthorized: (...args: any[]) => any;
};

function AuthForm({ isLogin = false, onAuthorized }: Props) {
  const classes = useStyles();

  const { error, login, register } = useAuth();

  const [form, handleFormChanged] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const { success } = isLogin ? await login(form) : await register(form);

    if (success) {
      onAuthorized();
    }
  };

  const link = isLogin
    ? { text: "Don't have an account? Register...", to: Routes.register }
    : { text: "Already have an account? Login...", to: Routes.login };

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<Container component="main" maxWidth="xs">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box display="flex" flexDirection="column" alignItems="center" mt={12} mb={4}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Avatar className={classes.avatar} src="/logo512.png" alt="Podcast Player"/>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography component="h1" variant="h5">
          {isLogin ? "Welcome Back." : "Create Your Account."}
        </Typography>

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box mt={4}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <form className={(classes as any).form} onSubmit={handleSubmit}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextField autoFocus fullWidth variant="outlined" margin="normal" id="email" name="email" type="email" label="Email Address" onChange={handleFormChanged} value={form.email} error={error.length > 0}/>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <PasswordInput id="password" label="Password" value={form.password} onChange={handleFormChanged} error={error.length > 0} helperText={isLogin ? error : ""}/>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {!isLogin ? (<PasswordInput id="confirmPassword" label="Confirm Password" value={form.confirmPassword} onChange={handleFormChanged} error={error.length > 0} helperText={error}/>) : null}

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button fullWidth disableElevation type="submit" variant="contained" color="primary" className={classes.submit}>
              {isLogin ? "Login" : "Register"}
            </Button>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Grid container justifyContent="flex-end">
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Grid item>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Link component={RouterLink} to={link.to} variant="body2" underline="hover">
                  {link.text}
                </Link>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box display="flex" justifyContent="center">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <IconButton href="https://github.com/daniel-keogh/podcast-player" target="_blank" size="large">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <GitHubIcon />
        </IconButton>
      </Box>
    </Container>);
}

export default AuthForm;
