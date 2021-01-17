import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/rootReducer";

interface SetRomsJSON {
  json: null | {};
}
export type CurrentRomState = {} & SetRomsJSON;
let initialState: CurrentRomState = {
  json: null,
};

const romsSlice = createSlice({
  name: "roms",
  initialState,
  reducers: {
    setRomsJSON(state, action: PayloadAction<SetRomsJSON>) {
      const { json } = action.payload;
      state.json = action.payload;
    },
  },
});

export const romsSelector = (state: RootState) => state.roms;
export const romsJsonSelector = createSelector(
  romsSelector,
  (roms) => roms.json
);

export const { setRomsJSON } = romsSlice.actions;

export default romsSlice.reducer;
