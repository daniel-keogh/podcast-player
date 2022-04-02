import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import NavBar from "@/components/NavBar/NavBar";

const useStyles = makeStyles((theme) => ({
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

function Error(props) {
  const classes = useStyles();

  return (
    <React.Fragment>
      <NavBar title={props.title ?? "Error"} />

      <Container maxWidth="sm" className={classes.root}>
        <Typography variant="h5" className={classes.heading}>
          {props.heading}
        </Typography>
        <Typography variant="body2">{props.message}</Typography>
      </Container>
    </React.Fragment>
  );
}

export default Error;
