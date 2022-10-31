import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export type EpisodeInfoProps = {
  episodeTitle: string;
  podcastTitle: string;
};

const EpisodeInfo = ({ episodeTitle, podcastTitle }: EpisodeInfoProps) => {
  return (
    <Box marginBottom={1}>
      <Typography component="h6" variant="h6" noWrap>
        {episodeTitle}
      </Typography>
      <Typography color="textSecondary" variant="subtitle2" noWrap>
        {podcastTitle}
      </Typography>
    </Box>
  );
};

export default React.memo(EpisodeInfo);
