import React, { Suspense, useContext } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import AuthContext from './store/authContext';
import NowPlayingContext from './store/nowPlayingContext';

import Player from './components/Player/Player';

import './App.css';

const Auth = React.lazy(() => import('./components/Auth/Auth'));
const Podcast = React.lazy(() => import('./components/Podcast/Podcast'));
const Discover = React.lazy(() => import('./components/Discover/Discover'));
const Subscriptions = React.lazy(() => import('./components/Subscriptions/Subscriptions'));

function App() {
    const nowPlaying = useContext(NowPlayingContext);
    const auth = useContext(AuthContext);

    return (
        <BrowserRouter>
            <div className="App">
                <div className="Main">
                    <div className="Body">
                        <Suspense fallback={<></>}>
                            <Switch>
                                {!auth.isAuthorized ? (
                                    <React.Fragment>
                                        <Route path="/auth">
                                            <Auth />
                                        </Route>
                                        <Route path="/">
                                            <Redirect to="/auth" />
                                        </Route>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment>
                                        <Route path="/subscriptions">
                                            <Subscriptions />
                                        </Route>
                                        <Route path="/discover">
                                            <Discover />
                                        </Route>
                                        <Route path="/podcast/:id">
                                            <Podcast />
                                        </Route>
                                        <Route path="/">
                                            <Redirect to="/subscriptions" />
                                        </Route>
                                    </React.Fragment>
                                )}
                            </Switch>
                        </Suspense>
                    </div>
                </div>
                <div
                    className="Player"
                    style={nowPlaying.src === '' ? { display: 'none' } : null}
                >
                    <Player nowPlaying={nowPlaying} />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
