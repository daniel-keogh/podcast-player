import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Snackbar from '@material-ui/core/Snackbar';
import NavBar from '@/components/NavBar/NavBar';
import EpisodeList from './EpisodeList';
import EpisodeListItem from './EpisodeListItem';
import PodcastInfo from './PodcastInfo';

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
            .catch(this.handleSnackbarOpen)
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
        // If the title was passed as a prop use that, otherwise wait until `componentDidMount()` updates the state.
        const navTitle = this.props.location.state?.title || this.state.podcast.title;

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

                    <EpisodeList
                        numEpisodes={this.state.numEpisodes}
                        onShowMore={this.handleShowMoreClicked}
                    >
                        {this.state.podcast?.episodes?.map((episode, i) => (
                            <EpisodeListItem
                                key={i}
                                episode={episode}
                                id={this.state.podcast._id}
                                podcastTitle={this.state.podcast.title}
                                artwork={this.state.podcast.artwork}
                            />
                        ))}
                    </EpisodeList>
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

    fetchMore = async (limit) => {
        try {
            const { episodes } = await subscriptionsService.getSubscriptionById(
                this.props.match.params.id,
                limit
            );

            this.setState((state) => ({
                podcast: {
                    ...state.podcast,
                    episodes,
                },
                numEpisodes: limit,
            }));
        } catch (err) {
            this.handleSnackbarOpen(err);
        } finally {
            if (window.location.hash !== '#/rate_limit') {
                this.props.history.replace(
                    `/podcast/${this.state.podcast._id}?limit=${limit}`
                );
            }
        }
    };

    // Display another 100 episodes whenever the "Show More" button is clicked
    handleShowMoreClicked = () => {
        const params = new URLSearchParams(this.props.history.location.search);
        const limit = (+params.get('limit') || this.state.numEpisodes) + 100;
        this.fetchMore(limit);
    };

    handleSubscribe = async () => {
        try {
            if (this.state.podcast.isSubscribed) {
                await subscriptionsService.removeSubscription(
                    this.state.podcast._id
                );

                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        isSubscribed: false,
                        subscriberCount: state.podcast.subscriberCount - 1,
                    },
                }));
            } else {
                // Re-subscribe
                const result = await subscriptionsService.addSubscription(
                    this.state.podcast.feedUrl
                );

                this.setState((state) => ({
                    podcast: {
                        ...state.podcast,
                        ...result,
                        isSubscribed: true,
                    },
                }));
            }
        } catch (err) {
            this.handleSnackbarOpen(err);
        }
    };

    handleSnackbarOpen = (message) => {
        this.setState({
            snackbar: {
                open: true,
                message: `Error: ${message}.`,
            },
        });
    };

    handleSnackbarClose = () => {
        this.setState({
            snackbar: {
                open: false,
                message: '',
            },
        });
    };
}

export default withRouter(Podcast);
