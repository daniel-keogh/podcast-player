import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
    userSince: {
        marginTop: theme.spacing(1),
        marginBottom: theme.spacing(2),
    },
    buttonWrapper: {
        marginTop: '32px',
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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

function ProfileCard(props) {
    const classes = useStyles();

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent className={classes.content}>
                <Avatar className={classes.avatar}>
                    <AccountCircleIcon className={classes.avatarIcon} />
                </Avatar>
                <Typography variant="h5" component="h2">
                    {props.email}
                </Typography>
                {props.registeredSince &&
                    <Typography className={classes.userSince} color="textSecondary">
                        Listening since {moment(props.registeredSince).fromNow()}
                    </Typography>
                }
                <div className={classes.buttonWrapper}>
                    <Button
                        variant="outlined"
                        size="medium"
                        className={classes.logoutButton}
                        endIcon={<ExitToAppIcon />}
                        onClick={props.onLogout}
                    >
                        Logout
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default ProfileCard;
