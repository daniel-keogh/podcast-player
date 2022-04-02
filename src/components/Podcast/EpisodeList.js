import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import List from "@mui/material/List";

function EpisodeList({ numEpisodes = 0, onShowMore, ...props }) {
  const numChildren = React.Children.toArray(props.children).length;

  return (
    <React.Fragment>
      <List>{props.children}</List>

      {/* Only display the "Show More" button if there are episodes that aren't yet visible in the List. */}
      {numChildren >= numEpisodes && (
        <Box mx={"auto"} mt={4} mb={8} display={"flex"} justifyContent={"center"}>
          <Button variant="outlined" color="primary" size="large" onClick={onShowMore}>
            Show More
          </Button>
        </Box>
      )}
    </React.Fragment>
  );
}

export default EpisodeList;
