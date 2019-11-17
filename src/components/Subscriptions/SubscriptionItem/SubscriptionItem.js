import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardMedia } from '@material-ui/core'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    card: {
        maxWidth: 150,
    },
    media: {
        height: 150,
        width: 150
    },
});

function SubscriptionItem(props) {
    const classes = useStyles();

    const cardMedia = (
        <CardMedia
            className={classes.media}
            image={props.artwork}
            title={props.name}
        />
    );

    return (
        <Card className={classes.card} elevation={3}>
            {/* If `props.clickable` is true then the card should route to a given podcast via its ID */}
            {props.clickable
                ? (
                    <CardActionArea component={Link} to={{
                        pathname: `/podcast/${props.id}`,
                        state: { title: props.name }
                    }}>
                        {cardMedia}
                    </CardActionArea>
                ) : (
                    <CardActionArea>
                        {cardMedia}
                    </CardActionArea>
                )
            }
        </Card>
    );
}

export default SubscriptionItem;