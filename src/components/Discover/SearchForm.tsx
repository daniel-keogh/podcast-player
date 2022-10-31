import React from "react";

import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";

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

export default SearchForm;
