import React from "react";
import { useHistory } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
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
    marginRight: theme.spacing(2),
  },
}));

function NavBar(props) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Only show the back button if the history prop was passed to this component. */}
        {!props.hideBackButton && history ? (
          <IconButton
            className={classes.backButton}
            edge="start"
            color="inherit"
            onClick={history.goBack}
            size="large">
            <ArrowBackIcon />
          </IconButton>
        ) : null}
        <Typography variant="h6" className={classes.title} noWrap>
          {props.title}
        </Typography>
        {/* Any buttons that go at the end of the NavBar should be passed as children. */}
        {props.children}
      </Toolbar>
      {props.isLoading && <LinearProgress color="secondary" />}
    </AppBar>
  );
}

export default NavBar;
