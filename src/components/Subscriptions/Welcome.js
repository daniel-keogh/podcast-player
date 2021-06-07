import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Welcome(props) {
    return (
        <div className={props.className}>
            <Typography variant="h5">There's nothing here...</Typography>
            <Button
                color="secondary"
                variant="outlined"
                style={{ margin: '12px' }}
                component={Link}
                to="/discover"
            >
                Click to add some podcasts.
            </Button>
        </div>
    );
}

export default Welcome;
