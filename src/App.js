import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Discover from './components/Discover/Discover';
import Podcast from './components/Podcast/Podcast';
import Player from './components/Player/Player';
import Subscriptions from './components/Subscriptions/Subscriptions';
import './App.css';

class App extends Component {
    state = {
        nowPlaying: {
            src: '',
            epTitle: '',
            podTitle: ''
        }
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <div className="Wrapper">
                        <div className="Main">
                            <div className="Body">
                                <Switch>
                                    <Route exact path="/" component={Subscriptions} />
                                    <Route path="/discover" component={Discover} />
                                    <Route path="/podcast/:id" render={this.PodcastPage} />
                                </Switch>
                            </div>
                        </div>
                        <div className="Player" style={this.state.nowPlaying.src === '' ? { display: 'none' } : null}>
                            <Player nowPlaying={this.state.nowPlaying} />
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }

    /* Below function necessary in order to pass props to the Podcast component.
     * Based on this answer: https://github.com/ReactTraining/react-router/issues/4105#issuecomment-287262726
     */
    PodcastPage = (props) => {
        return (
            <Podcast
                enqueueEpisode={this.enqueueEpisode}
                {...props}
            />
        );
    }

    enqueueEpisode = (episode) => {
        this.setState({
            nowPlaying: { ...episode }
        });
    }
}

export default App;
