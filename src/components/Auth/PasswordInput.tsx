import React from "react";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

// @ts-expect-error TS(2307): Cannot find module '@/hooks' or its corresponding ... Remove this comment to see the full error message
import { useToggle } from "@/hooks";

type Props = {
    autoFocus?: boolean;
    id: string;
    label: string;
    value?: string;
    error?: boolean;
    helperText?: string;
    onChange: (...args: any[]) => any;
};

function PasswordInput({ autoFocus = false, id, label, value, error = false, helperText, onChange, }: Props) {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <InputAdornment position="start">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <IconButton onClick={toggleShowPassword} size="large">
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}

export default PasswordInput;
