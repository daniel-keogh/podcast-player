import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: (theme as any).spacing(1, 0, 4),
    },
}));

type Props = {
    size?: "small" | "medium";
    searchLabel: string;
    searchTerm: string;
    onFormChange: (...args: any[]) => any;
    onSubmit: (...args: any[]) => any;
};

function SearchForm({ size = "medium", searchLabel, searchTerm, onFormChange, onSubmit }: Props) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <form onSubmit={onSubmit} className={classes.root}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <InputAdornment position="end">
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <IconButton color="primary" onClick={onSubmit} size="large">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
