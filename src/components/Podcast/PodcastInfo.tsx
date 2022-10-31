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
import { Theme } from "@mui/material/styles";

import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";

const useStyles = makeStyles((theme: Theme) => ({
  podcastInfo: {
    display: "flex",
    overflowX: "clip",
    [theme.breakpoints.down("sm")]: {
      display: "block",
    },
  },
  artworkContainer: {
    alignSelf: "flex-start",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "center",
    },
  },
  titleContainer: {
    flex: "1",
    marginLeft: theme.spacing(3),
    alignItems: "center",
    [theme.breakpoints.down("sm")]: {
      marginLeft: 0,
      marginTop: theme.spacing(4),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  author: {
    display: "inline-block",
  },
  chip: {
    padding: "3px",
    margin: theme.spacing(1, 0.75),
    "&:first-child": {
      marginLeft: 0,
    },
  },
}));

export type PodcastInfoProps = {
  artwork: string;
  title: string;
  link: string;
  author: string;
  isSubscribed: boolean;
  subscriberCount: number;
  description: string;
  onSubscribe: () => void;
};

function PodcastInfo({
  artwork,
  title,
  link,
  author,
  isSubscribed,
  subscriberCount,
  description,
  onSubscribe,
}: PodcastInfoProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Box px={2} py={4} mx="auto" my={4}>
        <div className={classes.podcastInfo}>
          <div className={classes.artworkContainer}>
            <SubscriptionItem artwork={artwork} />
          </div>
          <div className={classes.titleContainer}>
            <Typography variant="h4" component="h4" className={classes.title}>
              {title}
            </Typography>
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
            <Box my={2}>
              <Chip
                label={isSubscribed ? "Unsubscribe" : "Subscribe"}
                variant={isSubscribed ? "filled" : "outlined"}
                icon={isSubscribed ? <RemoveOutlinedIcon /> : <AddOutlinedIcon />}
                color="primary"
                className={classes.chip}
                size="medium"
                onClick={onSubscribe}
              />
              <Tooltip title="Subscribers">
                <Chip
                  label={subscriberCount}
                  color="default"
                  className={classes.chip}
                  icon={<Headset />}
                  size="medium"
                  variant="outlined"
                />
              </Tooltip>
            </Box>
          </div>
        </div>
        <Box mt={6}>
          <Typography variant="body1" color="textPrimary" component="p">
            {description}
          </Typography>
        </Box>
      </Box>
      <Divider />
    </React.Fragment>
  );
}

export default PodcastInfo;
