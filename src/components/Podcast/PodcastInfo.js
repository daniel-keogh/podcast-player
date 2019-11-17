import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Divider, Chip } from '@material-ui/core';
import { Star, RemoveOutlined } from '@material-ui/icons';
import SubscriptionItem from '../Subscriptions/SubscriptionItem';

const useStyles = makeStyles(() => ({
    root: {
        padding: '32px 16px',
        margin: '32px auto',
        display: 'flex'
    },
    podcastInfo: {
        minHeight: '200px',
        paddingLeft: '25px'
    },
    title: {
        marginBottom: '6px'
    },
    author: {
        marginBottom: '6px',
        display: 'inline-block'
    },
    chips: {
        margin: "12px 0",
        display: 'flex'
    },
    divider: {
        margin: "auto"
    }
}));

function PodcastInfo(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <div className={classes.root}>
                <div>
                    <SubscriptionItem artwork={props.image} />
                </div>
                <div className={classes.podcastInfo}>
                    <Typography variant="h5" component="h3" className={classes.title} noWrap>
                        {props.title}
                    </Typography>
                    <Link href={props.link} target="_black" rel="noreferrer" className={classes.author}>
                        {props.author}
                    </Link>
                    <div className={classes.chips}>
                        <Chip
                            label={"Unsubscribe"}
                            color={"primary"}
                            icon={<RemoveOutlined />}
                            style={{ marginRight: "6px" }}
                            size="small"
                            onClick={props.handleSubscribe}
                        />
                        <Chip
                            label={"Favourite"}
                            icon={<Star />}
                            color={"primary"}
                            size="small"
                            onClick={props.handleFavourite}
                        />
                    </div>
                    <Typography component="p">
                        {props.description}
                    </Typography>
                </div>
            </div>
            <Divider className={classes.divider} />
        </React.Fragment>
    );
}

export default PodcastInfo;