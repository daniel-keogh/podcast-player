import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { Theme } from "@mui/material/styles";

import NavBar from "@/components/NavBar/NavBar";
import AuthContext from "@/context/authContext";
import NowPlayingContext from "@/context/nowPlayingContext";
import authService from "@/services/authService";
import AccountCard from "./AccountCard";
import ProfileCard from "./ProfileCard";
import Routes from "@/utils/routes";
import type { Profile as _Profile } from "@/types/api/profile";

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    marginBottom: theme.spacing(2),
  },
}));

type ProfileInfo = Pick<_Profile, "email" | "registeredSince">;

function Profile() {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const nowPlayingContext = useContext(NowPlayingContext);

  const [profileUpdated, setProfileUpdated] = useState(false);
  const [profileInfo, setProfileInfo] = useState<ProfileInfo>({
    email: "",
    registeredSince: "",
  });

  useEffect(() => {
    if (!authContext.userId) return;

    (async () => {
      const user = await authService.getProfile(authContext.userId);
      const { email, registeredSince } = user;
      setProfileInfo({ email, registeredSince });
      setProfileUpdated(false);
    })();
  }, [authContext.userId, profileUpdated]);

  const handleLogout = () => {
    nowPlayingContext.stop();
    authContext.logout();
    history.replace(Routes.auth);
  };

  return (
    <React.Fragment>
      <NavBar title="Profile" />
      <Container maxWidth="md">
        <Box my={5}>
          <Typography variant="h5" component="h5" className={classes.sectionTitle}>
            Profile
          </Typography>
          <ProfileCard
            email={profileInfo.email}
            registeredSince={profileInfo.registeredSince}
            onLogout={handleLogout}
          />
        </Box>
        <Box my={5}>
          <Typography variant="h5" component="h5" className={classes.sectionTitle}>
            Account
          </Typography>
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
