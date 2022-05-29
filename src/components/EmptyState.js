import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export const EmptyStates = {
  BUGS: "Bugs",
  CRASH: "Crash",
  EMPTY: "Empty",
  LOADING: "Loading",
  LISTENING: "Listening",
  NOT_FOUND: "NotFound",
};

const useStyles = makeStyles((theme) => ({
  root: ({ fullPage }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: fullPage ? theme.spacing(4, 0, 8) : theme.spacing(4, 0, 0),
  }),
  emptyState: ({ fullPage }) => ({
    marginTop: fullPage ? "20%" : theme.spacing(2),
  }),
  image: ({ fullPage }) => ({
    width: "100%",
    maxWidth: fullPage ? "300px" : "200px",
    userSelect: "none",
    pointerEvents: "none",
  }),
}));

function EmptyState({ title, subtitle, cta, to, emptyState, onClick, fullPage = true }) {
  const classes = useStyles({ fullPage });
  const history = useHistory();
  const [svg, setSvg] = useState("");

  useEffect(() => {
    import(`../assets/emptyState/${emptyState}.svg`).then((d) => setSvg(d.default));
  }, [emptyState]);

  const handleCtaClick = (e) => {
    if (onClick) {
      onClick(e);
    } else {
      history.push(to);
    }
  };

  return (
    <Container maxWidth="sm" className={classes.root}>
      {svg && (
        <div className={classes.emptyState}>
          <img src={svg} alt={emptyState} className={classes.image} />
          {fullPage ? (
            <Typography variant="h5" marginTop={6} marginBottom={subtitle ? 1 : 5}>
              {title}
            </Typography>
          ) : (
            <Typography variant="h6" marginTop={4} marginBottom={subtitle ? 1 : 0}>
              {title}
            </Typography>
          )}
          {subtitle && (
            <Typography variant="subtitle1" color="GrayText" marginBottom={4}>
              {subtitle}
            </Typography>
          )}
          {fullPage && (
            <div>
              <Button color="primary" variant="outlined" onClick={handleCtaClick}>
                {cta}
              </Button>
            </div>
          )}
        </div>
      )}
    </Container>
  );
}

EmptyState.propTypes = {
  cta: PropTypes.string,
  emptyState: PropTypes.oneOf(Object.values(EmptyStates)).isRequired,
  fullPage: PropTypes.bool,
  subtitle: PropTypes.string,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default EmptyState;
