import React from "react";

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

// @ts-expect-error TS(2307): Cannot find module '@/components/Profile/AuthDialo... Remove this comment to see the full error message
import AuthDialog from "@/components/Profile/AuthDialog";
// @ts-expect-error TS(2307): Cannot find module '@/hooks' or its corresponding ... Remove this comment to see the full error message
import { useDialog } from "@/hooks";
// @ts-expect-error TS(6142): Module './AuthDialog' was resolved to '/mnt/s/Gith... Remove this comment to see the full error message
import { dialogTypes } from "./AuthDialog";

type Props = {
    onProfileDeleted: (...args: any[]) => any;
    onProfileUpdated: (...args: any[]) => any;
};

function AccountCard({ onProfileDeleted, onProfileUpdated }: Props) {
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
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      icon: <MailOutlineIcon />,
      title: "Change Email",
      type: dialogTypes.CHANGE_EMAIL,
      message: "Please enter your new email.",
    },
    {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      icon: <LockOutlinedIcon />,
      title: "Change Password",
      type: dialogTypes.CHANGE_PASSWORD,
      message: "Please complete the form to change your password.",
    },
    {
      // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      icon: <WarningOutlinedIcon color="warning" />,
      title: "Delete Your Account",
      type: dialogTypes.CLOSE_ACCOUNT,
      message: "Please sign in to confirm.",
    },
  ];

  return (
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <React.Fragment>
      {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card variant="outlined">
        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <CardContent>
          {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <List>
            {listItems.map((item, index) => (
              // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <React.Fragment key={index}>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ListItem button onClick={() => onDialogOpen(item)}>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ListItemText primary={item.title} />
                </ListItem>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {listItems.length - 1 !== index ? <Divider variant="inset" component="li" /> : null}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
      {dialog.type !== "" && (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <AuthDialog {...dialog} onCancel={onDialogClose} onSubmit={handleDialogSubmit} />
      )}
    </React.Fragment>
  );
}

export default AccountCard;
