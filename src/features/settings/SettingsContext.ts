import React from "react";

const SettingsContext = React.createContext<Partial<CurrentSettingsState>>({});

export default SettingsContext;
