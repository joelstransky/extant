import { combineReducers } from "@reduxjs/toolkit";
import settingsReducer from "../features/settings/settingsSlice";
import romsReducer from "../components/dashboard/views/romsSlice";

const rootReducer = combineReducers({
  settings: settingsReducer,
  roms: romsReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
