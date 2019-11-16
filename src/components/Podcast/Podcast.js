import React, { Component } from 'react';
import { Button, List } from '@material-ui/core';
import EpisodeListItem from './EpisodeListItem/EpisodeListItem';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

class Podcast extends Component {
    state = {
        podcast: {},
        numEpisodes: 25
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/subscriptions/${this.props.match.params.id}`)
            .then(data => {
                this.setState({
                    podcast: data.data
                });
            })
            .catch(e => {
                console.log(e)
            });
    }

    render() {
        const episodes = [];
        if (this.state.podcast.episodes) {
            for (let i = 0; i < this.state.podcast.episodes.length; i++) {
                if (i < this.state.numEpisodes) {
                    episodes.push(
                        <EpisodeListItem
                            key={i}
                            episode={this.state.podcast.episodes[i]}
                            podcastTitle={this.state.podcast.title}
                            enqueueEpisode={this.props.enqueueEpisode}
                        />
                    );
                } else {
                    break;
                }
            }
        }

        // If the title was passed as a prop use that, else wait until componentDidMount() updates the state.
        let navTitle;
        if (this.props.location.state && 'title' in this.props.location.state) {
            navTitle = this.props.location.state.title;
        } else {
            navTitle = this.state.podcast.title;
        }

        return (
            <React.Fragment>
                <NavBar title={navTitle} />
                <List>
                    {episodes}
                </List>
                {this.state.podcast.episodes && this.state.podcast.episodes.length >= this.state.numEpisodes
                    ? (
                        <Button
                            style={{
                                display: "block",
                                margin: "32px auto 32px auto"
                            }}
                            variant="outlined"
                            color="primary"
                            size="large"
                            onClick={this.handleLoadMoreClicked}
                        >Load More</Button>
                    ) : null
                }
            </React.Fragment>
        );
    }

    // Display another another 25 episodes when the button is clicked
    handleLoadMoreClicked = () => {
        this.setState(state => ({
            numEpisodes: state.numEpisodes + 25
        }));
    }
}

export default Podcast;