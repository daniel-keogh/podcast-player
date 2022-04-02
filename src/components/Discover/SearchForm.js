import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

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
        size={props.size || "medium"}
        label={props.searchLabel}
        value={props.searchTerm}
        onChange={props.onFormChange}
        // Put a search button at end of the TextField.
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={props.onSubmit} size="large">
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
