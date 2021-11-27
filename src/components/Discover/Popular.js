import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';
import discoverService from '@/services/discoverService';

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

function Popular() {
    const classes = useStyles();
    const [popular, setPopular] = useState([]);

    useEffect(() => {
        discoverService.getPopular().then(setPopular).catch(console.error);
    }, []);

    return (
        <div className={classes.root}>
            {popular.length > 0 && (
                <Typography variant="h5" component="h5">
                    Popular
                </Typography>
            )}

            <div className={classes.subscriptionsGrid}>
                {popular.map((sub) => (
                    <SubscriptionItem
                        clickable
                        key={sub._id}
                        id={sub._id}
                        title={sub.title}
                        artwork={sub.artwork}
                    />
                ))}
            </div>
        </div>
    );
}

export default Popular;
