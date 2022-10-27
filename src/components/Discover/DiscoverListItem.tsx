import React, { useState } from "react";
import PropTypes from "prop-types";

import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";

import discoverService from "@/services/discoverService";
import subscriptionsService from "@/services/subscriptionsService";

function DiscoverListItem({ feedUrl, title, author, artwork, ...props }) {
  const [isSubscribed, setIsSubscribed] = useState(!!props.subscriptionId);
  const [subscriptionId, setSubscriptionId] = useState(props.subscriptionId);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      discoverService
        .subscribe(feedUrl)
        .then((res) => {
          setSubscriptionId(res.data.result._id);
          setIsSubscribed(true);
        })
        .catch((err) => {
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
        .catch((err) => {
          if (err.response?.status === 422) {
            setSubscriptionId("");
            setIsSubscribed(false); // Not subscribed
          }
        });
    }
  };

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar src={artwork} />
      </ListItemAvatar>
      <ListItemText primary={title} secondary={author} />
      <ListItemSecondaryAction>
        <Tooltip title={isSubscribed ? "Unsubscribe" : "Subscribe"}>
          <IconButton edge="end" color="secondary" onClick={handleSubscribe} size="large">
            {isSubscribed ? (
              <CheckCircleOutline color="success" />
            ) : (
              <AddCircleOutlineIcon color="primary" />
            )}
          </IconButton>
        </Tooltip>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

DiscoverListItem.propTypes = {
  feedUrl: PropTypes.string,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  artwork: PropTypes.string.isRequired,
  subscriptionId: PropTypes.string,
};

export default DiscoverListItem;
