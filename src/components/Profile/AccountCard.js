import React from "react";
import PropTypes from "prop-types";

import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import WarningOutlinedIcon from "@mui/icons-material/WarningOutlined";

import AuthDialog from "@/components/Profile/AuthDialog";
import { useDialog } from "@/hooks";
import { dialogTypes } from "./AuthDialog";

function AccountCard({ onProfileDeleted, onProfileUpdated }) {
  const [dialog, onDialogOpen, onDialogClose] = useDialog({
    title: "",
    type: "",
    message: "",
  });

  const handleDialogSubmit = () => {
    if (dialog.type === dialogTypes.CLOSE_ACCOUNT) {
      onProfileDeleted();
    } else {
      onProfileUpdated();
      onDialogClose();
    }
  };

  const listItems = [
    {
      icon: <MailOutlineIcon />,
      title: "Change Email",
      type: dialogTypes.CHANGE_EMAIL,
      message: "Please enter your new email.",
    },
    {
      icon: <LockOutlinedIcon />,
      title: "Change Password",
      type: dialogTypes.CHANGE_PASSWORD,
      message: "Please complete the form to change your password.",
    },
    {
      icon: <WarningOutlinedIcon color="warning" />,
      title: "Delete Your Account",
      type: dialogTypes.CLOSE_ACCOUNT,
      message: "Please sign in to confirm.",
    },
  ];

  return (
    <React.Fragment>
      <Card variant="outlined">
        <CardContent>
          <List>
            {listItems.map((item, index) => (
              <React.Fragment key={index}>
                <ListItem button onClick={() => onDialogOpen(item)}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.title} />
                </ListItem>
                {listItems.length - 1 !== index ? <Divider variant="inset" component="li" /> : null}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
      {dialog.type !== "" && (
        <AuthDialog {...dialog} onCancel={onDialogClose} onSubmit={handleDialogSubmit} />
      )}
    </React.Fragment>
  );
}

AccountCard.propTypes = {
  onProfileDeleted: PropTypes.func.isRequired,
  onProfileUpdated: PropTypes.func.isRequired,
};

export default AccountCard;
