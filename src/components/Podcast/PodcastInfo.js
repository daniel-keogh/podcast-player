import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Headset from '@material-ui/icons/Headset';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import SubscriptionItem from '../Subscriptions/SubscriptionItem';

const useStyles = makeStyles(() => ({
    root: {
        padding: '32px 16px',
        margin: '32px auto',
        display: 'flex',
    },
    podcastInfo: {
        minHeight: '200px',
        paddingLeft: '25px',
    },
    title: {
        marginBottom: '6px',
    },
    author: {
        display: 'inline-block',
    },
    chips: {
        margin: '18px 0',
    },
    chip: {
        padding: '2px',
    },
}));

function PodcastInfo(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div>
                    <SubscriptionItem artwork={props.artwork} />
                </div>
                <div className={classes.podcastInfo}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.title}
                        noWrap
                    >
                        {props.title}
                    </Typography>
                    <Link
                        href={props.link}
                        target="_black"
                        rel="noreferrer"
                        className={classes.author}
                    >
                        {props.author}
                    </Link>
                    <div className={classes.chips}>
                        <Chip
                            label={
                                props.isSubscribed ? 'Unsubscribe' : 'Subscribe'
                            }
                            variant={
                                props.isSubscribed ? 'default' : 'outlined'
                            }
                            icon={
                                props.isSubscribed ? (
                                    <RemoveOutlinedIcon />
                                ) : (
                                    <AddOutlinedIcon />
                                )
                            }
                            color="primary"
                            className={classes.chip}
                            size="medium"
                            style={{ marginRight: '12px' }}
                            onClick={props.onSubscribe}
                        />
                        <Tooltip title="Subscribers">
                            <Chip
                                label={props.subscriberCount}
                                color="default"
                                className={classes.chip}
                                icon={<Headset />}
                                size="medium"
                                variant="outlined"
                            />
                        </Tooltip>
                    </div>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                    >
                        {props.description}
                    </Typography>
                </div>
            </div>
            <Divider />
        </React.Fragment>
    );
}

export default PodcastInfo;
