import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/rootReducer";
interface MetaPayload {
  meta?: string;
}
interface MamePath extends MetaPayload {
  mamepath: string;
}

interface ListXML extends MetaPayload {
  isCreatingXML: boolean;
}

export type CurrentSettingsState = {
  isOpen: boolean;
} & ListXML &
  MamePath;

let initialState: CurrentSettingsState = {
  mamepath: "./from/redux",
  isOpen: false,
  isCreatingXML: false,
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
    doImportListXML: {
      reducer: (state, action: PayloadAction<ListXML>) => {
        const { isCreatingXML } = action.payload;
        state.isCreatingXML = isCreatingXML;
      },
      prepare: (isCreatingXML: boolean) => {
        return { payload: { isCreatingXML, meta: "noop" } };
      },
    },
  },
});

export const settingsSelector = (state: RootState) => state.settings;

export const mamepathSelector = createSelector(
  settingsSelector,
  (settings) => settings.mamepath
);

export const {
  setMamePath,
  setSettingsOpen,
  doImportListXML,
} = settingsSlice.actions;

export default settingsSlice.reducer;
