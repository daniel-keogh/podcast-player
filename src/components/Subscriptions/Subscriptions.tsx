import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/AddBox";

// @ts-expect-error TS(2307): Cannot find module '@/components/NavBar/NavBar' or... Remove this comment to see the full error message
import NavBar from "@/components/NavBar/NavBar";
// @ts-expect-error TS(2307): Cannot find module '@/components/Subscriptions/Sub... Remove this comment to see the full error message
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";
// @ts-expect-error TS(2307): Cannot find module '@/components/Subscriptions/Wel... Remove this comment to see the full error message
import Welcome from "@/components/Subscriptions/Welcome";
// @ts-expect-error TS(2307): Cannot find module '@/services/subscriptionsServic... Remove this comment to see the full error message
import subscriptionsService from "@/services/subscriptionsService";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginLeft: (theme as any).spacing(2),
    },
    welcome: {
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        textAlign: "center",
    },
    subscriptionsGrid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, 150px)",
        gap: "1em",
        justifyContent: "center",
        padding: (theme as any).spacing(4, 2, 8),
    },
}));

function Subscriptions() {
  const classes = useStyles();

  const [subscriptions, setSubscriptions] = useState([]);
  const [noSubscriptions, setNoSubscriptions] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const data = await subscriptionsService.getSubscriptions();
        setSubscriptions(data);
        setNoSubscriptions(false);
      } catch {
        setNoSubscriptions(true);
      }
    })();
  }, []);

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <NavBar title="Subscriptions" hideBackButton>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Tooltip title="Add Podcasts">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IconButton edge="end" color="inherit" component={Link} to={Routes.discover} size="large">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AddIcon />
          </IconButton>
        </Tooltip>

        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Tooltip title="Profile">
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <IconButton
            className={classes.menuButton}
            edge="end"
            color="inherit"
            component={Link}
            to={Routes.profile}
            size="large"
          >
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </NavBar>

      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Container maxWidth="xl">
        {noSubscriptions ? (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Box display="flex" justifyContent="center" alignItems="center">
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Welcome className={classes.welcome} />
          </Box>
        ) : (
          // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <div className={classes.subscriptionsGrid}>
            {subscriptions.map(({ _id, title, artwork }) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <SubscriptionItem clickable key={_id} id={_id} title={title} artwork={artwork} />
            ))}
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Subscriptions;
