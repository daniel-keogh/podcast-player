import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(3),
  },
}));

function SearchContainer(props) {
  const classes = useStyles();

  const handleFormChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  const handleSearch = (e) => {
    // Search for the query entered into the search box.
    this.search();
    e.preventDefault();
  };

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h5">
        Search
      </Typography>

      <SearchForm
        searchLabel="Search Podcasts..."
        searchTerm={props.searchTerm}
        onFormChange={handleFormChange}
        onSubmit={handleSearch}
      />

      <Divider />

      {/* Show the search results list, or the NoResultsFound component if there were no results. */}
      {!this.state.noResultsFound ? (
        <List>
          {this.state.searchResults.map((item) => (
            <DiscoverListItem {...item} key={item.feedUrl} />
          ))}
        </List>
      ) : (
        <NoResultsFound />
      )}
    </div>
  );
}

export default SearchContainer;
