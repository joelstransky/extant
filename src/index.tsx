import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import * as CONSTS from "./consts";
import { getStore } from "./store";
import "./index.css";
// import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { sign } from "crypto";
import { RootState } from "./store/rootReducer";
import { Store } from "@reduxjs/toolkit";
interface IpcData {
  type: string;
  payload?: any;
  meta?: string;
}
declare global {
  interface Window {
    Extant: {
      api: {
        send: (channel: string, data: IpcData) => void;
        invoke: (channel: string, data: IpcData) => Promise<any>;
        receive: (channel: string, func: (data: IpcData) => void) => void;
      };
    };
  }
}
window.Extant || Object.defineProperty(window, "Extant", { value: {} });
let store: Store<RootState>;
const render = () => {
  const App = require("./App").default;
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById("root")
  );
};
window.Extant.api
  .invoke(CONSTS.MAIN_CHANNEL_IN, { type: "GetElectronStore" })
  .then((message: IpcData) => {
    console.log("payload is", message.payload);
    store = getStore(message.payload);
    render();
  });

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./App", render);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
