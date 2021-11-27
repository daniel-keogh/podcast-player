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
import TopicsGrid from '@/components/Discover/TopicsGrid';

import discoverService from '@/services/discoverService';

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

    constructor(props) {
        super(props);
        this.topRef = React.createRef();
    }

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
                <div id="top" ref={this.topRef}></div>

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

                        <TopicsGrid onTopicClicked={this.handleSearch} />
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

    handleSearch = async (e, value) => {
        e.preventDefault();

        // Search for the query entered into the search box.
        if (value) {
            this.state.searchTerm = value;
        }

        await this.search();

        this.topRef.current.scrollIntoView();
    };

    // Post the RSS feed entered in the dialog box to the server.
    handleSubscribeFromFeed = async () => {
        try {
            await discoverService.subscribeFromFeed(this.state.newFeed);
            this.handleDialogClose();
        } catch (err) {
            this.setState({
                dialog: {
                    open: true,
                    error: true,
                    errorMessage: err,
                },
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

    search = async () => {
        if (!this.state.searchTerm) return;

        try {
            const results = await discoverService.search(this.state.searchTerm);

            this.setState({
                searchResults: results,
                noResultsFound: false,
            });
        } catch (err) {
            this.setState({
                noResultsFound: true,
            });
        } finally {
            if (window.location.hash !== '#/rate_limit') {
                this.props.history.replace(
                    `/discover?term=${encodeURIComponent(
                        this.state.searchTerm
                    )}`
                );
            }
        }
    };
}

export default withRouter(Discover);
