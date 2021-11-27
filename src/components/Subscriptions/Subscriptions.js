import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddBox';
import NavBar from '@/components/NavBar/NavBar';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';
import Welcome from '@/components/Subscriptions/Welcome';
import axios from '@/config/axios';

const useStyles = (theme) => ({
    menuButton: {
        marginLeft: theme.spacing(2),
    },
    welcomeWrapper: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcome: {
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        textAlign: 'center',
    },
    subscriptionsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, 150px)',
        gap: '1em',
        justifyContent: 'center',
        padding: '28px 14px',
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
                        subscriptions: res.data.subscriptions.sort(this.compare),
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

                <Container maxWidth="lg">
                    {this.state.noSubscriptions ? (
                        <div className={classes.welcomeWrapper}>
                            <Welcome className={classes.welcome} />
                        </div>
                    ) : (
                        <div className={classes.subscriptionsGrid}>
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
                </Container>
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
