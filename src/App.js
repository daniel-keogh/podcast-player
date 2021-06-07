import React, { Suspense, useContext } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from './store/authContext';
import NowPlayingContext from './store/nowPlayingContext';
import Player from './components/Player/Player';
import './App.css';

const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Podcast = React.lazy(() => import('./components/Podcast/Podcast'));
const Discover = React.lazy(() => import('./components/Discover/Discover'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const Subscriptions = React.lazy(() => import('./components/Subscriptions/Subscriptions'));

function App() {
    const nowPlaying = useContext(NowPlayingContext);
    const auth = useContext(AuthContext);

    return (
        <HashRouter basename="/">
            <CssBaseline />
            <div className="app">
                <div className="main">
                    <div className="body">
                        <Suspense fallback={<></>}>
                            {!auth.isAuthorized ? (
                                <Switch>
                                    <Route path="/auth">
                                        <Auth />
                                    </Route>
                                    <Route path="/">
                                        <Redirect to="/auth" />
                                    </Route>
                                    <Route path="*">
                                        <Redirect to="/auth" />
                                    </Route>
                                </Switch>
                            ) : (
                                <Switch>
                                    <Route path="/subscriptions">
                                        <Subscriptions />
                                    </Route>
                                    <Route path="/discover">
                                        <Discover />
                                    </Route>
                                    <Route path="/profile">
                                        <Profile />
                                    </Route>
                                    <Route path="/podcast/:id">
                                        <Podcast />
                                    </Route>
                                    <Route path="/">
                                        <Redirect to="/subscriptions" />
                                    </Route>
                                    <Route path="*">
                                        <Redirect to="/subscriptions" />
                                    </Route>
                                </Switch>
                            )}
                        </Suspense>
                    </div>
                </div>
                <div
                    className="player"
                    style={
                        !auth.isAuthorized || nowPlaying.src === ''
                            ? { display: 'none' }
                            : null
                    }
                >
                    <Player nowPlaying={nowPlaying} />
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
