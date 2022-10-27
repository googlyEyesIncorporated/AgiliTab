import { createSlice } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../app/store";
import { UnitsState, UnitType } from "../../types";

const referenceSprintStartDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 10, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const referenceSprintEndDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 24, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const referenceQuarterStartDate = DateTime.fromObject(
  { year: 2022, month: 8, day: 15, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const referenceQuarterEndDate = DateTime.fromObject(
  { year: 2022, month: 11, day: 7, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const shortTerm: UnitType = {
  unitType: "day",
  title: "Today",
  endDate: DateTime.now().endOf("day").toISO(),
  startDate: DateTime.now().startOf("day").toISO(),
};

const mediumTerm: UnitType = {
  unitType: "sprint",
  title: "Sprint",
  endDate: referenceSprintEndDate,
  startDate: referenceSprintStartDate,
};

const longTerm: UnitType = {
  unitType: "quarter",
  title: "Quarter",
  endDate: referenceQuarterEndDate,
  startDate: referenceQuarterStartDate,
};

const initialUnitsState: UnitsState = {
  shortTerm: shortTerm,
  mediumTerm: mediumTerm,
  longTerm: longTerm,
};

export const unitsSlice = createSlice({
  name: "todo",
  initialState: initialUnitsState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // add: (state, action: PayloadAction<AddAction>) => {
    //   const { key, index, item } = action.payload;
    //   state[key].splice(index, 0, item);
    // },
  },
});

// export const { add, remove, move, toggleChecked } = unitsSlice.actions;

export const selectAllUnits = (state: RootState) => state.units;
export const selectShortTerm = (state: RootState) => state.units.shortTerm;
export const selectMediumTerm = (state: RootState) => state.units.mediumTerm;
export const selectLongTerm = (state: RootState) => state.units.longTerm;

export default unitsSlice.reducer;
