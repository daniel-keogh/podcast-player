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
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';

const useStyles = makeStyles(() => ({
    root: {
        padding: '32px 16px',
        margin: '32px auto auto 0',
    },

    podcastInfo: {
        display: 'flex',
        overflowX: 'clip',
        '@media (max-width:500px)': {
            display: 'block',
        },
    },

    artworkContainer: {
        alignSelf: 'flex-start',
        '@media (max-width:500px)': {
            display: 'flex',
            justifyContent: 'center',
        },
    },

    titleContainer: {
        flex: '1',
        marginLeft: '25px',
        alignItems: 'center',
        '@media (max-width:500px)': {
            marginLeft: 0,
            marginTop: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
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
        padding: '3px',
    },

    description: {
        marginTop: '48px',
        marginBottom: '16px',
    },
}));

function PodcastInfo(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div className={classes.podcastInfo}>
                    <div className={classes.artworkContainer}>
                        <SubscriptionItem artwork={props.artwork} />
                    </div>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            {props.title}
                        </Typography>
                        <Link
                            href={props.link}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.author}
                            variant="subtitle1"
                        >
                            {props.author}
                        </Link>
                        <div className={classes.chips}>
                            <Chip
                                label={
                                    props.isSubscribed
                                        ? 'Unsubscribe'
                                        : 'Subscribe'
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
                    </div>
                </div>
                <div className={classes.description}>
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
