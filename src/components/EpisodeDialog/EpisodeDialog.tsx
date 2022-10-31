import { useEffect, useState } from "react";
import sanitize from "sanitize-html";

import withStyles from "@mui/styles/withStyles";
import Dialog from "@mui/material/Dialog";
import MuiDialogContent from "@mui/material/DialogContent";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

import subscriptionsService from "@/services/subscriptionsService";
import EpisodeDialogTitle from "./EpisodeDialogTitle";
import SkeletonText from "./SkeletonText";

const EpisodeDialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2),
    height: "450px",
  },
}))(MuiDialogContent);

export type EpisodeDialogProps = {
  open: boolean;
  id: string;
  episodeTitle: string;
  episodeGuid: string;
  podcastTitle: string;
  artwork: string;
  onClose: () => void;
  onPlay: () => void;
};

function EpisodeDialog({
  open,
  id,
  episodeTitle,
  episodeGuid,
  podcastTitle,
  artwork,
  onPlay,
  onClose,
}: EpisodeDialogProps) {
  const [episodeInfo, setEpisodeInfo] = useState({
    description: "",
    date: "",
  });

  useEffect(() => {
    if (open) {
      subscriptionsService.getEpisodeByGuid(id, episodeGuid).then((data) => {
        let description = sanitize(data.episode.description);

        if (description === "undefined") {
          description = "Failed to load episode description.";
        }

        setEpisodeInfo({
          date: data.episode.date,
          description,
        });
      });
    }
  }, [open, id, episodeGuid]);

  return (
    <Dialog onClose={onClose} open={open} fullWidth>
      <EpisodeDialogTitle
        id={id}
        podcastTitle={podcastTitle}
        episodeTitle={episodeTitle}
        artwork={artwork}
        date={episodeInfo.date}
        onPlay={() => {
          onPlay();
          onClose();
        }}
        onClose={onClose}
      />
      <EpisodeDialogContent dividers>
        {!episodeInfo.description ? (
          <SkeletonText />
        ) : (
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
