import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/AddBox";

import NavBar from "@/components/NavBar/NavBar";
import SubscriptionItem from "@/components/Subscriptions/SubscriptionItem";
import subscriptionsService from "@/services/subscriptionsService";
import Routes from "@/utils/routes";
import EmptyState, { EmptyStates } from "../EmptyState";

const useStyles = makeStyles((theme) => ({
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
      <NavBar title="Subscriptions" hideBackButton showMoreMenu>
        <Tooltip title="Add Podcasts">
          <IconButton
            edge="start"
            color="inherit"
            component={Link}
            to={Routes.discover}
            size="large"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
      </NavBar>

      <Container maxWidth="xl">
        {noSubscriptions ? (
          <EmptyState
            emptyState={EmptyStates.NOT_FOUND}
            title="There's nothing here..."
            subtitle="Click below to add some podcasts."
            cta="Discover"
            to={Routes.discover}
          />
        ) : (
          <div className={classes.subscriptionsGrid}>
            {subscriptions.map(({ _id, title, artwork }) => (
              <SubscriptionItem
                clickable={true}
                key={_id}
                id={_id}
                title={title}
                artwork={artwork}
              />
            ))}
          </div>
        )}
      </Container>
    </React.Fragment>
  );
}

export default Subscriptions;
