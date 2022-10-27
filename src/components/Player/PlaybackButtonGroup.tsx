import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Forward30Icon from "@mui/icons-material/Forward30";
import Replay30Icon from "@mui/icons-material/Replay30";

const useStyles = makeStyles((theme) => ({
    playIcon: {
        height: "52px",
        width: "52px",
    },
    seekIcon: {
        color: (theme as any).palette.grey[700],
    },
}));

type Props = {
    isPaused: boolean;
    onForward: (...args: any[]) => any;
    onReplay: (...args: any[]) => any;
    onPlayPauseClicked: (...args: any[]) => any;
};

function PlaybackButtonGroup({ isPaused, onForward, onReplay, onPlayPauseClicked }: Props) {
  const classes = useStyles();

  const PIcon = isPaused ? PlayCircleFilledIcon : PauseCircleFilledIcon;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ButtonGroup variant="text">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button onClick={onReplay} className={classes.seekIcon}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Replay30Icon fontSize="large" />
      </Button>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button onClick={onPlayPauseClicked} color="primary">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <PIcon className={classes.playIcon} />
      </Button>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button onClick={onForward} className={classes.seekIcon}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Forward30Icon fontSize="large" />
      </Button>
    </ButtonGroup>
  );
}

export default React.memo(PlaybackButtonGroup);
