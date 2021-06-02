import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import EpisodeListItem from './EpisodeListItem';
import NavBar from '../NavBar/NavBar';
import PodcastInfo from './PodcastInfo';
import AuthContext from '../../store/authContext';
import axios from 'axios';

class Podcast extends Component {
    static contextType = AuthContext;

    state = {
        podcast: {},
        numEpisodes: 50,
        isSubscribed: true,
    };

    componentDidMount() {
        axios
            .get(
                `/api/subscriptions/${this.props.match.params.id}?limit=${this.state.numEpisodes}`,
                {
                    headers: { Authorization: `Bearer ${this.context.token}` },
                }
            )
            .then((res) => {
                this.setState({
                    podcast: res.data,
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
                        />
                    );
                } else {
                    break;
                }
            }
        }

        // If the title was passed as a prop use that, otherwise wait until `componentDidMount()` updates the state.
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
                {Object.entries(this.state.podcast).length ? (
                    <PodcastInfo
                        title={this.state.podcast.title}
                        author={this.state.podcast.author}
                        description={this.state.podcast.description}
                        artwork={this.state.podcast.artwork}
                        link={this.state.podcast.link}
                        favourite={this.state.podcast.favourite}
                        isSubscribed={this.state.isSubscribed}
                        onFavourite={this.handleFavourite}
                        onSubscribe={this.handleSubscribe}
                    />
                ) : null}

                <List>{episodes}</List>

                {/* Only display the "Show More" button if there are episodes that aren't yet visible in the List. */}
                {this.state.podcast.episodes &&
                this.state.podcast.episodes.length >= this.state.numEpisodes ? (
                    <Button
                        style={{
                            display: 'block',
                            margin: '32px auto',
                        }}
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={this.handleShowMoreClicked}
                    >
                        Show More
                    </Button>
                ) : null}
            </React.Fragment>
        );
    }

    // Display another 100 episodes whenever the "Show More" button is clicked
    handleShowMoreClicked = () => {
        const increase = 100;

        axios
            .get(
                `/api/subscriptions/${this.props.match.params.id}?limit=${
                    this.state.numEpisodes + increase
                }`,
                {
                    headers: { Authorization: `Bearer ${this.context.token}` },
                }
            )
            .then((res) => {
                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        episodes: res.data.episodes,
                    },
                    numEpisodes: state.numEpisodes + increase,
                }));
            });
    };

    handleSubscribe = () => {
        if (this.state.isSubscribed) {
            axios
                .delete(`/api/subscriptions/${this.state.podcast._id}`, {
                    headers: { Authorization: `Bearer ${this.context.token}` },
                })
                .then(() => {
                    // Unfavourite the podcast after unsubscribing
                    if (this.state.podcast.favourite) {
                        this.setState((state) => ({
                            podcast: {
                                ...state.podcast,
                                favourite: false,
                            },
                        }));
                    }

                    this.setState({
                        isSubscribed: false,
                    });
                });
        } else {
            // Re-subscribe
            axios
                .post(
                    `/api/subscriptions`,
                    {
                        feedUrl: this.state.podcast.feedUrl,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${this.context.token}`,
                        },
                    }
                )
                .then((res) => {
                    this.setState((state) => ({
                        podcast: {
                            ...state.podcast,
                            ...res.data,
                        },
                        isSubscribed: true,
                    }));
                });
        }
    };

    handleFavourite = () => {
        // Take out everything except the episodes, since they shouldn't be sent in the body.
        const { episodes, ...podcast } = this.state.podcast;

        axios
            .put(
                `/api/subscriptions/${this.state.podcast._id}`,
                {
                    ...podcast,
                    favourite: !this.state.podcast.favourite,
                },
                {
                    headers: { Authorization: `Bearer ${this.context.token}` },
                }
            )
            .then(() => {
                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        favourite: !state.podcast.favourite,
                    },
                }));
            });
    };
}

export default Podcast;
