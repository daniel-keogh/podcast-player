import React from 'react';
import Typography from '@material-ui/core/Typography';

function NoResultsFound() {
    return (
        <div style={{
            textAlign: "center",
            padding: "50px"
        }}>
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