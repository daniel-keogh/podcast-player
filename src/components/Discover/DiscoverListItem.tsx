import { useState } from "react";
import { AxiosError } from "axios";

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
import type { SearchResult } from "@/types/api/discover";
import type { ApiError } from "@/types/api/errors";

export type DiscoverListItemProps = SearchResult & {};

function DiscoverListItem({ feedUrl, title, author, artwork, ...props }: DiscoverListItemProps) {
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
        .catch((err: AxiosError<ApiError>) => {
          if (err.response?.status === 409) {
            setIsSubscribed(true); // Already subscribed
          }
        });
    } else {
      subscriptionsService
        .removeSubscription(subscriptionId!)
        .then(() => {
          setSubscriptionId("");
          setIsSubscribed(false);
        })
        .catch((err: AxiosError<ApiError>) => {
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

export default DiscoverListItem;
