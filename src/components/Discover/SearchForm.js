import React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

function SearchForm({ size = "medium", searchLabel, searchTerm, onFormChange, onSubmit }) {
  return (
    <Box pt={1} pb={4}>
      <form onSubmit={onSubmit}>
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
    </Box>
  );
}

SearchForm.propTypes = {
  size: PropTypes.oneOf(["small", "medium"]),
  searchLabel: PropTypes.string.isRequired,
  searchTerm: PropTypes.string.isRequired,
  onFormChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchForm;
