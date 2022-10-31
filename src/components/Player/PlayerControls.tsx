import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import { Theme } from "@mui/material/styles";

import NowPlayingArtwork from "@/components/Player/NowPlayingArtwork";
import PlaybackButtonGroup, {
  PlaybackButtonGroupProps,
} from "@/components/Player/PlaybackButtonGroup";
import SeekBar, { SeekBarProps } from "@/components/Player/SeekBar";

const useStyles = makeStyles((theme: Theme) => ({
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

export type PlayerControlsProps = PlaybackButtonGroupProps & SeekBarProps;

function PlayerControls({
  currentTime,
  duration,
  isPaused,
  onForward,
  onReplay,
  onPlayPauseClicked,
  onSliderChange,
}: PlayerControlsProps) {
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

export default PlayerControls;
