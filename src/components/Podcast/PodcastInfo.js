import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Link, Divider, Chip } from '@material-ui/core';
import { Star, RemoveOutlined, AddOutlined } from '@material-ui/icons';
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
        margin: "12px 0 18px 0",
        display: 'flex'
    },
    chip: {
        cursor: 'pointer'
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
                    <SubscriptionItem artwork={props.artwork} />
                </div>
                <div className={classes.podcastInfo}>
                    <Typography variant="h5" component="h3" className={classes.title} noWrap>
                        {props.name}
                    </Typography>
                    <Link href={props.link} target="_black" rel="noreferrer" className={classes.author}>
                        {props.artist}
                    </Link>
                    <div className={classes.chips}>
                        <Chip
                            label={props.isSubscribed ? "Unsubscribe" : "Subscribe"}
                            color={"primary"}
                            variant={props.isSubscribed ? "default" : "outlined"}
                            icon={props.isSubscribed ? <RemoveOutlined /> : <AddOutlined />}
                            size="small"
                            className={classes.chip}
                            style={{ marginRight: "6px" }}
                            onClick={props.onSubscribe}
                        />
                        <Chip
                            label={"Favourite"}
                            color={"primary"}
                            variant={props.isFavourite ? "default" : "outlined"}
                            icon={<Star />}
                            size="small"
                            className={classes.chip}
                            onClick={props.onFavourite}
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