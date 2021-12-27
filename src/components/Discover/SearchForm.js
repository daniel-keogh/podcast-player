import React from 'react';
import { makeStyles } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4, 0),
    },
}));

function SearchForm(props) {
    const classes = useStyles();

    return (
        <form onSubmit={props.onSubmit} className={classes.root}>
            <TextField
                autoFocus
                fullWidth
                name="searchTerm"
                margin="normal"
                type="text"
                variant="filled"
                size={props.size || 'medium'}
                label={props.searchLabel}
                value={props.searchTerm}
                onChange={props.onFormChange}
                // Put a search button at end of the TextField.
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                color="primary"
                                onClick={props.onSubmit}
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </form>
    );
}

export default SearchForm;
