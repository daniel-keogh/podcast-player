import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import { Theme } from "@mui/material/styles";

import PauseCircleFilledIcon from "@mui/icons-material/PauseCircleFilled";
import PlayCircleFilledIcon from "@mui/icons-material/PlayCircleFilled";
import Forward30Icon from "@mui/icons-material/Forward30";
import Replay30Icon from "@mui/icons-material/Replay30";

const useStyles = makeStyles((theme: Theme) => ({
  playIcon: {
    height: "52px",
    width: "52px",
  },
  seekIcon: {
    color: theme.palette.grey[700],
  },
}));

export type PlaybackButtonGroupProps = {
  isPaused: boolean;
  onForward: React.MouseEventHandler<HTMLButtonElement>;
  onReplay: React.MouseEventHandler<HTMLButtonElement>;
  onPlayPauseClicked: React.MouseEventHandler<HTMLButtonElement>;
};

function PlaybackButtonGroup({
  isPaused,
  onForward,
  onReplay,
  onPlayPauseClicked,
}: PlaybackButtonGroupProps) {
  const classes = useStyles();

  const PIcon = isPaused ? PlayCircleFilledIcon : PauseCircleFilledIcon;

  return (
    <ButtonGroup variant="text">
      <Button onClick={onReplay} className={classes.seekIcon}>
        <Replay30Icon fontSize="large" />
      </Button>
      <Button onClick={onPlayPauseClicked} color="primary">
        <PIcon className={classes.playIcon} />
      </Button>
      <Button onClick={onForward} className={classes.seekIcon}>
        <Forward30Icon fontSize="large" />
      </Button>
    </ButtonGroup>
  );
}

export default React.memo(PlaybackButtonGroup);
