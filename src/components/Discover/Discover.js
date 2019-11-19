import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import TextField from '@material-ui/core/TextField';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import NavBar from '../NavBar/NavBar';
import FeedFormDialog from './FeedFormDialog';
import DiscoverListItem from './DiscoverListItem';
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
                    name={item.name}
                    artist={item.artist}
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
                        margin: "auto",
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
                            label="Search..."
                            margin="normal"
                            variant="filled"
                            type="text"
                            value={this.state.searchTerm}
                            onChange={this.handleFormChange}
                        />
                    </div>
                </form>

                <List style={{ margin: "auto" }}>
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
        if (this.state.newFeed === '') {
            this.setState({
                dialog: {
                    open: true,
                    error: true
                }
            });
        } else {
            axios.post(`http://localhost:4000/api/subscriptions`, {
                feedUrl: this.state.newFeed
            }).then(() => {
                this.handleDialogClose();
            }).catch(() => {
                this.setState({
                    dialog: {
                        error: true,
                        open: true
                    }
                });
            });
        }
    }
}

export default Discover;