import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

// @ts-expect-error TS(2307): Cannot find module '@/components/NavBar/NavBar' or... Remove this comment to see the full error message
import NavBar from "@/components/NavBar/NavBar";
// @ts-expect-error TS(2307): Cannot find module '@/store/authContext' or its co... Remove this comment to see the full error message
import AuthContext from "@/store/authContext";
// @ts-expect-error TS(2307): Cannot find module '@/store/nowPlayingContext' or ... Remove this comment to see the full error message
import NowPlayingContext from "@/store/nowPlayingContext";
// @ts-expect-error TS(2307): Cannot find module '@/services/authService' or its... Remove this comment to see the full error message
import authService from "@/services/authService";
// @ts-expect-error TS(6142): Module './AccountCard' was resolved to '/mnt/s/Git... Remove this comment to see the full error message
import AccountCard from "./AccountCard";
// @ts-expect-error TS(6142): Module './ProfileCard' was resolved to '/mnt/s/Git... Remove this comment to see the full error message
import ProfileCard from "./ProfileCard";
// @ts-expect-error TS(2307): Cannot find module '@/utils/routes' or its corresp... Remove this comment to see the full error message
import Routes from "@/utils/routes";

const useStyles = makeStyles((theme) => ({
    sectionTitle: {
        marginBottom: (theme as any).spacing(2),
    },
}));

function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const nowPlayingContext = useContext(NowPlayingContext);

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileInfo, setProfileInfo] = useState({
    email: "",
    registeredSince: null,
  });

  useEffect(() => {
    if (!(authContext as any).userId)
        return;
    (async () => {
        const user = await authService.getProfile((authContext as any).userId);
        const { email, registeredSince } = user;
        setProfileInfo({ email, registeredSince });
        setProfileUpdated(false);
    })();
}, [(authContext as any).userId, profileUpdated]);

  const handleLogout = () => {
    (nowPlayingContext as any).stop();
    (authContext as any).logout();
    history.replace(Routes.auth);
  };

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <NavBar title="Profile" />
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Container maxWidth="md">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box my={5}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="h5" component="h5" className={classes.sectionTitle}>
            Profile
          </Typography>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ProfileCard
            email={profileInfo.email}
            // @ts-expect-error TS(2322): Type 'null' is not assignable to type 'string | un... Remove this comment to see the full error message
            registeredSince={profileInfo.registeredSince}
            onLogout={handleLogout}
          />
        </Box>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box my={5}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Typography variant="h5" component="h5" className={classes.sectionTitle}>
            Account
          </Typography>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AccountCard
            onProfileUpdated={() => setProfileUpdated(true)}
            onProfileDeleted={handleLogout}
          />
        </Box>
      </Container>
    </React.Fragment>
  );
}

export default Profile;
