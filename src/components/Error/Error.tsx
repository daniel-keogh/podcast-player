import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
// @ts-expect-error TS(2307): Cannot find module '@/components/NavBar/NavBar' or... Remove this comment to see the full error message
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
        marginBottom: (theme as any).spacing(2),
    },
}));

function Error(props: any) {
  const classes = useStyles();

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <NavBar title={props.title ?? "Error"} />

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Container maxWidth="sm" className={classes.root}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography variant="h5" className={classes.heading}>
          {props.heading}
        </Typography>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography variant="body2">{props.message}</Typography>
      </Container>
    </React.Fragment>
  );
}

export default Error;
