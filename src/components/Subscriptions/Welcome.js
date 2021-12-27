import React from 'react';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

function Welcome(props) {
    return (
        <div className={props.className}>
            <Typography variant="h5">There's nothing here...</Typography>
            <Box mt={4}>
                <Button
                    color="secondary"
                    variant="outlined"
                    component={Link}
                    to="/discover"
                >
                    Add some podcasts.
                </Button>
            </Box>
        </div>
    );
}

export default Welcome;
