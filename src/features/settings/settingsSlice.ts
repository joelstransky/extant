import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MamePath {
  path: string;
}

type CurrentSettingsState = {
  isOpen: boolean;
} & MamePath;

let initialState: CurrentSettingsState = {
  path: "./",
  isOpen: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setMamePath(state, action: PayloadAction<MamePath>) {
      const { path } = action.payload;
      state.path = path;
    },
    setSettingsOpen(state, action: PayloadAction<boolean>) {
      const isOpen = action.payload;
      state.isOpen = isOpen;
    },
  },
});

export const { setMamePath, setSettingsOpen } = settingsSlice.actions;

export default settingsSlice.reducer;
