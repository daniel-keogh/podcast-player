import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import EpisodeListItem from './EpisodeListItem/EpisodeListItem';
import { List } from '@material-ui/core';

class Podcast extends Component {
    state = {
        podcast: {}
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/subscriptions/${this.props.match.params.id}`)
            .then(data => {
                this.setState({
                    podcast: data.data
                });
            });
    }

    render() {
        let episodes;
        if (this.state.podcast.episodes) {
            episodes = this.state.podcast.episodes.map((episode, index) => {
                if (index <= 50) { // TODO: Lazy load list items on scroll instead of hard-coding a number...
                    return (
                        <EpisodeListItem
                            key={episode.date}
                            episode={episode}
                            enqueueEpisode={this.props.enqueueEpisode}
                        />
                    );
                } else {
                    return null;
                }
            });
        }

        // If the title was passed as a prop use that, else wait until componentDidMount() updates the state.
        let navBar;
        if (this.props.location.state && 'title' in this.props.location.state) {
            navBar = <NavBar title={this.props.location.state.title} />;
        } else {
            navBar = <NavBar title={this.state.podcast.title} />;
        }

        return (
            <React.Fragment>
                {navBar}
                <List>
                    {episodes}
                </List>
            </React.Fragment>
        );
    }
}

export default Podcast;