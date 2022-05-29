import React, { Suspense, useContext } from "react";
import { HashRouter, Route, Switch, Redirect } from "react-router-dom";

import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

import AuthContext from "./store/authContext";
import ErrorBoundary from "./components/ErrorBoundary";
import NavBar from "./components/NavBar/NavBar";
import PlayerContainer from "./components/Player/PlayerContainer";
import Routes from "./utils/routes";

const Auth = React.lazy(() => import("./components/Auth/Auth"));
const Discover = React.lazy(() => import("./components/Discover/Discover"));
const History = React.lazy(() => import("./components/History/History"));
const Podcast = React.lazy(() => import("./components/Podcast/Podcast"));
const Profile = React.lazy(() => import("./components/Profile/Profile"));
const Subscriptions = React.lazy(() => import("./components/Subscriptions/Subscriptions"));

function App() {
  const auth = useContext(AuthContext);

  return (
    <HashRouter basename="/">
      <CssBaseline />
      <div className="app">
        <ErrorBoundary>
          <div className="main">
            <div className="body">
              {!auth.isAuthorized ? (
                <Suspense fallback={<></>}>
                  <Switch>
                    <Route path={Routes.auth}>
                      <Auth />
                    </Route>
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
                    <Route path={Routes.history}>
                      <History />
                    </Route>
                    <Route path={`${Routes.podcast}/:id`}>
                      <Podcast />
                    </Route>
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
        </ErrorBoundary>
      </div>
    </HashRouter>
  );
}

export default App;
