import React, { useState } from 'react';
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

import AuthDialog from './AuthDialog';

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    inline: {
        display: 'inline',
    },
});

function DangerCard(props) {
    const classes = useStyles();

    const [dialog, setDialog] = useState({
        text: '',
        type: '',
        show: false,
    });

    const handleItemClicked = (item) => {
        setDialog({
            show: true,
            text: item.text,
            type: item.type,
        });
    };

    const handleDialogClose = () => {
        setDialog((state) => ({
            ...state,
            show: false,
        }));
    };

    const handleDialogSubmit = () => {
        props.onProfileUpdated();
        handleDialogClose();
    };

    const listItems = [
        {
            icon: <MailOutlineIcon />,
            text: 'Change Email',
            type: 'CHANGE_EMAIL',
        },
        {
            icon: <LockOutlinedIcon />,
            text: 'Change Password',
            type: 'CHANGE_PASSWORD',
        },
        {
            icon: <WarningOutlinedIcon />,
            text: 'Delete Your Account',
            type: 'CLOSE_ACCOUNT',
        },
    ];

    return (
        <React.Fragment>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <List className={classes.root}>
                        {listItems.map((item, index) => (
                            <React.Fragment key={index}>
                                <ListItem
                                    button
                                    onClick={() => handleItemClicked(item)}
                                >
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                                {listItems.length - 1 !== index ? (
                                    <Divider variant="inset" component="li" />
                                ) : null}
                            </React.Fragment>
                        ))}
                    </List>
                </CardContent>
            </Card>
            <AuthDialog
                open={dialog.show}
                title={dialog.text}
                type={dialog.type}
                onCancel={handleDialogClose}
                onSubmit={handleDialogSubmit}
            />
        </React.Fragment>
    );
}

export default DangerCard;
