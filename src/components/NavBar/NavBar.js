import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton } from '@material-ui/core';
import { ArrowBack } from '@material-ui/icons';

const useStyles = makeStyles(theme => ({
    title: {
        flexGrow: 1,
        userSelect: "none"
    },
    backButton: {
        marginRight: theme.spacing(2)
    }
}));

function NavBar(props) {
    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                {props.history
                    ? (
                        <IconButton
                            className={classes.backButton}
                            edge="start"
                            color="inherit"
                            onClick={props.history.goBack}
                        >
                            <ArrowBack />
                        </IconButton>
                    ) : null
                }
                <Typography variant="h6" className={classes.title}>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;