import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryIcon from "@mui/icons-material/History";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import Routes from "@/utils/routes";

const menuItems = [
  {
    name: "History",
    route: Routes.history,
    Icon: HistoryIcon,
  },
  {
    name: "Profile",
    route: Routes.profile,
    Icon: AccountCircleIcon,
  },
];

function MoreMenu() {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <React.Fragment>
      <Tooltip title="More">
        <IconButton
          color="inherit"
          edge="end"
          size="large"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          <MoreVertIcon />
        </IconButton>
      </Tooltip>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {menuItems.map(({ Icon, ...item }) => (
          <MenuItem key={item.route} onClick={() => history.push(item.route)}>
            <ListItemIcon>
              <Icon fontSize="small" />
            </ListItemIcon>
            <ListItemText>{item.name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
}

export default MoreMenu;
