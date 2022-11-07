import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../app/store";
import { updateStorage } from "./storageHelper";
import {
  KeyValuePair,
  SettingsState,
  UnitsState,
  UnitType,
  Visual,
  WorkingHours,
  BooleanPayload,
  Times,
  DateFormat,
  TimeFormat,
} from "./types";

const referenceSprintStartDate = DateTime.fromObject(
  { year: 2022, month: 10, day: 10, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const referenceQuarterStartDate = DateTime.fromObject(
  { year: 2022, month: 8, day: 15, hour: 10 },
  { zone: "America/New_York" }
).toISO();

const WorkDay: WorkingHours = {
  times: {
    start: "09:00",
    end: "17:00",
  },
  scopedToWorkingHours: true,
};

const shortTerm: UnitType & { workingHours: WorkingHours } = {
  unitType: "day",
  title: "Today",
  duration: "24 hours",
  startDate: DateTime.now().startOf("day").toISO(),
  workingHours: WorkDay,
};

const mediumTerm: UnitType = {
  unitType: "sprint",
  title: "Sprint",
  duration: "2 weeks",
  startDate: referenceSprintStartDate,
};

const longTerm: UnitType = {
  unitType: "quarter",
  title: "Quarter",
  duration: "13 weeks",
  startDate: referenceQuarterStartDate,
};

const initialUnits: UnitsState = {
  shortTerm: shortTerm,
  mediumTerm: mediumTerm,
  longTerm: longTerm,
};

const initalVisuals: Visual = {
  bgColor: "#222222",
  fontColor: "#FFFFFF",
  secondFontColor: "#A79999",
  dateFormat: "MMM dd, yyyy",
  timeFormat: "h:mm a",
};

const initialSettings: SettingsState = {
  units: initialUnits,
  visual: initalVisuals,
};

export const unitsSlice = createSlice({
  name: "units",
  initialState: initialSettings,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    populateSettingssFromChrome: (
      state,
      { payload }: PayloadAction<SettingsState | {}>
    ) => {
      if ("units" in payload) {
        const { units } = payload;
        state.units = units;
      }
      if ("visual" in payload) {
        state.visual = payload.visual;
      }
    },
    toggleWorkDay: (
      state,
      { payload: { value } }: PayloadAction<BooleanPayload>
    ) => {
      state.units.shortTerm.workingHours.scopedToWorkingHours = value;
      updateStorage({ storageKey: "settings", val: state });
    },
    setWorkDayHours: (
      state,
      { payload: workingHours }: PayloadAction<Times>
    ) => {
      state.units.shortTerm.workingHours.times = workingHours;
      updateStorage({ storageKey: "settings", val: state });
    },
    setVisualSetting: (
      state,
      { payload: { key, value } }: PayloadAction<KeyValuePair>
    ) => {
      state.visual[key] = value;
      updateStorage({ storageKey: "settings", val: state });
    },
    setDateTimeFormats: (
      state,
      { payload }: PayloadAction<DateFormat & TimeFormat>
    ) => {
      state.visual = { ...state.visual, ...payload };
      updateStorage({ storageKey: "settings", val: state });
    },
    resetVisualSetting: (state) => {
      state.visual = initalVisuals;
      updateStorage({ storageKey: "settings", val: state });
    },
  },
});

export const {
  populateSettingssFromChrome,
  setVisualSetting,
  setDateTimeFormats,
  resetVisualSetting,
  setWorkDayHours,
  toggleWorkDay,
} = unitsSlice.actions;

export const selectWorkingHours = (state: RootState) =>
  state.settings.units.shortTerm.workingHours;
export const selectTimeFormat = (state: RootState) =>
  state.settings.visual.timeFormat;
export const selectDateFormat = (state: RootState) =>
  state.settings.visual.dateFormat;
export const selectWorkDayToggle = (state: RootState) =>
  state.settings.units.shortTerm.workingHours.scopedToWorkingHours;
export const selectAllUnits = (state: RootState) => state.settings.units;
export const selectShortTerm = (state: RootState) =>
  state.settings.units.shortTerm;
export const selectMediumTerm = (state: RootState) =>
  state.settings.units.mediumTerm;
export const selectLongTerm = (state: RootState) =>
  state.settings.units.longTerm;
export const selectVisualSettings = (state: RootState) => state.settings.visual;

export default unitsSlice.reducer;
