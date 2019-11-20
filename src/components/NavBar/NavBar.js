import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

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
                {/* Only show the back button if the history prop was passed to this component. */}
                {props.history
                    ? (
                        <IconButton
                            className={classes.backButton}
                            edge="start"
                            color="inherit"
                            onClick={props.history.goBack}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                    ) : null
                }
                <Typography variant="h6" className={classes.title} noWrap>
                    {props.title}
                </Typography>
                {/* Any buttons that go at the end of the NavBar should be passed as children. */}
                {props.children ? props.children : null}
            </Toolbar>
        </AppBar>
    );
}

export default NavBar;