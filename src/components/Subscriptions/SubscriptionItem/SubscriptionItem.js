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

function SubscriptionItem(props) {
    const classes = useStyles();

    const handleItemClicked = () => {
        props.history.push({
            pathname: `/podcast/${props.id}`,
            state: { title: props.name }
        });
    }

    return (
        <Card className={classes.card} elevation={3}>
            <CardActionArea onClick={handleItemClicked}>
                <CardMedia
                    className={classes.media}
                    image={props.artwork}
                    title={props.name}
                />
            </CardActionArea>
        </Card>
    );
}

export default SubscriptionItem;