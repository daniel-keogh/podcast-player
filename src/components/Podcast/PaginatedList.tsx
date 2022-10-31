import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

export type PaginatedListProps = {
  children: React.ReactNode;
  numItems?: number;
  onShowMore: React.MouseEventHandler<HTMLButtonElement>;
};

function PaginatedList({ numItems = 0, onShowMore, ...props }: PaginatedListProps) {
  const numChildren = React.Children.toArray(props.children).length;

  return (
    <Box mb={8}>
      <List>{props.children}</List>

      {/* Only display the "Show More" button if there are items that aren't yet visible in the List. */}
      {numChildren >= numItems && (
        <Box mx="auto" mt={4} display="flex" justifyContent="center">
          <Button variant="outlined" color="primary" size="large" onClick={onShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </Box>
  );
}

export default PaginatedList;
