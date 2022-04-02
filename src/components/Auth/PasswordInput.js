import React from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useToggle } from "@/hooks";

function PasswordInput(props) {
  const [showPassword, toggleShowPassword] = useToggle(false);

  return (
    <TextField
      fullWidth
      variant="outlined"
      margin="normal"
      type={showPassword ? "text" : "password"}
      autoFocus={props.autoFocus}
      id={props.id}
      name={props.id}
      label={props.label}
      value={props.value}
      error={props.error}
      helperText={props.helperText}
      onChange={props.onChange}
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
