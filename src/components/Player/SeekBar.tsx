import { useContext } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";

import NowPlayingContext from "@/context/nowPlayingContext";
import EpisodeInfo from "./EpisodeInfo";

const useStyles = makeStyles({
  progressSlider: {
    width: "90%",
    display: "block",
    margin: "auto",
  },
});

export type SeekBarProps = {
  currentTime: number;
  duration: number;
  onSliderChange: (event: Event, value: number | number[]) => void;
};

function SeekBar({ currentTime, duration, onSliderChange }: SeekBarProps) {
  const classes = useStyles();
  const { epTitle, podTitle } = useContext(NowPlayingContext);

  return (
    <Box flexGrow={1} paddingX={5} paddingTop={2} paddingBottom={3}>
      <EpisodeInfo episodeTitle={epTitle} podcastTitle={podTitle} />
      <Slider
        className={classes.progressSlider}
        defaultValue={0}
        value={(currentTime / duration) * 100 || 0}
        marks={[
          {
            value: 0,
            label: formatSeconds(currentTime),
          },
          {
            value: 100,
            label: formatSeconds(duration),
          },
        ]}
        size="small"
        onChange={onSliderChange}
      />
    </Box>
  );
}

/* Converts from seconds to HH:MM:SS. Necessary since the HTML <audio> element times (currentTime & duration) are in seconds.
 * Based on this S.O. answer: https://stackoverflow.com/a/37096512
 */
function formatSeconds(secs: number) {
  if (Number.isNaN(secs)) return "00:00";

  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor((secs % 3600) % 60)).padStart(2, "0");

  if (h === "00") {
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

export default SeekBar;
