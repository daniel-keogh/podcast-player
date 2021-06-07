import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Snackbar from '@material-ui/core/Snackbar';
import EpisodeListItem from './EpisodeListItem';
import NavBar from '../NavBar/NavBar';
import PodcastInfo from './PodcastInfo';
import axios from '../../config/axios';

class Podcast extends Component {
    state = {
        podcast: {},
        numEpisodes: 50,
        snackbar: {
            open: false,
            message: '',
        },
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        let limit = Number(params.get('limit'));

        if (!limit || limit <= 0) {
            limit = this.state.numEpisodes;
        }

        axios
            .get(
                `/api/subscriptions/${this.props.match.params.id}?limit=${limit}`
            )
            .then((res) => {
                this.setState({
                    podcast: res.data,
                    numEpisodes: limit,
                });
            })
            .catch(this.onHttpError);
    }

    componentDidUpdate() {
        const params = new URLSearchParams(this.props.history.location.search);
        const limit = +params.get('limit');

        if (limit !== this.state.numEpisodes) {
            this.props.history.replace(
                `/podcast/${this.state.podcast._id}?limit=${this.state.numEpisodes}`
            );
        }
    }

    render() {
        const episodes = [];
        if (this.state.podcast.episodes) {
            for (let i = 0; i < this.state.podcast.episodes.length; i++) {
                if (i < this.state.numEpisodes) {
                    episodes.push(
                        <EpisodeListItem
                            key={i}
                            id={this.state.podcast._id}
                            podcastTitle={this.state.podcast.title}
                            artwork={this.state.podcast.artwork}
                            episode={this.state.podcast.episodes[i]}
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
                <NavBar title={navTitle} />

                <Container maxWidth="lg">
                    {/* Only display the PodcastInfo component if `this.state.podcast` is not an empty object. */}
                    {Object.entries(this.state.podcast).length ? (
                        <PodcastInfo
                            title={this.state.podcast.title}
                            author={this.state.podcast.author}
                            description={this.state.podcast.description}
                            artwork={this.state.podcast.artwork}
                            link={this.state.podcast.link}
                            subscriberCount={this.state.podcast.subscriberCount}
                            isSubscribed={this.state.podcast.isSubscribed}
                            onSubscribe={this.handleSubscribe}
                        />
                    ) : null}

                    <List>{episodes}</List>

                    {/* Only display the "Show More" button if there are episodes that aren't yet visible in the List. */}
                    {this.state.podcast.episodes &&
                    this.state.podcast.episodes.length >=
                        this.state.numEpisodes ? (
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
                </Container>

                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={this.state.snackbar.open}
                    message={this.state.snackbar.message}
                    onClose={this.handleSnackbarClose}
                    action={
                        <Button
                            color="secondary"
                            size="small"
                            onClick={this.handleSnackbarClose}
                        >
                            OK
                        </Button>
                    }
                />
            </React.Fragment>
        );
    }

    // Display another 100 episodes whenever the "Show More" button is clicked
    handleShowMoreClicked = () => {
        const params = new URLSearchParams(this.props.history.location.search);
        const limit = (+params.get('limit') || this.state.numEpisodes) + 100;

        axios
            .get(
                `/api/subscriptions/${this.props.match.params.id}?limit=${limit}`
            )
            .then((res) => {
                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        episodes: res.data.episodes,
                    },
                    numEpisodes: limit,
                }));
            })
            .catch(this.onHttpError);
    };

    handleSubscribe = () => {
        if (this.state.podcast.isSubscribed) {
            axios
                .delete(`/api/subscriptions/${this.state.podcast._id}`)
                .then(() => {
                    this.setState((state) => ({
                        podcast: {
                            ...state.podcast,
                            isSubscribed: false,
                            subscriberCount: state.podcast.subscriberCount - 1,
                        },
                    }));
                })
                .catch(this.onHttpError);
        } else {
            // Re-subscribe
            axios
                .post(`/api/subscriptions`, {
                    feedUrl: this.state.podcast.feedUrl,
                })
                .then((res) => {
                    this.setState((state) => ({
                        podcast: {
                            ...state.podcast,
                            ...res.data.result,
                            isSubscribed: true,
                        },
                    }));
                })
                .catch(this.onHttpError);
        }
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };

    onHttpError = (err) => {
        let message = err.response?.data?.msg;

        if (!message) {
            message = 'HTTP error occurred';
        }

        this.setState({
            snackbar: {
                open: true,
                message: `Error: ${message}.`,
            },
        });
    };
}

export default withRouter(Podcast);
