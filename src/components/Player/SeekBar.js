import React, { useContext } from "react";
import PropTypes from "prop-types";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

import NowPlayingContext from "@/store/nowPlayingContext";

const useStyles = makeStyles({
  progressSlider: {
    width: "90%",
    display: "block",
    margin: "auto",
  },
});

function SeekBar({ currentTime, duration, onSliderChange, ...props }) {
  const classes = useStyles();
  const { epTitle, podTitle } = useContext(NowPlayingContext);

  return (
    <Box flexGrow={1} paddingX={5} paddingTop={2} paddingBottom={3}>
      <Box marginBottom={1}>
        <Typography component="h6" variant="h6" noWrap>
          {epTitle}
        </Typography>
        <Typography color="textSecondary" variant="subtitle2" noWrap>
          {podTitle}
        </Typography>
      </Box>

      <Slider
        className={classes.progressSlider}
        defaultValue={0}
        value={(currentTime / duration) * 100}
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
        onChange={onSliderChange}
      />
    </Box>
  );
}

/* Converts from seconds to HH:MM:SS. Necessary since the HTML <audio> element times (currentTime & duration) are in seconds.
 * Based on this S.O. answer: https://stackoverflow.com/a/37096512
 */
function formatSeconds(secs) {
  if (Number.isNaN(secs)) return "00:00";

  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const s = String(Math.floor((secs % 3600) % 60)).padStart(2, "0");

  if (h === "00") {
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

SeekBar.propTypes = {
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
};

export default SeekBar;
