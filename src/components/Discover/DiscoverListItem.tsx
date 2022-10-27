import React, { useState } from "react";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

// @ts-expect-error TS(2307): Cannot find module '@/services/discoverService' or... Remove this comment to see the full error message
import discoverService from "@/services/discoverService";
// @ts-expect-error TS(2307): Cannot find module '@/services/subscriptionsServic... Remove this comment to see the full error message
import subscriptionsService from "@/services/subscriptionsService";

type Props = {
    feedUrl?: string;
    title: string;
    author: string;
    artwork: string;
    subscriptionId?: string;
};

function DiscoverListItem({ feedUrl, title, author, artwork, ...props }: Props) {
  const [isSubscribed, setIsSubscribed] = useState(!!props.subscriptionId);
  const [subscriptionId, setSubscriptionId] = useState(props.subscriptionId);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      discoverService
        .subscribe(feedUrl)
        .then((res: any) => {
          setSubscriptionId(res.data.result._id);
          setIsSubscribed(true);
        })
        .catch((err: any) => {
          if (err.response?.status === 409) {
            setIsSubscribed(true); // Already subscribed
          }
        });
    } else {
      subscriptionsService
        .removeSubscription(subscriptionId)
        .then(() => {
          setSubscriptionId("");
          setIsSubscribed(false);
        })
        .catch((err: any) => {
          if (err.response?.status === 422) {
            setSubscriptionId("");
            setIsSubscribed(false); // Not subscribed
          }
        });
    }
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ListItem divider>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ListItemAvatar>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Avatar src={artwork} />
      </ListItemAvatar>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ListItemText primary={title} secondary={author} />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ListItemSecondaryAction>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Tooltip title={isSubscribed ? "Unsubscribe" : "Subscribe"}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IconButton edge="end" color="secondary" onClick={handleSubscribe} size="large">
            {isSubscribed ? (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <CheckCircleOutline color="success" />
            ) : (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <AddCircleOutlineIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default DiscoverListItem;
