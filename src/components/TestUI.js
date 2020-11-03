import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
// const electron = require("electron");
// const ipcRenderer = electron.ipcRenderer;

function TestUI(props) {
  useEffect(() => {
    window.api.receive("fromMain", (data) => {
      console.log(`Received ${data.success} from main process`);
    });
  }, []);
  const handleRunIt = () => {
    console.log("run it");
    window.api.send("toMain", { data: "some data" });
    // window.ipcRenderer.sendSync("IPC:EXECUTE");
  };
  return (
    <div>
      <Button onClick={handleRunIt} variant="contained">
        Run It
      </Button>
      <Button variant="contained" color="primary">
        Primary
      </Button>
      <Button variant="contained" color="secondary">
        Secondary
      </Button>
      <Button variant="contained" disabled>
        Disabled
      </Button>
      <Button variant="contained" color="primary" href="#contained-buttons">
        Link
      </Button>
    </div>
  );
}

TestUI.propTypes = {};

export default TestUI;
