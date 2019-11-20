import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    card: {
        maxWidth: '150px',
    },
    media: {
        height: '150px',
        width: '150px'
    },
});

function SubscriptionItem(props) {
    const classes = useStyles();

    const cardMedia = (
        <CardMedia
            className={classes.media}
            title={props.title}
            image={props.artwork}
        />
    );

    return (
        <Card className={classes.card} elevation={3}>
            {/* If `props.clickable` is true then the card should route to a given podcast via its ID */}
            {props.clickable
                ? (
                    <CardActionArea component={Link} to={{
                        pathname: `/podcast/${props.id}`,
                        state: { title: props.title }
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