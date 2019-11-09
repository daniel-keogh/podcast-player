import React, { Component } from 'react';
import { IconButton, Avatar, ListItemAvatar, ListItem, ListItemSecondaryAction, ListItemText, Divider } from '@material-ui/core';
import { AddBox, RemoveCircle } from '@material-ui/icons';

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
        this.setState(state => ({
            isSubscribed: !state.isSubscribed,
        }));
    }
}

export default DiscoverListItem;
