import React from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";

// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
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

type Props = {
    title?: string;
    artwork: string;
    id?: string;
    clickable?: boolean;
};

function SubscriptionItem({ title, artwork, id, clickable = false }: Props) {
  const classes = useStyles();

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  const cardMedia = <CardMedia className={classes.media} title={title} image={artwork} />;

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card className={classes.root} elevation={3}>
      {/* If `props.clickable` is true then the card should route to a given podcast via its ID */}
      {clickable ? (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
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
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <CardActionArea>{cardMedia}</CardActionArea>
      )}
    </Card>
  );
}

export default SubscriptionItem;
