import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import path from "path";
import * as fs from "fs";
import { parseStringPromise } from "xml2js";
import { mamepathSelector } from "../../settings/settingsSlice";
import { romsJsonSelector } from "./romsSlice";
import {
  FormHelperText,
  List,
  ListItem,
  ListItemProps,
  ListItemText,
} from "@material-ui/core";
import { setRomsJSON, findROMS } from "./romsSlice";
import * as consts from "../../../consts";

function ListItemLink(props: ListItemProps<"a", { button?: true }>) {
  return <ListItem button component="a" {...props} />;
}

const Roms = () => {
  const mamepath = useSelector(mamepathSelector);
  const json = useSelector(romsJsonSelector);
  const dispatch = useDispatch();
  console.log("json is", json);
  useEffect(() => {
    console.log("json are", json);
    !!json &&
      window.Extant.api
        .invoke(consts.MAIN_CHANNEL_IN, {
          type: consts.RESPOND_WITH_QUERY,
          payload: { "@.name": "ddonpach" },
        })
        .then((data) => {
          dispatch(setRomsJSON({ json: data }));
          console.log("data is", data);
        })
        .catch((error) => {
          console.error(error);
        });
    // window.Extant.api
    //   .invoke(consts.MAIN_CHANNEL_IN, {
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
    <>
      <div>
        ROMS
        <FormHelperText>{path.dirname(mamepath)}</FormHelperText>
      </div>
      <div>
        <List component="nav" aria-label="secondary mailbox folders">
          {json &&
            json.map((item) => (
              <ListItem
                button
                onClick={() => {
                  window.Extant.api.invoke(consts.MAIN_CHANNEL_IN, {
                    type: consts.LAUNCH_ROM,
                    payload: { rom: item["@"]["name"] },
                  });
                }}
              >
                <ListItemText primary={item["description"]} />
              </ListItem>
            ))}
        </List>
      </div>
    </>
  );
};

export default Roms;
