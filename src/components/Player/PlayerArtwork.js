import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles({
    card: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    media: {
        height: '100px',
        width: '100px',
    },
});

function PlayerArtwork(props) {
    const classes = useStyles();

    return (
        <Card className={classes.card} elevation={0}>
            <CardActionArea
                component={Link}
                to={{
                    pathname: `/podcast/${props.id}`,
                    state: { title: props.title },
                }}
            >
                <CardMedia
                    className={classes.media}
                    title={props.title}
                    image={props.artwork}
                />
            </CardActionArea>
        </Card>
    );
}

export default PlayerArtwork;
