import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import Snackbar from '@material-ui/core/Snackbar';
import NavBar from '@/components/NavBar/NavBar';
import EpisodeListItem from '@/components/Podcast/EpisodeListItem';
import PodcastInfo from '@/components/Podcast/PodcastInfo';
import subscriptionsService from '@/services/subscriptionsService';

class Podcast extends Component {
    state = {
        podcast: {},
        numEpisodes: 50,
        isLoading: true,
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

        subscriptionsService
            .getSubscriptionById(this.props.match.params.id, limit)
            .then((podcast) => {
                this.setState({
                    podcast,
                    numEpisodes: limit,
                });
            })
            .catch(this.onHttpError)
            .finally(() => {
                this.setState({
                    isLoading: false,
                });
            });
    }

    componentDidUpdate(prevProps) {
        const params = new URLSearchParams(this.props.location.search);
        const limit = +params.get('limit');

        const prevParams = new URLSearchParams(prevProps.location.search);
        const prevLimit = +prevParams.get('limit');

        if (limit && limit !== prevLimit) {
            this.setState({ numEpisodes: limit }, () => this.fetchMore(limit));
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
        const navTitle =
            this.props.location.state?.title || this.state.podcast.title;

        return (
            <React.Fragment>
                <NavBar title={navTitle} isLoading={this.state.isLoading} />

                <Container maxWidth="lg">
                    {/* Only display the PodcastInfo component if `this.state.podcast` is not an empty object. */}
                    {Object.entries(this.state.podcast).length ? (
                        <PodcastInfo
                            {...this.state.podcast}
                            onSubscribe={this.handleSubscribe}
                        />
                    ) : null}

                    <List>{episodes}</List>

                    {/* Only display the "Show More" button if there are episodes that aren't yet visible in the List. */}
                    {this.state.podcast.episodes?.length >=
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
        this.fetchMore(limit);
    };

    handleSubscribe = () => {
        if (this.state.podcast.isSubscribed) {
            subscriptionsService
                .removeSubscription(this.state.podcast._id)
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
            subscriptionsService
                .addSubscription(this.state.podcast.feedUrl)
                .then((result) => {
                    this.setState((state) => ({
                        podcast: {
                            ...state.podcast,
                            ...result,
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

    fetchMore = (limit) => {
        subscriptionsService
            .getSubscriptionById(this.props.match.params.id, limit)
            .then((episodes) => {
                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        episodes,
                    },
                    numEpisodes: limit,
                }));
            })
            .catch(this.onHttpError)
            .finally(() => {
                if (window.location.hash !== '#/rate_limit') {
                    this.props.history.replace(
                        `/podcast/${this.state.podcast._id}?limit=${limit}`
                    );
                }
            });
    };

    onHttpError = (message) => {
        this.setState({
            snackbar: {
                open: true,
                message: `Error: ${message}.`,
            },
        });
    };
}

export default withRouter(Podcast);
