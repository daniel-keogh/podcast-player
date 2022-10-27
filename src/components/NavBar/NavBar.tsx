import React from "react";
import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const useStyles = makeStyles((theme) => ({
    title: {
        flexGrow: 1,
        userSelect: "none",
    },
    backButton: {
        marginRight: (theme as any).spacing(2),
    },
}));

type Props = {
    title?: string;
    hideBackButton?: boolean;
    isLoading?: boolean;
};

function NavBar({ title, hideBackButton = false, isLoading = false, ...props }: Props) {
  const classes = useStyles();
  const history = useHistory();

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<AppBar position="sticky">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Toolbar>
        {/* Only show the back button if the history prop was passed to this component. */}
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {!hideBackButton && history ? (<IconButton className={classes.backButton} edge="start" color="inherit" size="large" onClick={history.goBack}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ArrowBackIcon />
          </IconButton>) : null}

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography variant="h6" className={classes.title} noWrap>
          {title}
        </Typography>

        {/* Any buttons that go at the end of the NavBar should be passed as children. */}
        {(props as any).children}
      </Toolbar>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {isLoading && <LinearProgress color="secondary"/>}
    </AppBar>);
}

export default NavBar;
