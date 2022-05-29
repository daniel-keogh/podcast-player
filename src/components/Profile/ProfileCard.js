import React from "react";
import PropTypes from "prop-types";

import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
  userSince: {
    margin: theme.spacing(2, 0),
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(3),
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatarIcon: {
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
}));

const SkeletonText = ({ width = 250 }) => (
  <Box sx={{ width }}>
    <Skeleton />
  </Box>
);

function ProfileCard({ email, registeredSince, onLogout }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
        {email ? (
          <Typography variant="h5" component="h2" noWrap>
            {email}
          </Typography>
        ) : (
          <SkeletonText />
        )}
        {registeredSince ? (
          <Typography className={classes.userSince} color="textSecondary" variant="body2" noWrap>
            Listening since: {moment(registeredSince).fromNow()}.
          </Typography>
        ) : (
          <SkeletonText />
        )}
        <Box mt={3}>
          <Button variant="outlined" size="medium" endIcon={<ExitToAppIcon />} onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  email: PropTypes.string.isRequired,
  registeredSince: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

export default ProfileCard;
