import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import WarningOutlinedIcon from '@material-ui/icons/WarningOutlined';

import AuthDialog from '@/components/Profile/AuthDialog';
import { useDialog } from '@/hooks';
import { dialogTypes } from './AuthDialog';

const useStyles = makeStyles((theme) => ({
    dangerButton: {
        color: theme.palette.warning.main,
    },
}));

function DangerCard(props) {
    const classes = useStyles();

    const [dialog, onDialogOpen, onDialogClose] = useDialog({
        title: '',
        type: '',
        message: '',
    });

    const handleDialogSubmit = () => {
        if (dialog.type === dialogTypes.CLOSE_ACCOUNT) {
            props.onProfileDeleted();
        } else {
            props.onProfileUpdated();
            onDialogClose();
        }
    };

    const listItems = [
        {
            icon: <MailOutlineIcon />,
            title: 'Change Email',
            type: dialogTypes.CHANGE_EMAIL,
            message: 'Please enter your new email.',
        },
        {
            icon: <LockOutlinedIcon />,
            title: 'Change Password',
            type: dialogTypes.CHANGE_PASSWORD,
            message: 'Please complete the form to change your password.',
        },
        {
            icon: <WarningOutlinedIcon className={classes.dangerButton} />,
            title: 'Delete Your Account',
            type: dialogTypes.CLOSE_ACCOUNT,
            message: 'Please sign in to confirm.',
        },
    ];

    return (
        <React.Fragment>
            <Card variant="outlined">
                <CardContent>
                    <List>
                        {listItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    button
                                    onClick={() => onDialogOpen(item)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.title} />
                                </ListItem>
                                {listItems.length - 1 !== index ? (
                                    <Divider variant="inset" component="li" />
                                ) : null}
                            </React.Fragment>
                        ))}
                    </List>
                </CardContent>
            </Card>
            {dialog.type !== '' && (
                <AuthDialog
                    {...dialog}
                    onCancel={onDialogClose}
                    onSubmit={handleDialogSubmit}
                />
            )}
        </React.Fragment>
    );
}

export default DangerCard;
