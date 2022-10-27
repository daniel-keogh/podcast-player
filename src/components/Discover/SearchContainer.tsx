import React from "react";

import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";

// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/Discover... Remove this comment to see the full error message
import DiscoverListItem from "@/components/Discover/DiscoverListItem";
// @ts-expect-error TS(2307): Cannot find module '@/components/Discover/SearchFo... Remove this comment to see the full error message
import SearchForm from "@/components/Discover/SearchForm";

type Props = {
    searchTerm: string;
    searchResults: any[];
    noResultsFound?: boolean;
    onChange: (...args: any[]) => any;
    onSearch: (...args: any[]) => any;
};

function SearchContainer({ searchTerm, searchResults, noResultsFound = false, onChange, onSearch, }: Props) {
  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Typography variant="h5" component="h5">
        Search
      </Typography>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SearchForm
        searchLabel="Search Podcasts..."
        searchTerm={searchTerm}
        onFormChange={onChange}
        onSubmit={onSearch}
      />

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider variant="middle" />

      {/* Show the search results list, or the NoResultsFound component if there were no results. */}
      {!noResultsFound ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <List>
          {searchResults.map((item) => (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <DiscoverListItem {...item} key={item.feedUrl} />
          ))}
        </List>
      ) : (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Box textAlign={"center"} p={7}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="h6">No Results Found...</Typography>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="body2">Please Try Again.</Typography>
        </Box>
      )}
    </React.Fragment>
  );
}

export default SearchContainer;
