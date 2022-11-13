import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import { RootState } from "../../app/store";
import {
  BooleanPayload,
  DateFormat,
  KeyValuePair,
  SettingsState,
  TimeFormat,
  Times,
  UnitsState,
  UnitType,
  Visual,
  WorkingHours,
} from "./types";
import { updateStorage } from "../chromeStorage/storageHelper";

const Now = DateTime.now();
const reference = {
  now: Now,
  workDay: {
    times: {
      start: "09:00",
      end: "17:00",
    },
    scopedToWorkingHours: true,
  },
  month: {
    start: Now.startOf("month").toISO(),
    end: "",
  },
  year: {
    start: Now.startOf("year").toISO(),
    end: "",
  },
  durations: {
    shortTerm: { unit: "days", qty: 1 },
    mediumTerm: { unit: "months", qty: 1 },
    longTerm: { unit: "years", qty: 1 },
  },
};
reference.month.end = DateTime.fromISO(reference.month.start)
  .plus({ months: 1 })
  .toISO();
reference.year.end = DateTime.fromISO(reference.year.start)
  .plus({ years: 1 })
  .toISO();

const defaultShortTerm: UnitType & { workingHours: WorkingHours } = {
  unitType: "day",
  title: "Today",
  duration: reference.durations.shortTerm,
  endDate: DateTime.now().endOf("day").toISO(),
  startDate: DateTime.now().startOf("day").toISO(),
  workingHours: reference.workDay,
  repeat: true,
};

export const defaultMediumTerm: UnitType = {
  unitType: "month",
  title: "Month",
  duration: reference.durations.mediumTerm,
  endDate: reference.month.end,
  startDate: reference.month.start,
  repeat: true,
};

export const defaultLongTerm: UnitType = {
  unitType: "year",
  title: "Year",
  duration: reference.durations.longTerm,
  endDate: reference.year.end,
  startDate: reference.year.start,
  repeat: true,
};

const initialUnits: UnitsState = {
  shortTerm: defaultShortTerm,
  mediumTerm: defaultMediumTerm,
  longTerm: defaultLongTerm,
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
    toggleRepeat: (
      state,
      {
        payload: { value, key },
      }: PayloadAction<BooleanPayload & { key: "mediumTerm" | "longTerm" }>
    ) => {
      state.units[key].repeat = value;
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
    setNotShortTerm: (
      state,
      {
        payload,
      }: PayloadAction<{
        termObj: UnitType;
        key: keyof Omit<UnitsState, "shortTerm">;
      }>
    ) => {
      const { key, termObj } = payload;
      state.units[key] = termObj;
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
  toggleRepeat,
  setNotShortTerm,
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
