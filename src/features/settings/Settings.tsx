import React, { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import HighlightOffOutlinedIcon from "@material-ui/icons/HighlightOffOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { TransitionProps } from "@material-ui/core/transitions";
import Fade from "@material-ui/core/Fade";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  setSettingsOpen,
  doImportListXML,
  doListXML2js,
  listXMLComplete,
} from "../../features/settings/settingsSlice";
import { RootState } from "../../store/rootReducer";
import SettingsContext from "./SettingsContext";
import { AppContext } from "../../App";
import Mamepath from "./Mamepath";
import { ListItemIcon, ListItemSecondaryAction } from "@material-ui/core";
import * as Consts from "../../consts";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      position: "relative",
    },
    title: {
      marginLeft: theme.spacing(2),
      flex: 1,
    },
  })
);

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface SettingsProps {
  isOpen: boolean;
}
export default function Settings(props: SettingsProps) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { isOpen } = props;
  const settings = useSelector((state: RootState) => state.settings);
  const app = useContext(AppContext);
  const handleClose = () => dispatch(setSettingsOpen(false));
  const handleImport = () => dispatch(doImportListXML());
  useEffect(() => {
    window.Extant.api.receive(Consts.LIST_XML_COMPLETE, () => {
      console.log(`LIST_XML_COMPLETE`);
      dispatch(listXMLComplete());
      dispatch(doListXML2js());
    });
  }, [dispatch]);
  return (
    <SettingsContext.Provider value={settings}>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Settings
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <Mamepath />
          </ListItem>
          <Divider />
          <ListItem button onClick={handleImport}>
            <ListItemIcon>
              {app.isReady ? (
                <CheckCircleOutlineIcon />
              ) : (
                <HighlightOffOutlinedIcon />
              )}
            </ListItemIcon>
            <ListItemText
              primary="Import Completed"
              secondary="listXML.xml is missing"
            />
            <ListItemSecondaryAction>
              {settings.isCreatingXML && (
                <Fade
                  in
                  style={{
                    transitionDelay: "800ms",
                  }}
                  unmountOnExit
                >
                  <CircularProgress />
                </Fade>
              )}
            </ListItemSecondaryAction>
          </ListItem>
        </List>
      </Dialog>
    </SettingsContext.Provider>
  );
}
