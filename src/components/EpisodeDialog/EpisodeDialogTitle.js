import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MuiDialogTitle from "@material-ui/core/DialogTitle";

import PlayIcon from "@material-ui/icons/PlayCircleOutline";
import TimerIcon from "@material-ui/icons/Timer";
import CloseIcon from "@material-ui/icons/Close";

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

    [theme.breakpoints.down("xs")]: {
      textAlign: "center",
      marginTop: theme.spacing(2),
    },
  },

  headerTitle: {
    flex: "1",
    margin: theme.spacing(2),
  },

  headerArtwork: {
    [theme.breakpoints.down("xs")]: {
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
    [theme.breakpoints.down("xs")]: {
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
    <MuiDialogTitle disableTypography className={classes.root} {...props}>
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
        {date && (
          <Chip icon={<TimerIcon />} label={new Date(date).toDateString()} variant="outlined" />
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
        <IconButton className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default EpisodeDialogTitle;
