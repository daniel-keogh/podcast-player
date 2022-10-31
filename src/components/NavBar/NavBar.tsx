import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import AppBar from "@mui/material/AppBar";
import LinearProgress from "@mui/material/LinearProgress";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Theme } from "@mui/material/styles";

import MoreMenu from "./MoreMenu";

const useStyles = makeStyles((theme: Theme) => ({
  title: {
    flexGrow: 1,
    userSelect: "none",
  },
  backButton: {
    marginRight: theme.spacing(2),
  },
}));

export type NavBarProps = {
  children?: React.ReactNode;
  title?: string;
  hideBackButton?: boolean;
  isLoading?: boolean;
  showMoreMenu?: boolean;
};

function NavBar({
  title,
  hideBackButton = false,
  isLoading = false,
  showMoreMenu = false,
  ...props
}: NavBarProps) {
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
        {showMoreMenu && <MoreMenu />}
      </Toolbar>
      {isLoading && <LinearProgress color="secondary" />}
    </AppBar>
  );
}

export default NavBar;
