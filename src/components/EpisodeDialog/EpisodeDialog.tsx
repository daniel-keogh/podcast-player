import React, { useEffect, useState } from "react";
// @ts-expect-error TS(7016): Could not find a declaration file for module 'sani... Remove this comment to see the full error message
import sanitize from "sanitize-html";

import withStyles from "@mui/styles/withStyles";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

// @ts-expect-error TS(2307): Cannot find module '@/services/subscriptionsServic... Remove this comment to see the full error message
import subscriptionsService from "@/services/subscriptionsService";
// @ts-expect-error TS(6142): Module './EpisodeDialogTitle' was resolved to '/mn... Remove this comment to see the full error message
import EpisodeDialogTitle from "./EpisodeDialogTitle";

const EpisodeDialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "450px",
  },
}))(MuiDialogContent);

function SkeletonText({ numLines = 12, linesPerGroup = 4 }) {
  return Array.from(Array(numLines).keys()).map((i) =>
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    i % (linesPerGroup + 1) === 0 ? <br key={i} /> : <Skeleton variant="text" key={i} />
  );
}

function EpisodeDialog({
  open,
  id,
  episodeTitle,
  episodeGuid,
  podcastTitle,
  artwork,
  onPlay,
  onClose
}: any) {
  const [episodeInfo, setEpisodeInfo] = useState({
    description: "",
    date: "",
  });

  useEffect(() => {
    if (open) {
      subscriptionsService
        .getEpisodeByGuid(id, episodeGuid)
        .then((data: any) => {
          let description = sanitize(data.episode.description);

          if (description === "undefined") {
            description = "Failed to load episode description.";
          }

          setEpisodeInfo({
            date: data.episode.date,
            description,
          });
        })
        .catch(console.error);
    }
  }, [open, id, episodeGuid]);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Dialog onClose={onClose} open={open} fullWidth>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <EpisodeDialogTitle
        id={id}
        podcastTitle={podcastTitle}
        episodeTitle={episodeTitle}
        artwork={artwork}
        date={episodeInfo.date}
        onPlay={() => onPlay() & onClose()}
        onClose={onClose}
      />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <EpisodeDialogContent dividers>
        {!episodeInfo.description ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <SkeletonText />
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Typography
            gutterBottom
            dangerouslySetInnerHTML={{
              __html: episodeInfo.description,
            }}
          />
        )}
      </EpisodeDialogContent>
    </Dialog>
  );
}

export default EpisodeDialog;
