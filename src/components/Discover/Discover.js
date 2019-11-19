import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import NavBar from '../NavBar/NavBar';
import FeedFormDialog from './FeedFormDialog';
import DiscoverListItem from './DiscoverListItem';
import axios from 'axios';

class Discover extends Component {
    state = {
        top: [],
        dialog: {
            open: false,
            error: false
        },
        newFeed: ''
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/top`)
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        top: res.data.top
                    });
                }
            });
    }

    render() {
        let items;
        if (this.state.top && this.state.top.length > 0) {
            items = this.state.top.map(item => {
                return (
                    <DiscoverListItem
                        key={item.id}
                        id={item.id}
                        artwork={item.artwork}
                        name={item.name}
                        artist={item.artist}
                        subscriptions={this.props.location.state ? this.props.location.state.subscriptions : []}
                    />
                );
            });
        }

        return (
            <React.Fragment>
                <NavBar title="Discover" history={this.props.history}>
                    <IconButton edge="end" color="inherit" onClick={this.handleDialogOpen}>
                        <RssFeedIcon />
                    </IconButton>
                </NavBar>
                <List style={{ margin: "auto" }}>
                    {items}
                </List>
                <FeedFormDialog
                    open={this.state.dialog.open}
                    error={this.state.dialog.error}
                    onDialogOpen={this.handleDialogOpen}
                    onDialogClose={this.handleDialogClose}
                    onFormChange={this.handleFormChange}
                    onSubscribe={this.handleSubscribe} />
            </React.Fragment>
        );
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

    handleFormChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubscribe = () => {
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