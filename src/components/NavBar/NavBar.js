import React from "react";
import PropTypes from "prop-types";
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
    marginRight: theme.spacing(2),
  },
}));

function NavBar({ title, hideBackButton = false, isLoading = false, ...props }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <AppBar position="sticky">
      <Toolbar>
        {/* Only show the back button if the history prop was passed to this component. */}
        {!hideBackButton && history ? (
          <IconButton
            className={classes.backButton}
            edge="start"
            color="inherit"
            size="large"
            onClick={history.goBack}
          >
            <ArrowBackIcon />
          </IconButton>
        ) : null}

        <Typography variant="h6" className={classes.title} noWrap>
          {title}
        </Typography>

        {/* Any buttons that go at the end of the NavBar should be passed as children. */}
        {props.children}
      </Toolbar>
      {isLoading && <LinearProgress color="secondary" />}
    </AppBar>
  );
}

NavBar.propTypes = {
  title: PropTypes.string,
  hideBackButton: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default NavBar;
