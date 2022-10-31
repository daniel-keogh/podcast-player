import React, { Suspense, useContext } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";
import { withProfiler } from "@sentry/react";

import CssBaseline from "@mui/material/CssBaseline";
import "@/App.css";

import AuthContext from "@/context/authContext";
import NavBar from "@/components/NavBar/NavBar";
import PlayerContainer from "@/components/Player/PlayerContainer";
import Routes from "@/utils/routes";

const Auth = React.lazy(() => import("@/components/Auth/Auth"));
const Discover = React.lazy(() => import("@/components/Discover/Discover"));
const Error = React.lazy(() => import("@/components/Error/Error"));
const Podcast = React.lazy(() => import("@/components/Podcast/Podcast"));
const Profile = React.lazy(() => import("@/components/Profile/Profile"));
const Subscriptions = React.lazy(() => import("@/components/Subscriptions/Subscriptions"));

function App() {
  const auth = useContext(AuthContext);

  const rateLimit = (
    <Route path={Routes.rateLimit}>
      <Error heading="Too Many Requests!" message={"Please wait a while & try that again later."} />
    </Route>
  );

  return (
    <HashRouter basename="/">
      <CssBaseline />
      <div className="app">
        <div className="main">
          <div className="body">
            {!auth.isAuthorized ? (
              <Suspense fallback={<></>}>
                <Switch>
                  <Route path={Routes.auth}>
                    <Auth />
                  </Route>
                  {rateLimit}
                  <Route path="/">
                    <Redirect to={Routes.auth} />
                  </Route>
                  <Route path="*">
                    <Redirect to={Routes.auth} />
                  </Route>
                </Switch>
              </Suspense>
            ) : (
              <Suspense fallback={<NavBar />}>
                <Switch>
                  <Route path={Routes.subscriptions}>
                    <Subscriptions />
                  </Route>
                  <Route path={Routes.discover}>
                    <Discover />
                  </Route>
                  <Route path={Routes.profile}>
                    <Profile />
                  </Route>
                  <Route path={`${Routes.podcast}/:id`}>
                    <Podcast />
                  </Route>
                  {rateLimit}
                  <Route path="/">
                    <Redirect to={Routes.subscriptions} />
                  </Route>
                  <Route path="*">
                    <Redirect to={Routes.subscriptions} />
                  </Route>
                </Switch>
              </Suspense>
            )}
          </div>
        </div>
        <PlayerContainer className="player" />
      </div>
    </HashRouter>
  );
}

export default withProfiler(App);
