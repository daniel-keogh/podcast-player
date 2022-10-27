import React, { useContext } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";

const useStyles = makeStyles({
  card: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  media: {
    height: "85px",
    width: "85px",
  },
});

function NowPlayingArtwork() {
  const classes = useStyles();
  const { podId, podTitle, podArtwork } = useContext(NowPlayingContext);

  return podId && podTitle && podArtwork ? (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card className={classes.card} elevation={0}>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <CardActionArea
        component={Link}
        to={{
          pathname: `/podcast/${podId}`,
          state: { title: podTitle },
        }}
      >
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardMedia className={classes.media} title={podTitle} image={podArtwork} />
      </CardActionArea>
    </Card>
  ) : null;
}

export default React.memo(NowPlayingArtwork);
