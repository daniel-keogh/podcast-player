import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';
import EpisodeListItem from './EpisodeListItem/EpisodeListItem';
import { List } from '@material-ui/core';

class Podcast extends Component {
    constructor(props) {
        super(props);

        this.state = {
            podcast: {}
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/podcast/${this.props.match.params.id}`)
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
                if (index <= 100) {
                    return (
                        <EpisodeListItem
                            key={episode.date}
                            episode={episode}
                        />
                    );
                } else {
                    return null;
                }
            });
        }

        return (
            <React.Fragment>
                <NavBar title={this.state.podcast.title} />
                <List>
                    {episodes}
                </List>
            </React.Fragment>
        );
    }
}

export default Podcast;