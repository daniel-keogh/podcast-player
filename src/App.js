import React, { Suspense, useContext, useEffect } from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import AuthContext from './store/authContext';
import NowPlayingContext from './store/nowPlayingContext';
import NavBar from './components/NavBar/NavBar';
import Player from './components/Player/Player';
import './App.css';

const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Error = React.lazy(() => import('./components/Error/Error'));
const Discover = React.lazy(() => import('./components/Discover/Discover'));
const Podcast = React.lazy(() => import('./components/Podcast/Podcast'));
const Profile = React.lazy(() => import('./components/Profile/Profile'));
const Subscriptions = React.lazy(() => import('./components/Subscriptions/Subscriptions'));

function App() {
    const nowPlaying = useContext(NowPlayingContext);
    const auth = useContext(AuthContext);

    useEffect(() => {
        // Set the page title based on what's playing
        if (auth.isAuthorized && nowPlaying.epTitle && nowPlaying.podTitle) {
            document.title = `${nowPlaying.epTitle} | ${nowPlaying.podTitle} \u00b7 Podcast Player`;
        } else {
            document.title = 'Podcast Player';
        }
    }, [auth.isAuthorized, nowPlaying.epTitle, nowPlaying.podTitle]);

    const rateLimit = (
        <Route path="/rate_limit">
            <Error
                heading="Too Many Requests!"
                message={'Please wait a while & try that again later.'}
            />
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
                                    <Route path="/auth">
                                        <Auth />
                                    </Route>
                                    {rateLimit}
                                    <Route path="/">
                                        <Redirect to="/auth" />
                                    </Route>
                                    <Route path="*">
                                        <Redirect to="/auth" />
                                    </Route>
                                </Switch>
                            </Suspense>
                        ) : (
                            <Suspense fallback={<NavBar />}>
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
                                    {rateLimit}
                                    <Route path="/">
                                        <Redirect to="/subscriptions" />
                                    </Route>
                                    <Route path="*">
                                        <Redirect to="/subscriptions" />
                                    </Route>
                                </Switch>
                            </Suspense>
                        )}
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
                    <Player />
                </div>
            </div>
        </HashRouter>
    );
}

export default App;
