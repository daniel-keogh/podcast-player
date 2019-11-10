import React from 'react';
import { Button, Typography } from '@material-ui/core';

const Welcome = (props) => {
    return (
        <div style={{ textAlign: "center" }}>
            <Typography variant="h5">
                There's nothing here...
            </Typography>
            <Button
                color="secondary"
                variant="outlined"
                style={{ margin: "12px" }}
                onClick={props.handleAddNewClicked}
            >
                Click to add some podcasts.
            </Button>
        </div>
    );
}

export default Welcome;