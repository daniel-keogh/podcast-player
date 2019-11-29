import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
    noResultsFound: {
        textAlign: "center",
        padding: "50px"
    }
}));

function NoResultsFound() {
    const classes = useStyles();

    return (
        <div className={classes.noResultsFound}>
            <Typography variant="h6">
                No Results Found...
            </Typography>
            <Typography variant="body2" component="p">
                Please Try Again.
            </Typography>
        </div>
    );
}

export default NoResultsFound;