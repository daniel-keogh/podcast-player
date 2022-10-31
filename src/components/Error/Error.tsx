import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

import NavBar from "@/components/NavBar/NavBar";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: "absolute",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
  },
  heading: {
    marginBottom: theme.spacing(2),
  },
}));

export type ErrorProps = {
  heading: string;
  message: string;
  title?: string;
};

function Error({ title, heading, message }: ErrorProps) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavBar title={title ?? "Error"} />

      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5" className={classes.heading}>
          {heading}
        </Typography>
        <Typography variant="body2">{message}</Typography>
      </Container>
    </React.Fragment>
  );
}

export default Error;
