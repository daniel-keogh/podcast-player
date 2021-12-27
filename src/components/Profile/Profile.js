import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import NavBar from '@/components/NavBar/NavBar';
import AuthContext from '@/store/authContext';
import NowPlayingContext from '@/store/nowPlayingContext';
import authService from '@/services/authService';
import DangerCard from './DangerCard';
import ProfileCard from './ProfileCard';

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        marginBottom: theme.spacing(2),
    },
}));

function Profile() {
    const classes = useStyles();
    const history = useHistory();
    const authContext = useContext(AuthContext);
    const nowPlayingContext = useContext(NowPlayingContext);

    const [profileUpdated, setProfileUpdated] = useState(false);
    const [profileInfo, setProfileInfo] = useState({
        email: '',
        registeredSince: null,
    });

    useEffect(() => {
        if (!authContext.userId) return;

        authService.getProfile(authContext.userId).then((user) => {
            const { email, registeredSince } = user;

            setProfileInfo({
                email,
                registeredSince,
            });

            setProfileUpdated(false);
        });
    }, [authContext.userId, profileUpdated]);

    const handleLogout = () => {
        nowPlayingContext.stop();
        authContext.logout();
        history.replace('/auth');
    };

    return (
        <React.Fragment>
            <NavBar title="Profile" />
            <Container maxWidth="md">
                <Box my={5}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.sectionTitle}
                    >
                        Profile
                    </Typography>
                    <ProfileCard
                        email={profileInfo.email}
                        registeredSince={profileInfo.registeredSince}
                        onLogout={handleLogout}
                    />
                </Box>
                <Box my={5}>
                    <Typography
                        variant="h5"
                        component="h5"
                        className={classes.sectionTitle}
                    >
                        Security
                    </Typography>
                    <DangerCard
                        onProfileUpdated={() => setProfileUpdated(true)}
                        onProfileDeleted={handleLogout}
                    />
                </Box>
            </Container>
        </React.Fragment>
    );
}

export default Profile;
