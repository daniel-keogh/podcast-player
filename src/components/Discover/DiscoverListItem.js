import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import axios from '../../config/axios';

const useStyles = makeStyles((theme) => ({
    isSubscribedIcon: {
        color: theme.palette.success.main,
    },
}));

function DiscoverListItem(props) {
    const classes = useStyles();
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleSubscribe = () => {
        if (!isSubscribed) {
            axios
                .post(`/api/subscriptions`, {
                    feedUrl: props.feedUrl,
                })
                .then(() => {
                    setIsSubscribed(true);
                })
                .catch((err) => {
                    if (err.response) {
                        // Already subscribed
                        if (err.response.status === 409) {
                            setIsSubscribed(true);
                        }
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
                <IconButton
                    edge="end"
                    color="secondary"
                    onClick={handleSubscribe}
                >
                    {isSubscribed ? (
                        <CheckCircleOutline
                            className={classes.isSubscribedIcon}
                        />
                    ) : (
                        <AddCircleOutlineIcon color="primary" />
                    )}
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    );
}

export default DiscoverListItem;
