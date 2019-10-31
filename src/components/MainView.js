import React, { Component } from 'react';
import axios from 'axios';
import Welcome from './Welcome';
import { Grid } from '@material-ui/core';
import AddNew from './AddNew';

class MainView extends Component {
    constructor(props) {
        super(props);
        
        this.state = { 
            subscriptions: [],
            noSubscriptions: true
        };
    }

    componentWillMount() {
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
        if (this.state.noSubscriptions) {
            return (
                <Grid container justify="center">
                    <Grid item xs={12} sm={6} md={4} lg={3}>
                        <Welcome />
                    </Grid>
                </Grid>
            );
        }
        return (
            <React.Fragment>
                <AddNew />
            </React.Fragment>
        );
    }
}
 
export default MainView;