import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { useStyles } from "../hooks";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const ResultsList = () => {
  const classes = useStyles();
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem button style={style} key={index}>
        <ListItemText primary={`Item ${index + 1}`} />
      </ListItem>
    );
  }
  return (
    <div style={{ background: "red", height: "100%" }}>
      <AutoSizer>
        {({ height, width }) => {
          console.log("height", height, "width", width);
          return (
            <FixedSizeList
              height={height}
              width={width}
              itemSize={46}
              itemCount={200}
            >
              {renderRow}
            </FixedSizeList>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default ResultsList;
