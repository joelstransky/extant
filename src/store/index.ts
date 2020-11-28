import { configureStore, Action, Store, Middleware } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";

import rootReducer, { RootState } from "./rootReducer";
import { CurrentSettingsState } from "../features/settings/settingsSlice";

// function logger({ getState }) {
//   return (next) => (action) => {
//     console.log("will dispatch", action);

//     // Call the next dispatch method in the middleware chain.
//     const returnValue = next(action);

//     console.log("state after dispatch", getState());

//     // This will likely be the action itself, unless
//     // a middleware further in chain changed it.
//     return returnValue;
//   };
// }

const electronUpdater: Middleware<{}, RootState> = (store) => (next) => (
  action
) => {
  const { payload } = action;
  console.log("running electronUpdater", action);
  if (payload.meta) {
    window.Extant.api.send("toMain", action);
  }
  return next(action);
};

let store: Store<RootState>;
export const getStore = (eStore: ElectronStore) => {
  store =
    store ||
    configureStore({
      reducer: rootReducer,
      preloadedState: eStore,
      middleware: [electronUpdater],
    });
  return store;
};

if (process.env.NODE_ENV === "development" && module.hot) {
  module.hot.accept("./rootReducer", () => {
    const newRootReducer = require("./rootReducer").default;
    store.replaceReducer(newRootReducer);
  });
}

export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, null, Action<string>>;
export interface ElectronStore {
  settings: CurrentSettingsState;
}
// export default store;
