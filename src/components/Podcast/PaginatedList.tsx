import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

type Props = {
    numItems?: number;
    onShowMore: (...args: any[]) => any;
};

function PaginatedList({ numItems = 0, onShowMore, ...props }: Props) {
  const numChildren = React.Children.toArray((props as any).children).length;

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<Box mb={8}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <List>{(props as any).children}</List>

      {/* Only display the "Show More" button if there are items that aren't yet visible in the List. */}
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {numChildren >= numItems && (<Box mx="auto" mt={4} display="flex" justifyContent="center">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button variant="outlined" color="primary" size="large" onClick={onShowMore}>
            Show More
          </Button>
        </Box>)}
    </Box>);
}

export default PaginatedList;
