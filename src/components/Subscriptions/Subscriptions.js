import React, { Component } from 'react';
import axios from 'axios';
import Welcome from './Welcome/Welcome';
import AddNew from './AddNew/AddNew';
import { Grid } from '@material-ui/core';
import SubscriptionCard from './SubscriptionsCard/SubscriptionCard';
import NavBar from '../NavBar/NavBar';

class Subscriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscriptions: [],
            noSubscriptions: true
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/subscriptions`)
            .then(res => {
                if (res.status !== 200 || !res.data) {
                    throw new Error('HTTP Error');
                } else {
                    this.setState({
                        subscriptions: res.data.subscriptions.podcasts,
                        noSubscriptions: false
                    });
                }
            })
            .catch(e => {
                this.setState({
                    noSubscriptions: true
                });
            });
    }

    render() {
        const header = <NavBar title="Subscriptions" />;

        if (this.state.noSubscriptions) {
            return (
                <React.Fragment>
                    {header}
                    <Grid container justify="center" style={{ height: "100%", alignItems: "center" }}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Welcome handleAddNewClicked={this.handleAddNewClicked} style={{ height: "100%" }} />
                        </Grid>
                    </Grid>
                </React.Fragment>
            );
        }

        const subs = this.state.subscriptions.map(sub => {
            return (
                <SubscriptionCard
                    podName={sub.name}
                    podAuthor={sub.artist}
                    artwork={sub.artwork}
                />
            );
        });

        return (
            <React.Fragment>
                {header}
                {subs}
                <AddNew handleAddNewClicked={this.handleAddNewClicked} />
            </React.Fragment>
        );
    }

    handleAddNewClicked = () => {
        this.props.history.push('/discover');
    }
}

export default Subscriptions;