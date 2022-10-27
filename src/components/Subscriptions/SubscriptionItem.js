import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

import Routes from "@/utils/routes";

const useStyles = makeStyles({
  root: {
    maxWidth: "150px",
  },
  media: {
    height: "150px",
    width: "150px",
  },
});

function SubscriptionItem({ title, artwork, id, clickable = false }) {
  const classes = useStyles();

  const cardMedia = <CardMedia className={classes.media} title={title} image={artwork} />;

  return (
    <Card className={classes.root} elevation={3}>
      {/* If `props.clickable` is true then the card should route to a given podcast via its ID */}
      {clickable ? (
        <CardActionArea
          component={Link}
          to={{
            pathname: `${Routes.podcast}/${id}`,
            state: { title: title },
          }}
        >
          {cardMedia}
        </CardActionArea>
      ) : (
        <CardActionArea>{cardMedia}</CardActionArea>
      )}
    </Card>
  );
}

SubscriptionItem.propTypes = {
  title: PropTypes.string,
  artwork: PropTypes.string.isRequired,
  id: PropTypes.string,
  clickable: PropTypes.bool,
};

export default SubscriptionItem;
