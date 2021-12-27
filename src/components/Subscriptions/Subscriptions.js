import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import AddIcon from '@material-ui/icons/AddBox';
import NavBar from '@/components/NavBar/NavBar';
import SubscriptionItem from '@/components/Subscriptions/SubscriptionItem';
import Welcome from '@/components/Subscriptions/Welcome';
import subscriptionsService from '@/services/subscriptionsService';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginLeft: theme.spacing(2),
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
        padding: theme.spacing(4, 2, 8),
    },
}));

function Subscriptions() {
    const classes = useStyles();

    const [subscriptions, setSubscriptions] = useState([]);
    const [noSubscriptions, setNoSubscriptions] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const data = await subscriptionsService.getSubscriptions();
                setSubscriptions(data);
                setNoSubscriptions(false);
            } catch {
                setNoSubscriptions(true);
            }
        })();
    }, []);

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
                {noSubscriptions ? (
                    <Box
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                    >
                        <Welcome className={classes.welcome} />
                    </Box>
                ) : (
                    <div className={classes.subscriptionsGrid}>
                        {subscriptions.map(({ _id, title, artwork }) => (
                            <SubscriptionItem
                                clickable
                                key={_id}
                                id={_id}
                                title={title}
                                artwork={artwork}
                            />
                        ))}
                    </div>
                )}
            </Container>
        </React.Fragment>
    );
}

export default Subscriptions;
