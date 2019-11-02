import React, { Component } from 'react';
import axios from 'axios';
import NavBar from '../NavBar/NavBar';
import SubscriptionCard from '../Subscriptions/SubscriptionsCard/SubscriptionCard';

class Discover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            top: ''
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/top`).then(data => {
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
                    <li key={item.id}>
                        <SubscriptionCard
                            artwork={item.artworkUrl100}
                            podName={item.name}
                            podAuthor={item.artistName}
                        />
                    </li>
                );
            });
        }

        return (
            <React.Fragment>
                <NavBar title="Discover" />
                <div>
                    <ul>
                        {items}
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Discover;