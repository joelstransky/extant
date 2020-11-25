import React from "react";
import { useSelector } from "react-redux";
import {
  CssBaseline,
  createMuiTheme,
  ThemeProvider,
  responsiveFontSizes,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";
import { RootState } from "./store/rootReducer";
import Settings from "./features/settings/Settings";
import Dashboard from "./components/dashboard/Dashboard";
import "./App.css";

let theme = createMuiTheme({
  props: {},
  overrides: {},
});
theme = responsiveFontSizes(theme);
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
}));
const App: React.FC = () => {
  const classes = useStyles();
  const { isOpen } = useSelector((state: RootState) => state.settings);
  return (
    <HashRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className={classes.root}>
          <Dashboard />
          <Settings isOpen={isOpen} />
        </div>

        {/* <Container>
          <div className="App">
            <Grid container spacing={3}>
              <Menu />
              <Grid item xs={3}>
                <ResultsList />
              </Grid>
              <Grid item xs={9}>
                <TestUI />
              </Grid>
            </Grid>
          </div>
        </Container> */}
      </ThemeProvider>
    </HashRouter>
  );
};

export default App;
