import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import RemoveCircleOutlineIcon from '@material-ui/icons/RemoveCircleOutline';
import axios from 'axios';

class DiscoverListItem extends Component {
    state = {
        isSubscribed: false
    }

    render() {
        return (
            <React.Fragment>
                <ListItem divider>
                    <ListItemAvatar>
                        <Avatar src={this.props.artwork} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={this.props.title}
                        secondary={this.props.author}
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
            </React.Fragment>
        );
    }

    handleSubscribe = () => {
        if (!this.state.isSubscribed) {
            axios.post(`http://localhost:4000/api/subscriptions`, {
                feedUrl: this.props.feedUrl
            }).then(() => {
                this.setState({
                    isSubscribed: true
                });
            });
        }
    }
}

export default DiscoverListItem;
