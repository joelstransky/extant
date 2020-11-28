import React from "react";
import { CurrentSettingsState } from "./settingsSlice";

const SettingsContext = React.createContext<Partial<CurrentSettingsState>>({});

export default SettingsContext;
