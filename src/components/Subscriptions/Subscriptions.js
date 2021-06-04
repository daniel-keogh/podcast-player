import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddBox';
import NavBar from '../NavBar/NavBar';
import SubscriptionItem from './SubscriptionItem';
import Welcome from './Welcome';
import axios from '../../config/axios';
import './Subscriptions.css';

const useStyles = (theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
});

class Subscriptions extends Component {
    state = {
        subscriptions: [],
        noSubscriptions: false,
    };

    componentDidMount() {
        axios
            .get(`/api/subscriptions`)
            .then((res) => {
                if (res.status !== 200 || res.data.subscriptions.length === 0) {
                    throw new Error('No subscriptions');
                } else {
                    this.setState({
                        subscriptions: res.data.subscriptions.sort(
                            this.compare
                        ),
                        noSubscriptions: false,
                    });
                }
            })
            .catch(() => {
                this.setState({
                    noSubscriptions: true,
                });
            });
    }

    render() {
        const { classes } = this.props;

        return (
            <React.Fragment>
                <NavBar title="Subscriptions" hideBackButton>
                    <Tooltip title="Add Podcasts">
                        <IconButton
                            edge="end"
                            color="inherit"
                            component={Link}
                            to="/discover"
                        >
                            <AddIcon />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Profile">
                        <IconButton
                            className={classes.menuButton}
                            edge="end"
                            color="inherit"
                            component={Link}
                            to="/profile"
                        >
                            <AccountCircleIcon />
                        </IconButton>
                    </Tooltip>
                </NavBar>
                {this.state.noSubscriptions ? (
                    <div className="subs-welcome-wrapper">
                        <Welcome className="subs-welcome" />
                    </div>
                ) : (
                    <div className="subs-grid">
                        {this.state.subscriptions.map((sub) => {
                            return (
                                <SubscriptionItem
                                    clickable
                                    key={sub._id}
                                    id={sub._id}
                                    title={sub.title}
                                    artwork={sub.artwork}
                                />
                            );
                        })}
                    </div>
                )}
            </React.Fragment>
        );
    }

    compare(a, b) {
        if (a.title < b.title) {
            return -1;
        } else if (a.title > b.title) {
            return 1;
        } else {
            return 0;
        }
    }
}

export default withStyles(useStyles)(Subscriptions);
