import React, { useState } from "react";
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemSecondaryAction from "@mui/material/ListItemSecondaryAction";
import ListItemText from "@mui/material/ListItemText";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutline from "@mui/icons-material/CheckCircleOutline";
import axios from "@/config/axios";

const useStyles = makeStyles((theme) => ({
  isSubscribedIcon: {
    color: theme.palette.success.main,
  },
}));

function DiscoverListItem(props) {
  const classes = useStyles();
  const [isSubscribed, setIsSubscribed] = useState(props.isSubscribed);

  const handleSubscribe = () => {
    if (!isSubscribed) {
      axios
        .post(`/api/subscriptions`, {
          feedUrl: props.feedUrl,
        })
        .then(() => setIsSubscribed(true))
        .catch((err) => {
          if (err?.response?.status === 409) {
            setIsSubscribed(true); // Already subscribed
          }
        });
    }
  };

  return (
    <ListItem divider>
      <ListItemAvatar>
        <Avatar src={props.artwork} />
      </ListItemAvatar>
      <ListItemText primary={props.title} secondary={props.author} />
      <ListItemSecondaryAction>
        <IconButton edge="end" color="secondary" onClick={handleSubscribe} size="large">
          {isSubscribed ? (
            <CheckCircleOutline className={classes.isSubscribedIcon} />
          ) : (
            <AddCircleOutlineIcon color="primary" />
          )}
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

export default DiscoverListItem;
