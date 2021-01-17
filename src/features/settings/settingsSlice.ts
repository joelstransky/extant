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
interface ConvertXML extends MetaPayload {
  isConvertingXML: boolean;
}

export type CurrentSettingsState = {
  isOpen: boolean;
} & ListXML &
  ConvertXML &
  MamePath;

let initialState: CurrentSettingsState = {
  mamepath: "./from/redux",
  isOpen: false,
  isCreatingXML: false,
  isConvertingXML: false,
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
      reducer: (state) => {
        state.isCreatingXML = true;
      },
      prepare: () => ({ payload: { meta: "noop" } }),
    },
    listXMLComplete(state) {
      state.isCreatingXML = false;
    },
    doListXML2js: {
      reducer: (state) => {
        state.isConvertingXML = true;
      },
      prepare: () => ({ payload: { meta: "noop" } }),
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
  listXMLComplete,
  doListXML2js,
} = settingsSlice.actions;

export default settingsSlice.reducer;
