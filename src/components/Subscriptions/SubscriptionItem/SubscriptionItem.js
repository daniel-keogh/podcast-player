import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        maxWidth: 150,
    },
    media: {
        height: 150,
    },
});

const SubscriptionItem = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={3}>
            <CardActionArea onClick={handleViewClicked}>
                <CardMedia
                    className={classes.media}
                    image={props.artwork}
                    title={props.name}
                />
            </CardActionArea>
        </Card>
    );

    function handleViewClicked() {
        props.history.push(`/podcast/${props.id}`);
    }
}

export default SubscriptionItem;