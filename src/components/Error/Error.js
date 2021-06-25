import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NavBar from '../NavBar/NavBar';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
    },
    heading: {
        marginBottom: theme.spacing(1),
    }
}));

function Error(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <NavBar title={props.title ?? "Error"} />

            <Container maxWidth="sm" className={classes.root}>
                <Typography variant="h5" className={classes.heading}>
                    {props.heading}
                </Typography>
                <Typography variant="body2">
                    {props.message}
                </Typography>
            </Container>
        </React.Fragment>
    );
}

export default Error;
