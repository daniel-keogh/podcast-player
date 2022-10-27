import React from "react";

import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import moment from "moment";

const useStyles = makeStyles((theme) => ({
    userSince: {
        margin: (theme as any).spacing(2, 0),
    },
    content: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: (theme as any).spacing(3),
        width: (theme as any).spacing(10),
        height: (theme as any).spacing(10),
    },
    avatarIcon: {
        width: (theme as any).spacing(10),
        height: (theme as any).spacing(10),
    },
    logoutButton: {
        color: (theme as any).palette.warning.main,
    },
}));

type Props = {
    email: string;
    registeredSince?: string;
    onLogout: (...args: any[]) => any;
};

function ProfileCard({ email, registeredSince, onLogout }: Props) {
  const classes = useStyles();

  // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return (<Card className={(classes as any).root} variant="outlined">
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <CardContent className={classes.content}>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Avatar className={classes.avatar}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <AccountCircleIcon className={classes.avatarIcon}/>
        </Avatar>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Typography variant="h5" component="h2" noWrap>
          {email}
        </Typography>
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {registeredSince && (<Typography className={classes.userSince} color="textSecondary" variant="body2" noWrap>
            Listening since: {moment(registeredSince).fromNow()}.
          </Typography>)}
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Box mt={4}>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Button variant="outlined" size="medium" className={classes.logoutButton} endIcon={<ExitToAppIcon />} onClick={onLogout}>
            Logout
          </Button>
        </Box>
      </CardContent>
    </Card>);
}

export default ProfileCard;
