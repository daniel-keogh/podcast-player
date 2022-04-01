import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

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
    <Card className={classes.card} elevation={0}>
      <CardActionArea
        component={Link}
        to={{
          pathname: `/podcast/${podId}`,
          state: { title: podTitle },
        }}
      >
        <CardMedia className={classes.media} title={podTitle} image={podArtwork} />
      </CardActionArea>
    </Card>
  ) : null;
}

export default React.memo(NowPlayingArtwork);
