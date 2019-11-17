import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import DiscoverListItem from './DiscoverListItem';
import { List } from '@material-ui/core';

class Discover extends Component {
    state = {
        top: '',
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/top`)
            .then(data => {
                if (data.status === 200) {
                    this.setState({
                        top: data.data
                    });
                }
            });
    }

    render() {
        let items;
        if (this.state.top) {
            items = this.state.top.map(item => {
                return (
                    <DiscoverListItem
                        key={item.id}
                        id={item.id}
                        artwork={item.artworkUrl100}
                        name={item.name}
                        artist={item.artistName}
                        genres={item.genres.map(g => g.name)}
                        subscriptions={this.props.location.state ? this.props.location.state.subscriptions : []}
                    />
                );
            });
        }

        return (
            <React.Fragment>
                <NavBar title="Discover" history={this.props.history} />
                <List style={{ margin: "auto" }}>
                    {items}
                </List>
            </React.Fragment>
        );
    }
}

export default Discover;