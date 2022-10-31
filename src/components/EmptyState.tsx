import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";
import type { UnionValues } from "@/types";

export const EmptyStates = {
  BUGS: "Bugs",
  CRASH: "Crash",
  EMPTY: "Empty",
  LOADING: "Loading",
  LISTENING: "Listening",
  NOT_FOUND: "NotFound",
} as const;

export type EmptyState = UnionValues<typeof EmptyStates>;

const useStyles = makeStyles<Theme, Pick<EmptyStateProps, "fullPage">>((theme: Theme) => ({
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

export type EmptyStateProps = {
  title: string;
  subtitle?: string;
  cta?: string;
  to?: string;
  emptyState: EmptyState;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  fullPage?: boolean;
};

function EmptyState({
  title,
  subtitle,
  cta,
  to,
  emptyState,
  onClick,
  fullPage = true,
}: EmptyStateProps) {
  const classes = useStyles({ fullPage });
  const history = useHistory();
  const [svg, setSvg] = useState("");

  useEffect(() => {
    import(`../assets/emptyState/${emptyState}.svg`).then((d) => setSvg(d.default));
  }, [emptyState]);

  const handleCtaClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (onClick) {
      onClick(e);
    } else {
      history.push(to as string);
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

export default EmptyState;
