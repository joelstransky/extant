import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../../store/rootReducer";

let initialState: CurrentRomState = {
  json: [],
  query: null,
};

const romsSlice = createSlice({
  name: "roms",
  initialState,
  reducers: {
    setRomsJSON(state, action: PayloadAction<SetRomsJSON>) {
      console.log("setRomsjson", state, action);
      const { json } = action.payload;
      state.json = json;
    },
    findROMS: {
      reducer: (state, action: PayloadAction<FindRoms>) => {
        console.log("findRoms", state, action);
        const { query } = action.payload;
        state.query = query;
      },
      prepare: (query: any) => {
        return { payload: { query, meta: "roms.findROMS" } };
      },
    },
  },
});

export const romsSelector = (state: RootState) => state.roms;
export const romsJsonSelector = createSelector(
  romsSelector,
  (roms) => roms.json
);

export const { setRomsJSON, findROMS } = romsSlice.actions;

export default romsSlice.reducer;
