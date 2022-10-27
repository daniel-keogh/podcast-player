import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

// @ts-expect-error TS(2307): Cannot find module '@/components/Player/NowPlaying... Remove this comment to see the full error message
import NowPlayingArtwork from "@/components/Player/NowPlayingArtwork";
// @ts-expect-error TS(2307): Cannot find module '@/components/Player/PlaybackBu... Remove this comment to see the full error message
import PlaybackButtonGroup from "@/components/Player/PlaybackButtonGroup";
// @ts-expect-error TS(2307): Cannot find module '@/components/Player/SeekBar' o... Remove this comment to see the full error message
import SeekBar from "@/components/Player/SeekBar";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "100%",
        padding: (theme as any).spacing(1, 4),
    },
}));

type Props = {
    currentTime: number;
    duration: number;
    isPaused: boolean;
    onForward: (...args: any[]) => any;
    onReplay: (...args: any[]) => any;
    onPlayPauseClicked: (...args: any[]) => any;
    onSliderChange: (...args: any[]) => any;
};

function PlayerControls({ currentTime, duration, isPaused, onForward, onReplay, onPlayPauseClicked, onSliderChange, }: Props) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card className={classes.root} elevation={3}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box display="flex" alignItems="center" justifyContent="center">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <PlaybackButtonGroup
          isPaused={isPaused}
          onForward={onForward}
          onReplay={onReplay}
          onPlayPauseClicked={onPlayPauseClicked}
        />
      </Box>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box
        textAlign="center"
        width="100%"
        minWidth="0"
        display="flex"
        justifyContent="stretch"
        alignItems="center"
      >
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <SeekBar currentTime={currentTime} duration={duration} onSliderChange={onSliderChange} />
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <NowPlayingArtwork />
      </Box>
    </Card>
  );
}

export default PlayerControls;
