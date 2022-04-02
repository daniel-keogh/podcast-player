import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from '@mui/styles/makeStyles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AddIcon from "@mui/icons-material/AddBox";
import NavBar from "@/components/NavBar/NavBar";
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";
import Welcome from "@/components/Subscriptions/Welcome";
import subscriptionsService from "@/services/subscriptionsService";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginLeft: theme.spacing(2),
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
    padding: theme.spacing(4, 2, 8),
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
    <React.Fragment>
      <NavBar title="Subscriptions" hideBackButton>
        <Tooltip title="Add Podcasts">
          <IconButton edge="end" color="inherit" component={Link} to="/discover" size="large">
            <AddIcon />
          </IconButton>
        </Tooltip>

        <Tooltip title="Profile">
          <IconButton
            className={classes.menuButton}
            edge="end"
            color="inherit"
            component={Link}
            to="/profile"
            size="large">
            <AccountCircleIcon />
          </IconButton>
        </Tooltip>
      </NavBar>

      <Container maxWidth="lg">
        {noSubscriptions ? (
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Welcome className={classes.welcome} />
          </Box>
        ) : (
          <div className={classes.subscriptionsGrid}>
            {subscriptions.map(({ _id, title, artwork }) => (
              <SubscriptionItem clickable key={_id} id={_id} title={title} artwork={artwork} />
            ))}
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Subscriptions;
