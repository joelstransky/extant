import { Button, TextField } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import * as CONSTS from "../../consts";
import SettingsContext from "./SettingsContext";
import { setMamePath } from "../../features/settings/settingsSlice";

const Mamepath = () => {
  const dispatch = useDispatch();
  const { mamepath } = useContext(SettingsContext);
  const handleLocate = () => {
    window.Extant.api
      .invoke(CONSTS.MAIN_CHANNEL_IN, { type: "ShowDialog" })
      .then((result) => {
        console.log(result);
        dispatch(setMamePath(result.filePaths[0]));
      });
  };
  return (
    <>
      <TextField
        id="standard-full-width"
        label="Mame path"
        style={{ margin: 8 }}
        placeholder="Placeholder"
        helperText="Please show me where your mame executable is."
        value={mamepath}
        fullWidth
        margin="normal"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button
        variant="outlined"
        startIcon={<SaveIcon />}
        onClick={handleLocate}
      >
        Locate
      </Button>
    </>
  );
};

export default Mamepath;
