import React, { useContext } from "react";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";

const useStyles = makeStyles({
  progressSlider: {
    width: "90%",
    display: "block",
    margin: "auto",
  },
});

type Props = {
    currentTime: number;
    duration: number;
    onSliderChange: (...args: any[]) => any;
};

function SeekBar({ currentTime, duration, onSliderChange }: Props) {
  const classes = useStyles();
  const { epTitle, podTitle } = useContext(NowPlayingContext);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Box flexGrow={1} paddingX={5} paddingTop={2} paddingBottom={3}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box marginBottom={1}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography component="h6" variant="h6" noWrap>
          {epTitle}
        </Typography>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography color="textSecondary" variant="subtitle2" noWrap>
          {podTitle}
        </Typography>
      </Box>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
function formatSeconds(secs: any) {
  if (Number.isNaN(secs)) return "00:00";

  // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
  const h = String(Math.floor(secs / 3600)).padStart(2, "0");
  // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
  const m = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  // @ts-expect-error TS(2550): Property 'padStart' does not exist on type 'string... Remove this comment to see the full error message
  const s = String(Math.floor((secs % 3600) % 60)).padStart(2, "0");

  if (h === "00") {
    return `${m}:${s}`;
  }
  return `${h}:${m}:${s}`;
}

export default SeekBar;
