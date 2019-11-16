import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles(theme => ({
    fab: {
        position: "sticky",
        float: "right",
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    }
}));

function AddNew() {
    const classes = useStyles();

    return (
        <Fab
            color="secondary"
            className={classes.fab}
        >
            <AddIcon />
        </Fab>
    );
}

export default AddNew;