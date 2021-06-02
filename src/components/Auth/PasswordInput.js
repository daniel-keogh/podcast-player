import React, { useState } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

function PasswordInput(props) {
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword((showPassword) => !showPassword);
    };

    return (
        <React.Fragment>
            <TextField
                autoFocus
                fullWidth
                variant="outlined"
                margin="normal"
                type={showPassword ? 'text' : 'password'}
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
                            <IconButton onClick={handleShowPassword}>
                                {showPassword ? (
                                    <Visibility />
                                ) : (
                                    <VisibilityOff />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </React.Fragment>
    );
}

export default PasswordInput;
