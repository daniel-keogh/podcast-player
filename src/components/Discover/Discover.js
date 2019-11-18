import React, { Component } from 'react';
import List from '@material-ui/core/List';
import NavBar from '../NavBar/NavBar';
import DiscoverListItem from './DiscoverListItem';
import axios from 'axios';

class Discover extends Component {
    state = {
        top: [],
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
                        genres={item.genres}
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