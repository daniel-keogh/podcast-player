import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Headset from "@mui/icons-material/Headset";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
// @ts-expect-error TS(2307): Cannot find module '@/components/Subscriptions/Sub... Remove this comment to see the full error message
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";

const useStyles = makeStyles((theme) => ({
    podcastInfo: {
        display: "flex",
        overflowX: "clip",
        [(theme as any).breakpoints.down("sm")]: {
            display: "block",
        },
    },
    artworkContainer: {
        alignSelf: "flex-start",
        [(theme as any).breakpoints.down("sm")]: {
            display: "flex",
            justifyContent: "center",
        },
    },
    titleContainer: {
        flex: "1",
        marginLeft: (theme as any).spacing(3),
        alignItems: "center",
        [(theme as any).breakpoints.down("sm")]: {
            marginLeft: 0,
            marginTop: (theme as any).spacing(4),
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
        },
    },
    title: {
        marginBottom: (theme as any).spacing(1),
    },
    author: {
        display: "inline-block",
    },
    chip: {
        padding: "3px",
        margin: (theme as any).spacing(1, 0.75),
        "&:first-child": {
            marginLeft: 0,
        },
    },
}));

type Props = {
    artwork: string;
    title: string;
    link: string;
    author: string;
    isSubscribed: boolean;
    subscriberCount: number;
    description: string;
    onSubscribe: (...args: any[]) => any;
};

function PodcastInfo({ artwork, title, link, author, isSubscribed, subscriberCount, description, onSubscribe, }: Props) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Box px={2} py={4} mx="auto" my={4}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <div className={classes.podcastInfo}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className={classes.artworkContainer}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <SubscriptionItem artwork={artwork} />
          </div>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <div className={classes.titleContainer}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Typography variant="h4" component="h4" className={classes.title}>
              {title}
            </Typography>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Link
              href={link}
              target="_blank"
              rel="noreferrer"
              className={classes.author}
              variant="subtitle1"
              underline="hover"
            >
              {author}
            </Link>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Box my={2}>
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Chip
                label={isSubscribed ? "Unsubscribe" : "Subscribe"}
                // @ts-expect-error TS(2769): No overload matches this call.
                variant={isSubscribed ? "default" : "outlined"}
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                icon={isSubscribed ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
                color="primary"
                className={classes.chip}
                size="medium"
                onClick={onSubscribe}
              />
              {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Tooltip title="Subscribers">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Chip
                  label={subscriberCount}
                  color="default"
                  className={classes.chip}
                  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  icon={<Headset />}
                  size="medium"
                  variant="outlined"
                />
              </Tooltip>
            </Box>
          </div>
        </div>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box mt={6}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="body1" color="textPrimary" component="p">
            {description}
          </Typography>
        </Box>
      </Box>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider />
    </React.Fragment>
  );
}

export default PodcastInfo;
