import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Switch, Route } from "react-router-dom";
import DashBar from "./DashBar";
import DashDrawer from "./DashDrawer";
import Display from "./views/Display";
import Roms from "./views/Roms";

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  appBarSpacer: theme.mixins.toolbar,
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));
const Dashboard = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <>
      <DashBar isOpen={open} onOpen={handleDrawerOpen} />
      <DashDrawer isOpen={open} onClose={handleDrawerClose} />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Switch>
            <Route path="/roms">
              <Roms />
            </Route>
            <Route path="/">
              <Display />
            </Route>
          </Switch>
        </Container>
      </main>
    </>
  );
};

export default Dashboard;
