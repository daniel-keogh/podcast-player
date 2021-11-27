import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import RssFeedIcon from '@material-ui/icons/RssFeed';

import DiscoverListItem from '@/components/Discover/DiscoverListItem';
import FeedFormDialog from '@/components/Discover/FeedFormDialog';
import NavBar from '@/components/NavBar/NavBar';
import NoResultsFound from '@/components/Discover/NoResultsFound';
import SearchForm from '@/components/Discover/SearchForm';
import Popular from '@/components/Discover/Popular';
import axios from '@/config/axios';

class Discover extends Component {
    state = {
        dialog: {
            open: false,
            error: false,
            errorMessage: '',
        },
        newFeed: '',
        noResultsFound: false,
        searchTerm: '',
        searchResults: [],
    };

    componentDidMount() {
        const params = new URLSearchParams(this.props.history.location.search);
        const term = params.get('term');

        if (term) {
            this.setState({ searchTerm: term }, this.search);
        }
    }

    componentDidUpdate(prevProps) {
        const params = new URLSearchParams(this.props.location.search);
        const term = params.get('term');

        const prevParams = new URLSearchParams(prevProps.location.search);
        const prevTerm = prevParams.get('term');

        if (term && term !== prevTerm) {
            this.setState({ searchTerm: term }, this.search);
        }
    }

    render() {
        return (
            <React.Fragment>
                <NavBar title="Discover">
                    <Tooltip title="Add an RSS Feed">
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={this.handleDialogOpen}
                        >
                            <RssFeedIcon />
                        </IconButton>
                    </Tooltip>
                </NavBar>

                <Container
                    component="main"
                    maxWidth="lg"
                    style={{ paddingBottom: '32px' }}
                >
                    <Container
                        component="section"
                        maxWidth="lg"
                        style={{ marginTop: '42px' }}
                    >
                        <Typography variant="h5" component="h5">
                            Search for Podcasts
                        </Typography>

                        <SearchForm
                            searchLabel="Search Podcasts..."
                            searchTerm={this.state.searchTerm}
                            onFormChange={this.handleFormChange}
                            onSubmit={this.handleSearch}
                        />

                        <Divider />

                        {/* Show the search results list, or the NoResultsFound component if there were no results. */}
                        {!this.state.noResultsFound ? (
                            <List>
                                {this.state.searchResults.map((item) => (
                                    <DiscoverListItem
                                        {...item}
                                        key={item.feedUrl}
                                    />
                                ))}
                            </List>
                        ) : (
                            <NoResultsFound />
                        )}
                    </Container>

                    <Container component="section" maxWidth="lg">
                        <Popular />
                    </Container>

                    <FeedFormDialog
                        {...this.state.dialog}
                        onDialogOpen={this.handleDialogOpen}
                        onDialogClose={this.handleDialogClose}
                        onFormChange={this.handleFormChange}
                        onSubscribe={this.handleSubscribeFromFeed}
                    />
                </Container>
            </React.Fragment>
        );
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    handleSearch = (e) => {
        // Search for the query entered into the search box.
        this.search();
        e.preventDefault();
    };

    // Post the RSS feed entered in the dialog box to the server.
    handleSubscribeFromFeed = () => {
        const showDialogError = (errorMessage) => {
            this.setState({
                dialog: {
                    open: true,
                    error: true,
                    errorMessage,
                },
            });
        };

        // Show an error if an invalid URL is given.
        if (!this.isURL(this.state.newFeed)) {
            showDialogError('Please enter a valid URL');
        } else {
            axios
                .post(`/api/subscriptions`, {
                    feedUrl: this.state.newFeed,
                })
                .then(this.handleDialogClose)
                .catch((err) => {
                    showDialogError(err.response?.data?.msg);
                });
        }
    };

    handleDialogOpen = () => {
        this.setState({
            dialog: {
                error: false,
                open: true,
                errorMessage: '',
            },
        });
    };

    handleDialogClose = () => {
        this.setState({
            dialog: {
                error: false,
                open: false,
                errorMessage: '',
            },
        });
    };

    search = () => {
        const term = this.state.searchTerm.trim();

        if (!term) {
            return;
        }

        axios
            .get(`/api/search/?term=${encodeURIComponent(term)}`)
            .then((data) => {
                if (!data.data.results.length) {
                    throw new Error('No search results found.');
                } else {
                    this.setState({
                        searchResults: data.data.results,
                        noResultsFound: false,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    noResultsFound: true,
                });
            })
            .finally(() => {
                if (window.location.hash !== '#/rate_limit') {
                    this.props.history.replace(
                        `/discover?term=${encodeURIComponent(term)}`
                    );
                }
            });
    };

    isURL(str) {
        try {
            new URL(str);
        } catch (_) {
            return false;
        }

        return true;
    }
}

export default withRouter(Discover);
