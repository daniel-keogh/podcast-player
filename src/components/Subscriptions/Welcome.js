import React from 'react';
import { Button, Typography } from '@material-ui/core';
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
                to={{
                    pathname: "/discover",
                    state: { subscriptions: [] }
                }}
            >
                Click to add some podcasts.
            </Button>
        </div>
    );
}

export default Welcome;