import React from "react";
import PropTypes from "prop-types";

import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

import DiscoverListItem from "@/components/Discover/DiscoverListItem";
import SearchForm from "@/components/Discover/SearchForm";
import EmptyState, { EmptyStates } from "@/components/EmptyState";

function SearchContainer({
  searchTerm,
  searchResults,
  noResultsFound = false,
  onChange,
  onSearch,
}) {
  return (
    <React.Fragment>
      <Typography variant="h5" component="h5">
        Search
      </Typography>

      <SearchForm
        searchLabel="Search Podcasts..."
        searchTerm={searchTerm}
        onFormChange={onChange}
        onSubmit={onSearch}
      />

      <Divider variant="middle" />

      {/* Show the search results list, or the NoResultsFound component if there were no results. */}
      {!noResultsFound ? (
        <List>
          {searchResults.map((item) => (
            <DiscoverListItem {...item} key={item.feedUrl} />
          ))}
        </List>
      ) : (
        <EmptyState emptyState={EmptyStates.EMPTY} title="No Results Found..." fullPage={false} />
      )}
    </React.Fragment>
  );
}

SearchContainer.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  searchResults: PropTypes.array.isRequired,
  noResultsFound: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default SearchContainer;
