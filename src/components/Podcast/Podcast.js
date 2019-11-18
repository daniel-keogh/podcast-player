import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import EpisodeListItem from './EpisodeListItem';
import NavBar from '../NavBar/NavBar';
import PodcastInfo from './PodcastInfo';
import axios from 'axios';

class Podcast extends Component {
    state = {
        podcast: {},
        numEpisodes: 50,
        isSubscribed: true
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/subscriptions/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    podcast: res.data
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
                            podcastTitle={this.state.podcast.name}
                            playEpisode={this.props.playEpisode}
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
                {/* Only display the PodcastInfo component if `this.state.podcast` is not an empty object. */}
                {Object.entries(this.state.podcast).length
                    ? (
                        <PodcastInfo
                            name={this.state.podcast.name}
                            artist={this.state.podcast.artist}
                            description={this.state.podcast.description}
                            genres={this.state.podcast.genres}
                            artwork={this.state.podcast.artwork}
                            link={this.state.podcast.link}
                            isFavourite={this.state.podcast.isFavourite}
                            isSubscribed={this.state.isSubscribed}
                            onFavourite={this.handleFavourite}
                            onSubscribe={this.handleSubscribe}
                        />
                    ) : null
                }
                <List style={{ margin: "auto" }}>
                    {episodes}
                </List>
                {/* Only display the "Load More" button if there are episodes that aren't yet visible. */}
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
        if (this.state.isSubscribed) {
            axios.delete(`http://localhost:4000/api/subscriptions/${this.state.podcast.id}`)
                .then(() => {
                    // Unfavourite the podcast after unsubscribing
                    if (this.state.podcast.isFavourite) {
                        this.setState(state => ({
                            podcast: {
                                ...state.podcast,
                                isFavourite: false
                            }
                        }));
                    }
                });
        } else {
            // Re-subscribe
            axios.post(`http://localhost:4000/api/subscriptions`, {
                ...this.state.podcast
            });
        }

        this.setState(state => ({
            isSubscribed: !state.isSubscribed
        }))
    }

    handleFavourite = () => {
        axios.put(`http://localhost:4000/api/subscriptions/${this.state.podcast.id}`, {
            ...this.state.podcast,
            isFavourite: !this.state.podcast.isFavourite
        }).then(() => {
            this.setState(state => ({
                podcast: {
                    ...state.podcast,
                    isFavourite: !state.podcast.isFavourite
                }
            }));
        });
    }
}

export default Podcast;