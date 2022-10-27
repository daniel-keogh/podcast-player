import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MuiDialogTitle from "@mui/material/DialogTitle";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import PlayIcon from "@mui/icons-material/PlayCircleOutline";
import TimerIcon from "@mui/icons-material/TimerOutlined";
import CloseIcon from "@mui/icons-material/Close";

import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },

  headerContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      textAlign: "center",
      marginTop: theme.spacing(2),
    },
  },

  headerTitle: {
    flex: "1",
    margin: theme.spacing(2),
  },

  headerArtwork: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },

  metaContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: theme.spacing(2, 1, 0, 1),
    "& > button": {
      marginLeft: "auto",
    },
    [theme.breakpoints.down("sm")]: {
      "& > *": {
        margin: 0,
      },
    },
  },

  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[600],
  },
}));

function EpisodeDialogTitle({
  id,
  podcastTitle,
  episodeTitle,
  artwork,
  date,
  onClose,
  onPlay,
  ...props
}) {
  const classes = useStyles();

  return (
    <MuiDialogTitle className={classes.root} {...props}>
      <div className={classes.headerContainer}>
        <div className={classes.headerArtwork}>
          <SubscriptionItem id={id} title={podcastTitle} artwork={artwork} />
        </div>
        <div className={classes.headerTitle}>
          <Typography variant="h6">{episodeTitle}</Typography>
          <Typography variant="subtitle1">{podcastTitle}</Typography>
        </div>
      </div>

      <Divider variant="fullWidth" />

      <div className={classes.metaContainer}>
        {date ? (
          <Chip icon={<TimerIcon />} label={new Date(date).toDateString()} variant="outlined" />
        ) : (
          <Skeleton variant="text" width={"135px"} />
        )}

        <Button
          autoFocus
          color="primary"
          variant="contained"
          disableElevation
          endIcon={<PlayIcon />}
          onClick={onPlay}
        >
          Play
        </Button>
      </div>

      {onClose ? (
        <IconButton className={classes.closeButton} onClick={onClose} size="large">
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default EpisodeDialogTitle;
