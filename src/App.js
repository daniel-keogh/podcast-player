import React from 'react';
import './App.css';
import Subscriptions from './components/Subscriptions/Subscriptions';
import Discover from './components/Discover/Discover';
import Podcast from './components/Podcast/Podcast';
import PlayerWrapper from './components/PlayerWrapper/PlayerWrapper';
import { Route, Switch } from 'react-router-dom';

function App() {
    return (
        <div>
            <div className="App">
                <div className="Wrapper">
                    <div className="Main">
                        <div className="Body">
                            <Switch>
                                <Route exact path="/" component={Subscriptions} />
                                <Route path="/discover" component={Discover} />
                                <Route path="/podcast" component={Podcast} />
                            </Switch>
                        </div>
                    </div>
                    <React.Fragment>
                        <PlayerWrapper />
                    </React.Fragment>
                </div>
            </div>
        </div>
    );
}

export default App;
