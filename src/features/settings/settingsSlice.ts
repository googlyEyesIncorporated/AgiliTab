import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DateTime } from "luxon";
import {
  BooleanPayload,
  DateFormat,
  KeyValuePair,
  SettingsState,
  TimeFormat,
  UnitsState,
  UnitType,
  Visual,
} from "./types";
import { updateStorage } from "../utils/updateStorage";
import { RootState } from "../../app/commonTypes";
import { localStorageDebounce } from "../utils/localStorageDebounce";
import { DATE_TIME_NO_SECONDS } from "../../commonUtils";

const Now = DateTime.now();
const reference = {
  now: Now,
  workDay: {
    times: {
      start: "09:00",
      end: "17:00",
    },
  },
  month: {
    start: Now.startOf("month").toFormat(DATE_TIME_NO_SECONDS) ?? "",
    end: "",
  },
  year: {
    start: Now.startOf("year").toFormat(DATE_TIME_NO_SECONDS),
    end: "",
  },
  durations: {
    shortTerm: { unit: "days", qty: 1 },
    mediumTerm: { unit: "months", qty: 1 },
    longTerm: { unit: "years", qty: 1 },
  },
};
reference.month.end =
  DateTime.fromISO(reference.month.start)
    .plus({ months: 1 })
    .toFormat(DATE_TIME_NO_SECONDS) ?? "";
reference.year.end =
  DateTime.fromISO(reference.year.start ?? "")
    .plus({ years: 1 })
    .toFormat(DATE_TIME_NO_SECONDS) ?? "";

export const endOfToday = DateTime.now().endOf("day");
export const startOfToday = DateTime.now().startOf("day");

export const defaultShortTerm: UnitType = {
  unitType: "day",
  title: "Today",
  duration: reference.durations.shortTerm,
  endDate: endOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
  startDate: startOfToday.toFormat(DATE_TIME_NO_SECONDS) ?? "",
  isDuration: true,
};

export const defaultMediumTerm: UnitType = {
  unitType: "month",
  title: "Month",
  duration: reference.durations.mediumTerm,
  endDate: reference.month.end,
  startDate: reference.month.start,
  isDuration: true,
};

export const defaultLongTerm: UnitType = {
  unitType: "year",
  title: "Year",
  duration: reference.durations.longTerm,
  endDate: reference.year.end,
  startDate: reference.year.start ?? "",
  isDuration: true,
};

const initialUnits: UnitsState = {
  terms: [defaultShortTerm, defaultMediumTerm, defaultLongTerm],
  shortTerm: defaultShortTerm,
  mediumTerm: defaultMediumTerm,
  longTerm: defaultLongTerm,
};

const initalVisuals: Visual = {
  bgColor: "#CFCFCF",
  fontColor: "#4F4F4F",
  secondFontColor: "#4F4F4F",
  dateFormat: "MMM dd, yyyy",
  timeFormat: "h:mm a",
};

export const initialSettings: SettingsState = {
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
        state.units = payload.units;
      }
      if ("visual" in payload) {
        state.visual = payload.visual;
      }
    },
    updateDay: (
      state,
      { payload: startOfDay }: PayloadAction<string | null>
    ) => {
      if (startOfDay) {
        state.units.shortTerm.startDate = startOfDay;
        state.units.shortTerm.endDate =
          DateTime.now().endOf("day").toFormat(DATE_TIME_NO_SECONDS) ?? "";
      }
    },
    setVisualSetting: (
      state,
      { payload: { key, value } }: PayloadAction<KeyValuePair>
    ) => {
      state.visual[key] = value;
      localStorageDebounce(state, "settings");
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
        payload: { key, termObj },
      }: PayloadAction<{
        termObj: UnitType;
        key: number;
      }>
    ) => {
      state.units.terms[key] = termObj;
      updateStorage({ storageKey: "settings", val: state });
    },
  },
});

export const {
  populateSettingssFromChrome,
  setVisualSetting,
  setDateTimeFormats,
  resetVisualSetting,
  setNotShortTerm,
  updateDay,
} = unitsSlice.actions;

export const selectTimeFormat = (state: RootState) =>
  state.settings.visual.timeFormat;
export const selectDateFormat = (state: RootState) =>
  state.settings.visual.dateFormat;
export const selectAllUnits = (state: RootState) => state.settings.units.terms;
export const selectTerm = (termIndex: number) => (state: RootState) =>
  state.settings.units.terms[termIndex];
export const selectShortTerm = (state: RootState) =>
  state.settings.units.shortTerm;
export const selectMediumTerm = (state: RootState) =>
  state.settings.units.mediumTerm;
export const selectLongTerm = (state: RootState) =>
  state.settings.units.longTerm;
export const selectVisualSettings = (state: RootState) => state.settings.visual;

export default unitsSlice.reducer;
