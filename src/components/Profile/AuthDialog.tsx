import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

// @ts-expect-error TS(2307): Cannot find module '@/components/Auth/PasswordInpu... Remove this comment to see the full error message
import PasswordInput from "@/components/Auth/PasswordInput";
// @ts-expect-error TS(2307): Cannot find module '@/hooks' or its corresponding ... Remove this comment to see the full error message
import { useAuth, useForm } from "@/hooks";

export const dialogTypes = {
  CHANGE_EMAIL: "CHANGE_EMAIL",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CLOSE_ACCOUNT: "CLOSE_ACCOUNT",
};

type Props = {
    type?: any; // TODO: PropTypes.oneOf([...Object.values(dialogTypes)])
    title: string;
    message: string;
    open: boolean;
    onSubmit: (...args: any[]) => any;
    onCancel: (...args: any[]) => any;
};

function AuthDialog({ type, title, message, open, onSubmit, onCancel }: Props) {
  const changeEmail = type === dialogTypes.CHANGE_EMAIL;
  const changePassword = type === dialogTypes.CHANGE_PASSWORD;
  const closeAccount = type === dialogTypes.CLOSE_ACCOUNT;

  const { error, resetError, ...auth } = useAuth();

  const [form, handleFormChanged, handleFormReset] = useForm({
    email: "",
    password: "",
    confirmPassword: "",
    oldPassword: "",
  });

  const handleSubmit = async () => {
    const fn = changeEmail
      ? auth.updateEmail
      : changePassword
      ? auth.updatePassword
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
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Dialog open={open} onClose={onCancel} fullWidth keepMounted>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogTitle>{title}</DialogTitle>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogContent>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DialogContentText>{message}</DialogContentText>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box mt={2}>
          {changeEmail || closeAccount ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
              helperText={changeEmail ? error : ""}
            />
          ) : null}
          {changePassword ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <PasswordInput
              id="password"
              label={`${changePassword ? "New " : ""}Password`}
              value={form.password}
              onChange={handleFormChanged}
              error={error.length > 0}
              helperText={closeAccount ? error : ""}
            />
          ) : null}
          {changePassword ? (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <PasswordInput
              id="confirmPassword"
              label="Confirm Password"
              value={form.confirmPassword}
              onChange={handleFormChanged}
              error={error.length > 0}
              helperText={error}
            />
          ) : null}
        </Box>
      </DialogContent>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DialogActions>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button onClick={handleSubmit} color="primary">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AuthDialog;
