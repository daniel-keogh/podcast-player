import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from '@config/axios';
import SubscriptionItem from '@/Subscriptions/SubscriptionItem';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(3),
    },
    subscriptionsGrid: {
        margin: theme.spacing(1, 0),
        display: 'flex',
        gap: '1em',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: '28px 14px',
    },
}));

const POPULAR_LIMIT = 14;

function Popular(props) {
    const classes = useStyles();
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        axios
            .get(`/api/popular?limit=${POPULAR_LIMIT}`)
            .then((res) => {
                setPopular(res.data.results);
            })
            .catch(console.error);
    }, []);

    return (
        <div className={classes.root}>
            <Typography variant="h5" component="h5">
                Popular
            </Typography>

            <div className={classes.subscriptionsGrid}>
                {popular.map((sub) => {
                    return (
                        <SubscriptionItem
                            clickable
                            key={sub._id}
                            id={sub._id}
                            title={sub.title}
                            artwork={sub.artwork}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default Popular;
