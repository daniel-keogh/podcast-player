import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useToggle } from '@/hooks';

function PasswordInput(props) {
    const [showPassword, toggleShowPassword] = useToggle(false);

    return (
        <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            type={showPassword ? 'text' : 'password'}
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
                        <IconButton onClick={toggleShowPassword}>
                            {showPassword ? (
                                <VisibilityIcon />
                            ) : (
                                <VisibilityOffIcon />
                            )}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
        />
    );
}

export default PasswordInput;
