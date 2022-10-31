import React from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useToggle } from "@/hooks";

export type PasswordInputProps = {
  autoFocus?: boolean;
  id: string;
  label: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

function PasswordInput({
  autoFocus = false,
  id,
  label,
  value,
  error = false,
  helperText,
  onChange,
}: PasswordInputProps) {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      type={showPassword ? "text" : "password"}
      autoFocus={autoFocus}
      id={id}
      name={id}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
      InputProps={{
        endAdornment: (
          <InputAdornment position="start">
            <IconButton onClick={toggleShowPassword} size="large">
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
