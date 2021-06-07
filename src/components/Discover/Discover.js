import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import Tooltip from '@material-ui/core/Tooltip';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import DiscoverListItem from './DiscoverListItem';
import FeedFormDialog from './FeedFormDialog';
import NavBar from '../NavBar/NavBar';
import NoResultsFound from './NoResultsFound';
import SearchForm from './SearchForm';
import axios from '../../config/axios';

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

    render() {
        const items = this.state.searchResults.map((item) => {
            return (
                <DiscoverListItem
                    key={item.feedUrl}
                    title={item.title}
                    author={item.author}
                    artwork={item.artwork}
                    feedUrl={item.feedUrl}
                />
            );
        });

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

                <Container component="main" maxWidth="lg">
                    <SearchForm
                        searchLabel="Search Podcasts..."
                        searchTerm={this.state.searchTerm}
                        onFormChange={this.handleFormChange}
                        onSubmit={this.handleSearch}
                    />
                    <Divider />

                    {/* Show the search results list, or the <NoResultsFound/> component if there were no results. */}
                    {!this.state.noResultsFound ? (
                        <List>{items}</List>
                    ) : (
                        <NoResultsFound />
                    )}

                    <FeedFormDialog
                        open={this.state.dialog.open}
                        error={this.state.dialog.error}
                        errorMessage={this.state.dialog.errorMessage}
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
        // Don't search for anything if the searchbox is empty.
        if (this.state.searchTerm) {
            // Search for the query entered into the search box.
            axios
                .get(
                    `/api/search/?term=${encodeURIComponent(
                        this.state.searchTerm
                    )}`
                )
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
                });
        }
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
                .then(() => {
                    this.handleDialogClose();
                })
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

    isURL(str) {
        try {
            new URL(str);
        } catch (_) {
            return false;
        }

        return true;
    }
}

export default Discover;
