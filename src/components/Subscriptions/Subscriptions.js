import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import NavBar from '../NavBar/NavBar';
import SubscriptionItem from './SubscriptionItem';
import Welcome from './Welcome';
import axios from 'axios';
import './Subscriptions.css';

class Subscriptions extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subscriptions: [],
            noSubscriptions: false
        };
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/api/subscriptions`)
            .then(res => {
                if (res.status !== 200 || res.data.subscriptions.length === 0) {
                    throw new Error();
                } else {
                    this.setState({
                        subscriptions: res.data.subscriptions,
                        noSubscriptions: false
                    });
                }
            })
            .catch(() => {
                this.setState({
                    noSubscriptions: true
                });
            });
    }

    render() {
        if (this.state.noSubscriptions) {
            return (
                <React.Fragment>
                    <NavBar title="Subscriptions" />
                    <div style={{
                        display: "flex",
                        height: "100%",
                        justifyContent: "center",
                        alignItems: "center",
                        margin: "auto"
                    }}>
                        <Welcome style={{ height: "100%" }} />
                    </div>
                </React.Fragment>
            );
        }

        return (
            <React.Fragment>
                <NavBar title="Subscriptions" />
                <div className="subs-grid-wrapper">
                    <div className="subs-grid">
                        {this.state.subscriptions.map(sub => {
                            return (
                                <SubscriptionItem
                                    clickable
                                    key={sub._id}
                                    id={sub._id}
                                    name={sub.name}
                                    artwork={sub.artwork}
                                />
                            );
                        })}
                    </div>
                </div>
                <Fab
                    component={Link}
                    to="/discover"
                    color="secondary"
                    style={{
                        position: "sticky",
                        float: "right",
                        bottom: "32px",
                        right: "32px",
                    }}
                >
                    <AddIcon />
                </Fab>
            </React.Fragment>
        );
    }
}

export default Subscriptions;