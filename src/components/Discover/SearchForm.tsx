import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Theme } from "@mui/material/styles";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(1, 0, 4),
  },
}));

export type SearchFormProps = {
  size?: "small" | "medium";
  searchLabel: string;
  searchTerm: string;
  onFormChange: React.ChangeEventHandler<HTMLInputElement>;
  onSubmit: React.EventHandler<React.FormEvent | React.ChangeEvent>;
};

function SearchForm({
  size = "medium",
  searchLabel,
  searchTerm,
  onFormChange,
  onSubmit,
}: SearchFormProps) {
  const classes = useStyles();

  return (
    <form onSubmit={onSubmit} className={classes.root}>
      <TextField
        autoFocus
        fullWidth
        name="searchTerm"
        margin="normal"
        type="text"
        variant="filled"
        size={size}
        label={searchLabel}
        value={searchTerm}
        onChange={onFormChange}
        // Put a search button at end of the TextField.
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton color="primary" onClick={onSubmit} size="large">
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
