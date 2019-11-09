import React, { Component } from 'react';
import { IconButton, Avatar, ListItemAvatar, ListItem, ListItemSecondaryAction, ListItemText, Divider } from '@material-ui/core';
import { AddBox, RemoveCircle } from '@material-ui/icons';
import axios from 'axios';

class DiscoverListItem extends Component {

    state = {
        isSubscribed: false
    }

    componentDidMount() {

    }

    render() {
        return (
            <React.Fragment>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar src={this.props.artwork} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.name}
                        secondary={this.props.author}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            color="secondary"
                            onClick={this.handleSubscribeClicked}
                        >
                            {this.state.isSubscribed ? <RemoveCircle color="secondary" /> : <AddBox color="secondary" />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        );
    }

    handleSubscribeClicked = () => {
        if (this.state.isSubscribed) {
            axios.delete(`http://localhost:4000/api/subscriptions/${this.props.id}`)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        } else {
            axios.post(`http://localhost:4000/api/subscriptions`, {
                id: this.props.id,
                name: this.props.name,
                artist: this.props.author,
                genres: this.props.genres,
                artwork: this.props.artwork
            });
        }

        this.setState(state => ({
            isSubscribed: !state.isSubscribed,
        }));
    }
}

export default DiscoverListItem;
