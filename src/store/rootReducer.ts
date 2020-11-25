import { combineReducers } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";

const rootReducer = combineReducers({
  settings: settingsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
