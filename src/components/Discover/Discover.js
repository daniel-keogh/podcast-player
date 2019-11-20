import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import DiscoverListItem from './DiscoverListItem';
import FeedFormDialog from './FeedFormDialog';
import NavBar from '../NavBar/NavBar';
import axios from 'axios';

class Discover extends Component {
    state = {
        dialog: {
            open: false,
            error: false
        },
        searchTerm: '',
        searchResults: [],
        newFeed: ''
    }

    render() {
        const items = this.state.searchResults.map((item, index) => {
            return (
                <DiscoverListItem
                    key={index}
                    title={item.title}
                    author={item.author}
                    artwork={item.artwork}
                    feedUrl={item.feedUrl}
                />
            );
        });

        return (
            <React.Fragment>
                <NavBar title="Discover" history={this.props.history}>
                    <IconButton edge="end" color="inherit" onClick={this.handleDialogOpen}>
                        <RssFeedIcon />
                    </IconButton>
                </NavBar>

                <form
                    onSubmit={this.handleSearch}
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%"
                    }}
                >
                    <div style={{
                        padding: "20px",
                        width: "100%"
                    }}>
                        <TextField
                            autoFocus
                            fullWidth
                            id="searchTerm"
                            label="Search Podcasts..."
                            margin="normal"
                            variant="filled"
                            type="text"
                            value={this.state.searchTerm}
                            onChange={this.handleFormChange}
                        />
                    </div>
                </form>

                <List>
                    {items}
                </List>

                <FeedFormDialog
                    open={this.state.dialog.open}
                    error={this.state.dialog.error}
                    onDialogOpen={this.handleDialogOpen}
                    onDialogClose={this.handleDialogClose}
                    onFormChange={this.handleFormChange}
                    onSubscribe={this.handleSubscribeFromFeed} />
            </React.Fragment>
        );
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSearch = (e) => {
        axios.get(`http://localhost:4000/api/search/?term=${encodeURIComponent(this.state.searchTerm)}`)
            .then(data => {
                this.setState({
                    searchResults: data.data.results
                });
            });

        e.preventDefault();
    }

    handleDialogOpen = () => {
        this.setState({
            dialog: {
                error: false,
                open: true
            }
        });
    }

    handleDialogClose = () => {
        this.setState({
            dialog: {
                error: false,
                open: false
            }
        });
    }

    handleSubscribeFromFeed = () => {
        const showDialogError = () => {
            this.setState({
                dialog: {
                    open: true,
                    error: true
                }
            });
        };

        if (this.state.newFeed === '') {
            showDialogError();
        } else {
            axios.post(`http://localhost:4000/api/subscriptions`, {
                feedUrl: this.state.newFeed
            }).then(() => {
                this.handleDialogClose();
            }).catch(() => {
                showDialogError()
            });
        }
    }
}

export default Discover;