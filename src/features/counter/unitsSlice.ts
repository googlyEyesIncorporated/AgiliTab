import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../app/store";
import { UnitsState, UnitType } from "../../types";

const referenceSprintStartDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 10, hour: 10 },
  { zone: "America/New_York" }
);

const referenceSprintEndDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 24, hour: 10 },
  { zone: "America/New_York" }
);

const referenceQuarterStartDate = DateTime.fromObject(
  { year: 2022, month: 8, day: 15, hour: 10 },
  { zone: "America/New_York" }
);

const referenceQuarterEndDate = DateTime.fromObject(
  { year: 2022, month: 11, day: 7, hour: 10 },
  { zone: "America/New_York" }
);

const firstUnit: UnitType = {
  unitType: "day",
  title: "Today",
  endDate: DateTime.now().endOf("day"),
  startDate: DateTime.now().startOf("day"),
};

const secondUnit: UnitType = {
  unitType: "sprint",
  title: "Sprint",
  endDate: referenceSprintEndDate,
  startDate: referenceSprintStartDate,
};

const thirdUnit: UnitType = {
  unitType: "quarter",
  title: "Quarter",
  endDate: referenceQuarterEndDate,
  startDate: referenceQuarterStartDate,
};

const initialUnitsState: UnitsState = {
  firstUnit: firstUnit,
  secondUnit: secondUnit,
  thirdUnit: thirdUnit,
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
export const selectFirstUnit = (state: RootState) => state.units.firstUnit;
export const selectSecondUnit = (state: RootState) => state.units.secondUnit;
export const selectThirdUnit = (state: RootState) => state.units.thirdUnit;

export default unitsSlice.reducer;
