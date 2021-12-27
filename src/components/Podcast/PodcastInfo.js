import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import Link from '@material-ui/core/Link';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import Headset from '@material-ui/icons/Headset';
import AddOutlinedIcon from '@material-ui/icons/AddOutlined';
import RemoveOutlinedIcon from '@material-ui/icons/RemoveOutlined';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';

const useStyles = makeStyles((theme) => ({
    podcastInfo: {
        display: 'flex',
        overflowX: 'clip',

        [theme.breakpoints.down('xs')]: {
            display: 'block',
        },
    },

    artworkContainer: {
        alignSelf: 'flex-start',

        [theme.breakpoints.down('xs')]: {
            display: 'flex',
            justifyContent: 'center',
        },
    },

    titleContainer: {
        flex: '1',
        marginLeft: theme.spacing(3),
        alignItems: 'center',

        [theme.breakpoints.down('xs')]: {
            marginLeft: 0,
            marginTop: theme.spacing(4),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
        },
    },

    title: {
        marginBottom: theme.spacing(1),
    },

    author: {
        display: 'inline-block',
    },

    chip: {
        padding: '3px',
        margin: theme.spacing(1, 0.75),

        '&:first-child': {
            marginLeft: 0,
        },
    },
}));

function PodcastInfo({
    artwork,
    title,
    link,
    author,
    isSubscribed,
    subscriberCount,
    description,
    onSubscribe,
    ...props
}) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box px={2} py={4} mx={'auto'} my={4}>
                <div className={classes.podcastInfo}>
                    <div className={classes.artworkContainer}>
                        <SubscriptionItem artwork={artwork} />
                    </div>
                    <div className={classes.titleContainer}>
                        <Typography
                            variant="h4"
                            component="h4"
                            className={classes.title}
                        >
                            {title}
                        </Typography>
                        <Link
                            href={link}
                            target="_blank"
                            rel="noreferrer"
                            className={classes.author}
                            variant="subtitle1"
                        >
                            {author}
                        </Link>
                        <Box my={2}>
                            <Chip
                                label={
                                    isSubscribed ? 'Unsubscribe' : 'Subscribe'
                                }
                                variant={isSubscribed ? 'default' : 'outlined'}
                                icon={
                                    isSubscribed ? (
                                        <RemoveOutlinedIcon />
                                    ) : (
                                        <AddOutlinedIcon />
                                    )
                                }
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
                <Box mt={6} mb={2}>
                    <Typography
                        variant="body1"
                        color="textPrimary"
                        component="p"
                    >
                        {description}
                    </Typography>
                </Box>
            </Box>
            <Divider />
        </React.Fragment>
    );
}

export default PodcastInfo;
