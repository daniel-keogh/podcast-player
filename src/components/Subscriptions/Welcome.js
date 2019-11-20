import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h5" component="h5">
                There's nothing here...
            </Typography>
            <Button
                color="secondary"
                variant="outlined"
                style={{ margin: "12px" }}
                component={Link}
                to="/discover"
            >
                Click to add some podcasts.
            </Button>
        </div>
    );
}

export default Welcome;