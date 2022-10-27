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

// @ts-expect-error TS(2307): Cannot find module '@/components/Subscriptions/Sub... Remove this comment to see the full error message
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";

const useStyles = makeStyles((theme) => ({
    root: {
        margin: 0,
        padding: (theme as any).spacing(2),
    },
    headerContainer: {
        display: "flex",
        alignItems: "center",
        marginBottom: (theme as any).spacing(2),
        [(theme as any).breakpoints.down("sm")]: {
            textAlign: "center",
            marginTop: (theme as any).spacing(2),
        },
    },
    headerTitle: {
        flex: "1",
        margin: (theme as any).spacing(2),
    },
    headerArtwork: {
        [(theme as any).breakpoints.down("sm")]: {
            display: "none",
        },
    },
    metaContainer: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        margin: (theme as any).spacing(2, 1, 0, 1),
        "& > button": {
            marginLeft: "auto",
        },
        [(theme as any).breakpoints.down("sm")]: {
            "& > *": {
                margin: 0,
            },
        },
    },
    closeButton: {
        position: "absolute",
        right: (theme as any).spacing(1),
        top: (theme as any).spacing(1),
        color: (theme as any).palette.grey[600],
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
}: any) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <MuiDialogTitle className={classes.root} {...props}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={classes.headerContainer}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={classes.headerArtwork}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <SubscriptionItem id={id} title={podcastTitle} artwork={artwork} />
        </div>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={classes.headerTitle}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="h6">{episodeTitle}</Typography>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="subtitle1">{podcastTitle}</Typography>
        </div>
      </div>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider variant="fullWidth" />

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <div className={classes.metaContainer}>
        {date ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Chip icon={<TimerIcon />} label={new Date(date).toDateString()} variant="outlined" />
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Skeleton variant="text" width={"135px"} />
        )}

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button
          autoFocus
          color="primary"
          variant="contained"
          disableElevation
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          endIcon={<PlayIcon />}
          onClick={onPlay}
        >
          Play
        </Button>
      </div>

      {onClose ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <IconButton className={classes.closeButton} onClick={onClose} size="large">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
}

export default EpisodeDialogTitle;
