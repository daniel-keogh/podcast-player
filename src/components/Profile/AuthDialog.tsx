import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import PasswordInput from "@/components/Auth/PasswordInput";
import { useAuth, useForm } from "@/hooks";
import type { UnionValues } from "@/types";

export const dialogTypes = {
  CHANGE_EMAIL: "CHANGE_EMAIL",
  CHANGE_PASSWORD: "CHANGE_PASSWORD",
  CLOSE_ACCOUNT: "CLOSE_ACCOUNT",
} as const;

export type DialogType = UnionValues<typeof dialogTypes>;

export type AuthDialogProps = {
  type: DialogType;
  title: string;
  message: string;
  open: boolean;
  onSubmit: (data: unknown) => void;
  onCancel: () => void;
};

function AuthDialog({ type, title, message, open, onSubmit, onCancel }: AuthDialogProps) {
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
    <Dialog open={open} onClose={onCancel} fullWidth keepMounted>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
        <Box mt={2}>
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
              helperText={changeEmail ? error : ""}
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
              label={`${changePassword ? "New " : ""}Password`}
              value={form.password}
              onChange={handleFormChanged}
              error={error.length > 0}
              helperText={closeAccount ? error : ""}
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
        </Box>
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
