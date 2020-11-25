import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MemoryIcon from "@material-ui/icons/Memory";
import SettingsIcon from "@material-ui/icons/Settings";
import { setSettingsOpen } from "../../features/settings/settingsSlice";

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/#">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/#roms">
      <ListItemIcon>
        <MemoryIcon />
      </ListItemIcon>
      <ListItemText primary="Roms" />
    </ListItem>
  </div>
);

export const SecondaryListItems = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <ListItem button onClick={() => dispatch(setSettingsOpen(true))}>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </div>
  );
};
