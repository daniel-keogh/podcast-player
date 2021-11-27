import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';

function SearchForm(props) {
    return (
        <form onSubmit={props.onSubmit} style={{ padding: '32px' }}>
            <TextField
                autoFocus
                fullWidth
                name="searchTerm"
                margin="normal"
                type="text"
                variant="filled"
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
