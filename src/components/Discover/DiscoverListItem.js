import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios';

class DiscoverListItem extends Component {
    constructor(props) {
        super(props);

        // If find() returns true, then the user is already subscribed to this podcast.
        const idExists = this.props.subscriptions.find(id => +props.id === id);

        this.state = {
            isSubscribed: idExists ? true : false
        }
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
                        secondary={this.props.artist}
                    />
                    <ListItemSecondaryAction>
                        <IconButton
                            edge="end"
                            color="secondary"
                            onClick={this.handleSubscribe}
                        >
                            {this.state.isSubscribed ? <RemoveCircleOutlineIcon color="secondary" /> : <AddCircleOutlineIcon color="primary" />}
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                <Divider variant="inset" component="li" />
            </React.Fragment>
        );
    }

    handleSubscribe = () => {
        if (this.state.isSubscribed) {
            axios.delete(`http://localhost:4000/api/subscriptions/${this.props.id}`);
        } else {
            axios.post(`http://localhost:4000/api/subscriptions`, {
                id: this.props.id,
                name: this.props.name,
                artist: this.props.artist,
                artwork: this.props.artwork
            });
        }

        this.setState(state => ({
            isSubscribed: !state.isSubscribed
        }))
    }
}

export default DiscoverListItem;
