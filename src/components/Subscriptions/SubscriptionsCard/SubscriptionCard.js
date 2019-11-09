import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles({
    card: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
});

const SubscriptionCard = (props) => {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    className={classes.media}
                    image={props.artwork}
                    title={props.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.author}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary" onClick={handleViewClicked}>View</Button>
            </CardActions>
        </Card>
    );

    function handleViewClicked() {
        props.history.push(`/podcast/${props.id}`);
    }
}

export default SubscriptionCard;