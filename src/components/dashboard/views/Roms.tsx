import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import path from "path";
import * as fs from "fs";
import { parseStringPromise } from "xml2js";
import { mamepathSelector } from "../../../features/settings/settingsSlice";
import { FormHelperText } from "@material-ui/core";
import { setRomsJSON } from "./romsSlice";

const Roms = () => {
  const mamepath = useSelector(mamepathSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    // window.Extant.api
    //   .invoke(CONSTS.MAIN_CHANNEL_IN, {
    //     type: "Mame64:ListAll",
    //   })
    //   .then((data) => {
    //     console.log("data is", typeof data);
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // window.Extant.api
    //   .invoke(CONSTS.MAIN_CHANNEL_IN, {
    //     type: "Mame64:ListXML",
    //   })
    //   .then((data) => {
    //     parseStringPromise(data).then((result: any) => {
    //       console.log(result);
    //       dispatch(setRomsJSON(result));
    //     });
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mamepath]);
  return (
    <div>
      ROMS
      <FormHelperText>{path.dirname(mamepath)}</FormHelperText>
    </div>
  );
};

export default Roms;
