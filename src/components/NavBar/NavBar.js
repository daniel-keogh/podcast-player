import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
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
        <AppBar position="sticky" className="NavBar">
            <Toolbar>
                {/* Only show the back button if the history prop was passed to this component */}
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
                <Typography variant="h6" className={classes.title} noWrap>
                    {props.title}
                </Typography>
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;