import makeStyles from "@mui/styles/makeStyles";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Theme } from "@mui/material/styles";

import moment from "moment";

import type { Profile } from "@/types/api/profile";

const useStyles = makeStyles((theme: Theme) => ({
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
  logoutButton: {
    color: theme.palette.warning.main,
  },
}));

export type ProfileCardProps = {
  email: Profile["email"];
  registeredSince?: Profile["registeredSince"];
  onLogout: React.MouseEventHandler<HTMLButtonElement>;
};

function ProfileCard({ email, registeredSince, onLogout }: ProfileCardProps) {
  const classes = useStyles();

  return (
    <Card variant="outlined">
      <CardContent className={classes.content}>
        <Avatar className={classes.avatar}>
          <AccountCircleIcon className={classes.avatarIcon} />
        </Avatar>
        <Typography variant="h5" component="h2" noWrap>
          {email}
        </Typography>
        {registeredSince && (
          <Typography className={classes.userSince} color="textSecondary" variant="body2" noWrap>
            Listening since: {moment(registeredSince).fromNow()}.
          </Typography>
        )}
        <Box mt={4}>
          <Button
            variant="outlined"
            size="medium"
            className={classes.logoutButton}
            endIcon={<ExitToAppIcon />}
            onClick={onLogout}
          >
            Logout
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}

export default ProfileCard;
