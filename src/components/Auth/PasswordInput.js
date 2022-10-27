import React from "react";
import PropTypes from "prop-types";

import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

import { useToggle } from "@/hooks";

function PasswordInput({
  autoFocus = false,
  id,
  label,
  value,
  error = false,
  helperText,
  onChange,
}) {
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

PasswordInput.propTypes = {
  autoFocus: PropTypes.bool,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

export default PasswordInput;
