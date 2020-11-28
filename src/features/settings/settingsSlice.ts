import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface MetaPayload {
  meta?: string;
}
interface MamePath extends MetaPayload {
  mamepath: string;
}

export type CurrentSettingsState = {
  isOpen: boolean;
} & MamePath;

let initialState: CurrentSettingsState = {
  mamepath: "./from/redux",
  isOpen: false,
};

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    returnElectronStore(state) {
      console.log("returnElectronStore called");
    },
    setMamePath: {
      reducer: (state, action: PayloadAction<MamePath>) => {
        console.log("setMamePath called", state, action);
        const { mamepath } = action.payload;
        state.mamepath = mamepath;
      },
      prepare: (mamepath: string) => {
        return { payload: { mamepath, meta: "settings.mamepath" } };
      },
    },
    setSettingsOpen(state, action: PayloadAction<boolean>) {
      const isOpen = action.payload;
      state.isOpen = isOpen;
    },
  },
});

export const { setMamePath, setSettingsOpen } = settingsSlice.actions;

export default settingsSlice.reducer;
