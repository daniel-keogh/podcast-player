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
                    title={props.podName}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        {props.podName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {props.podAuthor}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">View</Button>
            </CardActions>
        </Card>
    );
}

export default SubscriptionCard;