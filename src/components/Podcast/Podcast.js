import React, { Component } from 'react';
import { Button, List } from '@material-ui/core';
import EpisodeListItem from './EpisodeListItem';
import NavBar from '../NavBar/NavBar';
import PodcastInfo from './PodcastInfo';
import axios from 'axios';

class Podcast extends Component {
    state = {
        podcast: {},
        numEpisodes: 50
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

        // If the title was passed as a prop use that, otherwise wait until componentDidMount() updates the state.
        let navTitle;
        if (this.props.location.state && 'title' in this.props.location.state) {
            navTitle = this.props.location.state.title;
        } else {
            navTitle = this.state.podcast.title;
        }

        return (
            <React.Fragment>
                <NavBar title={navTitle} history={this.props.history} />
                {/* If `this.state.podcast` is not an empty object, display the PodcastInfo component */}
                {Object.entries(this.state.podcast).length
                    ? (
                        <PodcastInfo
                            title={this.state.podcast.title}
                            author={this.state.podcast.author}
                            description={this.state.podcast.description}
                            genres={this.state.podcast.genres}
                            image={this.state.podcast.image.url}
                            link={this.state.podcast.link}
                            onFavourite={this.handleFavourite}
                            onSubscribe={this.handleSubscribe}
                        />
                    ) : null
                }
                <List style={{ margin: "auto" }}>
                    {episodes}
                </List>
                {/* Only display the Load More button if there are episodes that aren't yet visible */}
                {this.state.podcast.episodes && this.state.podcast.episodes.length >= this.state.numEpisodes
                    ? (
                        <Button
                            style={{
                                display: "block",
                                margin: "32px auto"
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

    // Display another 50 episodes whenever the button is clicked
    handleLoadMoreClicked = () => {
        this.setState(state => ({
            numEpisodes: state.numEpisodes + 50
        }));
    }

    handleSubscribe = () => {
        // TODO:
    }

    handleFavourite = () => {
        // TODO:
    }
}

export default Podcast;