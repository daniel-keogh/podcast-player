import React from "react";
import PropTypes from "prop-types";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import NowPlayingArtwork from "@/components/Player/NowPlayingArtwork";
import PlaybackButtonGroup from "@/components/Player/PlaybackButtonGroup";
import SeekBar from "@/components/Player/SeekBar";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "100%",
    padding: theme.spacing(1, 4),
  },
}));

function PlayerControls({
  currentTime,
  duration,
  isPaused,
  onForward,
  onReplay,
  onPlayPauseClicked,
  onSliderChange,
}) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <Box display="flex" alignItems="center" justifyContent="center">
        <PlaybackButtonGroup
          isPaused={isPaused}
          onForward={onForward}
          onReplay={onReplay}
          onPlayPauseClicked={onPlayPauseClicked}
        />
      </Box>
      <Box
        textAlign="center"
        width="100%"
        minWidth="0"
        display="flex"
        justifyContent="stretch"
        alignItems="center"
      >
        <SeekBar currentTime={currentTime} duration={duration} onSliderChange={onSliderChange} />
        <NowPlayingArtwork />
      </Box>
    </Card>
  );
}

PlayerControls.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  isPaused: PropTypes.bool.isRequired,
  onForward: PropTypes.func.isRequired,
  onReplay: PropTypes.func.isRequired,
  onPlayPauseClicked: PropTypes.func.isRequired,
  onSliderChange: PropTypes.func.isRequired,
};

export default PlayerControls;
