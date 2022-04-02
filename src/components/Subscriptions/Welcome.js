import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

function Welcome(props) {
  return (
    <div className={props.className}>
      <Typography variant="h5">There's nothing here...</Typography>
      <Box mt={4}>
        <Button color="secondary" variant="outlined" component={Link} to="/discover">
          Add some podcasts.
        </Button>
      </Box>
    </div>
  );
}

export default Welcome;
