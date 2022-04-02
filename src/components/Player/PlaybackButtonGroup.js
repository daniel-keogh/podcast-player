import React from "react";
import PropTypes from "prop-types";
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
    color: theme.palette.grey[700],
  },
}));

function PlaybackButtonGroup({ isPaused, onForward, onReplay, onPlayPauseClicked, ...props }) {
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

PlaybackButtonGroup.propTypes = {
  isPaused: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired,
  onPlayPauseClicked: PropTypes.func.isRequired,
};

export default React.memo(PlaybackButtonGroup);
